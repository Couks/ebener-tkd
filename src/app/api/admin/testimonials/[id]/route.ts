import { NextRequest, NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase/server';
import sharp from 'sharp';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || authHeader !== 'Basic ' + btoa('admin:123')) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  const supabase = createServer();
  const testimonialId = params.id;

  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const quote = formData.get('quote') as string;
    const achievement = formData.get('achievement') as string;
    const yearValue = formData.get('year') as string;
    const year = yearValue ? parseInt(yearValue, 10) : null;
    const image = formData.get('image') as File | null;
    const existingImageUrl = formData.get('existingImageUrl') as string | null;

    let imageUrl = existingImageUrl;

    if (image) {
      // If there's an old image, delete it from storage
      if (existingImageUrl) {
        const fileName = existingImageUrl.split('/').pop();
        if (fileName) {
          const { error: removeError } = await supabase.storage.from('testimonials').remove([fileName]);
          if (removeError) {
            console.error('Error removing existing image:', removeError.message);
            // Non-fatal, we can still proceed to upload the new one
          }
        }
      }

      const buffer = await image.arrayBuffer();
      const webpBuffer = await sharp(buffer)
        .resize({ width: 512, height: 512, fit: 'cover' })
        .webp({ quality: 80 })
        .toBuffer();

      const imageName = `${Date.now()}-${image.name.split('.')[0]}.webp`;

      const { error: uploadError } = await supabase.storage
        .from('testimonials')
        .upload(imageName, webpBuffer, { contentType: 'image/webp' });

      if (uploadError) {
        throw new Error('Falha ao fazer upload da nova imagem.');
      }

      imageUrl = supabase.storage.from('testimonials').getPublicUrl(imageName).data.publicUrl;
    }

    const updateData: { [key: string]: any } = { name, role, quote, achievement, year };
    if (imageUrl) {
      updateData.image_url = imageUrl;
    }

    const { error: updateError } = await supabase
      .from('testimonials')
      .update(updateData)
      .eq('id', testimonialId);

    if (updateError) {
      console.error('Error updating testimonial:', updateError);
      return NextResponse.json({ message: 'Erro ao atualizar depoimento' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Depoimento atualizado com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar depoimento:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || authHeader !== 'Basic ' + btoa('admin:123')) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  const supabase = createServer();
  const testimonialId = params.id;

  try {
    const { data: testimonial, error: fetchError } = await supabase
      .from('testimonials')
      .select('image_url')
      .eq('id', testimonialId)
      .single();

    if (fetchError) {
      console.error('Error fetching testimonial for deletion:', fetchError);
    }

    if (testimonial?.image_url) {
      const fileName = testimonial.image_url.split('/').pop();
      if (fileName) {
        await supabase.storage.from('testimonials').remove([fileName]);
      }
    }

    const { error: deleteError } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', testimonialId);

    if (deleteError) {
      console.error('Error deleting testimonial:', deleteError);
      return NextResponse.json({ message: 'Erro ao excluir depoimento' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Depoimento excluído com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir depoimento:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}
