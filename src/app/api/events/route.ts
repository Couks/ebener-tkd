import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const eventsDirPath = path.join(process.cwd(), 'public', 'events');
    const eventFiles = await fs.readdir(eventsDirPath);

    const eventsData = await Promise.all(
      eventFiles.map(async (file) => {
        const filePath = path.join(eventsDirPath, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
      })
    );

    // Sort events by date in descending order (most recent first)
    eventsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(eventsData, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    // If the directory doesn't exist yet, return an empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json([], { status: 200 });
    }
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
} 