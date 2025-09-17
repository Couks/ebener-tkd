import { NextRequest, NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || authHeader !== 'Basic ' + btoa('admin:123')) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  const supabase = createServer();

  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const date = formData.get('date') as string;
    const description = formData.get('description') as string;
    const images = formData.getAll('images') as File[];

    if (!title || !category || images.length === 0) {
      return NextResponse.json({ message: 'Campos obrigatórios ou imagens ausentes' }, { status: 400 });
    }

    const { data: eventData, error: insertError } = await supabase
      .from('events')
      .insert([{ title, category, date, description }])
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting event:', insertError);
      return NextResponse.json({ message: 'Erro ao criar evento no banco de dados' }, { status: 500 });
    }

    const imageUrls: string[] = [];
    for (const image of images) {
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
        // Here you could decide to reject the image by returning an error response
        // For now, it will be uploaded as is.
      }

      const imageName = `${Date.now()}-${image.name.split('.')[0]}.webp`;
      const { error: uploadError } = await supabase.storage
        .from('events')
        .upload(`${eventData.id}/${imageName}`, webpBuffer, {
          contentType: 'image/webp',
          upsert: true,
        });

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        // Should we delete the event if an image fails to upload?
        // For now, we'll just log the error and continue.
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from('events')
          .getPublicUrl(`${eventData.id}/${imageName}`);
        imageUrls.push(publicUrl);
      }
    }

    return NextResponse.json({ message: 'Evento criado com sucesso', event: { ...eventData, imageUrls } }, { status: 200 });
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}
