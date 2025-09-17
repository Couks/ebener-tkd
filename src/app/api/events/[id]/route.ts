import { NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const eventId = params.id;
  if (!eventId) {
    return NextResponse.json({ message: 'Event ID is required' }, { status: 400 });
  }

  const supabase = createServer();

  try {
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (eventError) {
      if (eventError.code === 'PGRST116') {
        return NextResponse.json({ message: 'Event not found' }, { status: 404 });
      }
      console.error(`Error fetching event ${eventId}:`, eventError);
      throw eventError;
    }

    if (!event) {
        return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    const { data: files, error: listError } = await supabase.storage
      .from('events')
      .list(`${event.id}/`);

    const imageUrls = files ? files.map(file => {
      return supabase.storage.from('events').getPublicUrl(`${event.id}/${file.name}`).data.publicUrl;
    }) : [];

    return NextResponse.json({ ...event, imageUrls }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
