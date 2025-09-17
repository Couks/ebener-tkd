import { NextRequest, NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase/server';

interface ContentItem {
  page_identifier: string;
  section_identifier: string;
  content_key: string;
  content_value: string;
}

export async function PUT(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || authHeader !== 'Basic ' + btoa('admin:123')) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  const supabase = createServer();

  try {
    const body: { pageIdentifier: string; content: Record<string, Record<string, string>> } = await req.json();
    const { pageIdentifier, content } = body;

    if (!pageIdentifier || !content) {
      return NextResponse.json({ message: 'Identificador da página e conteúdo são obrigatórios' }, { status: 400 });
    }

    const recordsToUpsert: ContentItem[] = [];
    for (const section_identifier in content) {
      for (const content_key in content[section_identifier]) {
        recordsToUpsert.push({
          page_identifier: pageIdentifier,
          section_identifier,
          content_key,
          content_value: content[section_identifier][content_key],
        });
      }
    }

    if (recordsToUpsert.length === 0) {
      return NextResponse.json({ message: 'Nenhum conteúdo para atualizar' }, { status: 200 });
    }

    const { error } = await supabase
      .from('page_content')
      .upsert(recordsToUpsert, {
        onConflict: 'page_identifier, section_identifier, content_key',
      });

    if (error) {
      console.error('Error upserting page content:', error);
      return NextResponse.json({ message: 'Erro ao salvar o conteúdo' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Conteúdo salvo com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}
