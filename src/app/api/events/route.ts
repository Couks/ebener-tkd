import { NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createServer();

  try {
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });

    if (eventsError) {
      console.error('Error fetching events:', eventsError);
      throw eventsError;
    }

    const eventsWithImages = await Promise.all(
      events.map(async (event) => {
        const { data: files, error: listError } = await supabase.storage
          .from('events')
          .list(`${event.id}/`);

        if (listError) {
          console.error(`Error listing images for event ${event.id}:`, listError);
          // Continue without images for this event
          return { ...event, imageUrls: [] };
        }

        const imageUrls = files ? files.map(file => {
          const { data: { publicUrl } } = supabase.storage
            .from('events')
            .getPublicUrl(`${event.id}/${file.name}`, {
              transform: {
                width: 300,
                height: 300,
                resize: 'cover',
              },
            });
          return publicUrl;
        }) : [];

        return { ...event, imageUrls };
      })
    );

    return NextResponse.json(eventsWithImages, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/events:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
