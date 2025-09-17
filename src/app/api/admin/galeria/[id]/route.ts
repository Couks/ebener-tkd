import { NextRequest, NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase/server';
import sharp from 'sharp';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || authHeader !== 'Basic ' + btoa('admin:123')) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  const supabase = createServer();
  const eventId = params.id;

  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const date = formData.get('date') as string;
    const description = formData.get('description') as string;
    const newImages = formData.getAll('images') as File[];
    const keptImageUrlsForm = formData.get('keptImageUrls') as string;
    const keptImageUrls: string[] = keptImageUrlsForm ? JSON.parse(keptImageUrlsForm) : [];

    const { error: updateError } = await supabase
      .from('events')
      .update({ title, category, date, description })
      .eq('id', eventId);

    if (updateError) {
      console.error('Error updating event:', updateError);
      return NextResponse.json({ message: 'Erro ao atualizar evento' }, { status: 500 });
    }

    // --- Image Deletion Logic ---
    const { data: existingFiles, error: listError } = await supabase.storage
      .from('events')
      .list(`${eventId}/`);

    if (listError) {
      console.error('Error listing existing images:', listError);
      // Decide if you want to stop or continue. For now, we'll log and continue.
    } else if (existingFiles) {
      // Create a set of kept image filenames for efficient lookup
      const keptFileNames = new Set(keptImageUrls.map(url => url.split('/').pop()));

      const filesToDelete = existingFiles
        .filter(file => !keptFileNames.has(file.name))
        .map(file => `${eventId}/${file.name}`);

      if (filesToDelete.length > 0) {
        const { error: deleteError } = await supabase.storage
          .from('events')
          .remove(filesToDelete);

        if (deleteError) {
          console.error('Error deleting images:', deleteError);
          // Non-fatal, log the error and proceed with upload
        }
      }
    }

    // --- New Image Upload Logic ---
    for (const image of newImages) {
      const buffer = await image.arrayBuffer();

      const MAX_SIZE_BYTES = 500 * 1024; // 500KB
      let quality = 80;
      let webpBuffer;

      // Initial compression attempt
      webpBuffer = await sharp(buffer)
        .resize({ width: 1920, withoutEnlargement: true }) // Resize large images
        .webp({ quality })
        .toBuffer();

      // If the image is too large, iteratively reduce the quality
      while (webpBuffer.byteLength > MAX_SIZE_BYTES && quality > 10) {
        quality -= 10; // Reduce quality by 10
        webpBuffer = await sharp(buffer)
          .resize({ width: 1920, withoutEnlargement: true })
          .webp({ quality })
          .toBuffer();
      }

      // Optional: Check if the image is still too large and handle it
      if (webpBuffer.byteLength > MAX_SIZE_BYTES) {
        console.warn(`Image "${image.name}" could not be compressed under 500KB. Final size: ${Math.round(webpBuffer.byteLength / 1024)}KB`);
      }

      const imageName = `${Date.now()}-${image.name.split('.')[0]}.webp`;

      const { error: uploadError } = await supabase.storage
        .from('events')
        .upload(`${eventId}/${imageName}`, webpBuffer, {
          contentType: 'image/webp',
          upsert: true,
        });

      if (uploadError) {
        console.error(`Error uploading new image ${image.name}:`, uploadError);
        // Decide if one failed upload should stop the whole process
        // For now, we'll just log it and continue.
      }
    }

    return NextResponse.json({ message: 'Evento atualizado com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || authHeader !== 'Basic ' + btoa('admin:123')) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  const supabase = createServer();
  const eventId = params.id;

  try {
    const { data: files, error: listError } = await supabase.storage
      .from('events')
      .list(`${eventId}/`);

    if (listError) {
      console.error('Error listing files for deletion:', listError);
    } else if (files && files.length > 0) {
      const filePaths = files.map(file => `${eventId}/${file.name}`);
      const { error: removeError } = await supabase.storage
        .from('events')
        .remove(filePaths);

      if (removeError) {
        console.error('Error deleting event images from storage:', removeError);
      }
    }

    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId);

    if (deleteError) {
      console.error('Error deleting event from database:', deleteError);
      return NextResponse.json({ message: 'Erro ao excluir evento do banco de dados' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Evento excluído com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir evento:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}
