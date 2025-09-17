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
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const quote = formData.get('quote') as string;
    const achievement = formData.get('achievement') as string;
    const year = formData.get('year') as string;
    const image = formData.get('image') as File | null;

    if (!name || !quote) {
      return NextResponse.json({ message: 'Nome e depoimento são obrigatórios' }, { status: 400 });
    }

    let imageUrl: string | null = null;

    if (image) {
      const buffer = await image.arrayBuffer();
      const webpBuffer = await sharp(buffer)
        .resize({ width: 512, height: 512, fit: 'cover' })
        .webp({ quality: 80 })
        .toBuffer();

      const imageName = `${Date.now()}-${image.name.split('.')[0]}.webp`;

      const { error: uploadError } = await supabase.storage
        .from('testimonials') // Ensure this bucket exists and is public
        .upload(imageName, webpBuffer, {
          contentType: 'image/webp',
          upsert: true,
        });

      if (uploadError) {
        console.error('Error uploading testimonial image:', uploadError);
        return NextResponse.json({ message: 'Erro ao fazer upload da imagem' }, { status: 500 });
      }

      const { data: { publicUrl } } = supabase.storage
        .from('testimonials')
        .getPublicUrl(imageName);

      imageUrl = publicUrl;
    }

    const { data: testimonialData, error: insertError } = await supabase
      .from('testimonials')
      .insert([{ name, role, quote, achievement, year, image_url: imageUrl }])
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting testimonial:', insertError);
      return NextResponse.json({ message: 'Erro ao criar depoimento' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Depoimento criado com sucesso', testimonial: testimonialData }, { status: 200 });
  } catch (error) {
    console.error('Erro ao criar depoimento:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}
