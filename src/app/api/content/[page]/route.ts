import { NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase/server';

// Example: GET /api/content/home
export async function GET(
  req: Request,
  { params }: { params: { page: string } }
) {
  const pageIdentifier = params.page;
  if (!pageIdentifier) {
    return NextResponse.json({ message: 'Page identifier is required' }, { status: 400 });
  }

  const supabase = createServer();

  try {
    const { data, error } = await supabase
      .from('page_content')
      .select('section_identifier, content_key, content_value')
      .eq('page_identifier', pageIdentifier);

    if (error) {
      console.error(`Error fetching content for page "${pageIdentifier}":`, error);
      throw error;
    }

    // Transform the flat array into a structured object for easier use on the client
    const formattedContent = data.reduce((acc, item) => {
      if (!acc[item.section_identifier]) {
        acc[item.section_identifier] = {};
      }
      acc[item.section_identifier][item.content_key] = item.content_value;
      return acc;
    }, {} as Record<string, Record<string, string>>);

    return NextResponse.json(formattedContent, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
