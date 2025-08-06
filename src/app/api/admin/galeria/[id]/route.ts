import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { unlink } from 'fs/promises';
import path from 'path';
import sharp from 'sharp'; // Import sharp

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || authHeader !== 'Basic ' + btoa('admin:123')) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const eventId = params.id;

    if (!eventId) {
      return NextResponse.json({ message: 'ID do evento ausente' }, { status: 400 });
    }

    const eventMetaDataFilePath = path.join(process.cwd(), 'public', 'events', `${eventId}.json`);

    let existingEventData;
    try {
      const fileContent = await fs.readFile(eventMetaDataFilePath, 'utf-8');
      existingEventData = JSON.parse(fileContent);
    } catch (readError: any) {
      if (readError.code === 'ENOENT') {
        return NextResponse.json({ message: 'Evento não encontrado' }, { status: 404 });
      }
      throw readError;
    }

    const formData = await req.formData();
    const title = formData.get('title') as string || existingEventData.title;
    const category = formData.get('category') as string || existingEventData.category;
    const date = formData.get('date') as string || existingEventData.date;
    const newImages = formData.getAll('images') as File[];
    const keptImageUrlsForm = formData.get('keptImageUrls') as string;
    const keptImageUrls: string[] = keptImageUrlsForm ? JSON.parse(keptImageUrlsForm) : [];

    const eventImagesDirPath = path.join(process.cwd(), 'public', 'images', 'eventos', existingEventData.imageFolder);

    const imagesToKeepFromExisting = existingEventData.imageUrls.filter((url: string) => keptImageUrls.includes(url));
    const imagesToDelete = existingEventData.imageUrls.filter((url: string) => !keptImageUrls.includes(url));

    for (const imageUrl of imagesToDelete) {
        const oldImagePath = path.join(process.cwd(), 'public', imageUrl);
        try {
            await unlink(oldImagePath);
        } catch (deleteError) {
            console.warn(`Could not delete old image ${oldImagePath}:`, deleteError);
        }
    }

    const newlyAddedImageUrls: string[] = [];
    if (newImages.length > 0) {
        await fs.mkdir(eventImagesDirPath, { recursive: true });
        for (const image of newImages) {
            const bytes = await image.arrayBuffer();
            const buffer = new Uint8Array(bytes);

            // Convert image to WebP and save
            const webpBuffer = await sharp(buffer)
              .webp({ quality: 80 })
              .toBuffer();
            
            const imageName = `${path.parse(image.name).name}.webp`; // Change extension to webp
            const imagePath = path.join(eventImagesDirPath, imageName);
            await fs.writeFile(imagePath, new Uint8Array(webpBuffer));
            newlyAddedImageUrls.push(`/images/eventos/${existingEventData.imageFolder}/${imageName}`);
        }
    }

    const updatedEventData = {
      ...existingEventData,
      title,
      category,
      date,
      imageUrls: [...imagesToKeepFromExisting, ...newlyAddedImageUrls],
    };

    await fs.writeFile(eventMetaDataFilePath, JSON.stringify(updatedEventData, null, 2));

    return NextResponse.json({ message: 'Evento atualizado com sucesso', event: updatedEventData }, { status: 200 });
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

  try {
    const eventId = params.id;

    if (!eventId) {
      return NextResponse.json({ message: 'ID do evento ausente' }, { status: 400 });
    }

    const eventMetaDataFilePath = path.join(process.cwd(), 'public', 'events', `${eventId}.json`);

    let existingEventData;
    try {
      const fileContent = await fs.readFile(eventMetaDataFilePath, 'utf-8');
      existingEventData = JSON.parse(fileContent);
    } catch (readError: any) {
      if (readError.code === 'ENOENT') {
        return NextResponse.json({ message: 'Evento não encontrado' }, { status: 404 });
      }
      throw readError;
    }

    await unlink(eventMetaDataFilePath);

    const eventImagesDirPath = path.join(process.cwd(), 'public', 'images', 'eventos', existingEventData.imageFolder);
    try {
      await fs.rm(eventImagesDirPath, { recursive: true, force: true });
    } catch (dirDeleteError) {
      console.warn(`Could not delete event directory ${eventImagesDirPath}:`, dirDeleteError);
    }

    return NextResponse.json({ message: 'Evento excluído com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir evento:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
} 