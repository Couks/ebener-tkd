import { NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createServer();

  try {
    const { data: testimonials, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }

    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/testimonials:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
