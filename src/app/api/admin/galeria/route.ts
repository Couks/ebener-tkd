import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { unlink } from 'fs/promises';
import path from 'path';
import sharp from 'sharp'; // Import sharp

export async function POST(req: NextRequest) {
  // Basic authentication
  const authHeader = req.headers.get('authorization');
  if (!authHeader || authHeader !== 'Basic ' + btoa('admin:123')) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const date = formData.get('date') as string;
    const images = formData.getAll('images') as File[];

    if (!title || !category || images.length === 0) {
      return NextResponse.json({ message: 'Campos obrigatórios ou imagens ausentes' }, { status: 400 });
    }

    const folderName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();
    const eventImagesDirPath = path.join(process.cwd(), 'public', 'images', 'eventos', folderName);
    const eventMetaDataFilePath = path.join(process.cwd(), 'public', 'events', `${folderName}.json`);

    await fs.mkdir(eventImagesDirPath, { recursive: true });

    const imageUrls: string[] = [];
    for (const image of images) {
      const bytes = await image.arrayBuffer();
      const buffer = new Uint8Array(bytes);

      // Convert image to WebP and save
      const webpBuffer = await sharp(buffer)
        .webp({ quality: 80 })
        .toBuffer();

      const imageName = `${path.parse(image.name).name}.webp`; // Change extension to webp
      const imagePath = path.join(eventImagesDirPath, imageName);
      await fs.writeFile(imagePath, new Uint8Array(webpBuffer));
      imageUrls.push(`/images/eventos/${folderName}/${imageName}`);
    }

    const eventData = {
      id: folderName,
      title,
      category,
      date,
      imageFolder: folderName,
      imageUrls, // Store URLs for easy access
    };

    await fs.writeFile(eventMetaDataFilePath, JSON.stringify(eventData, null, 2));

    return NextResponse.json({ message: 'Evento criado com sucesso', event: eventData }, { status: 200 });
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
} 