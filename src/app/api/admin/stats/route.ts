import { NextRequest, NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || authHeader !== 'Basic ' + btoa('admin:123')) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  const supabase = createServer();

  try {
    // Fetch counts
    const { count: galleries, error: galleriesError } = await supabase.from('events').select('*', { count: 'exact', head: true });
    if (galleriesError) throw galleriesError;

    const { count: testimonials, error: testimonialsError } = await supabase.from('testimonials').select('*', { count: 'exact', head: true });
    if (testimonialsError) throw testimonialsError;

    // Fetch recent events
    const { data: recentEvents, error: recentEventsError } = await supabase
      .from('events')
      .select('id, title, created_at')
      .order('created_at', { ascending: false })
      .limit(3);
    if (recentEventsError) throw recentEventsError;

    // Fetch recent testimonials
    const { data: recentTestimonials, error: recentTestimonialsError } = await supabase
      .from('testimonials')
      .select('id, name, created_at')
      .order('created_at', { ascending: false })
      .limit(3);
    if (recentTestimonialsError) throw recentTestimonialsError;

    // Combine and sort recent activities
    const combinedActivities = [
      ...recentEvents.map(e => ({ ...e, type: 'gallery' as const })),
      ...recentTestimonials.map(t => ({ ...t, title: t.name, type: 'testimonial' as const }))
    ];

    const recentActivity = combinedActivities
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5); // Get the top 5 most recent activities overall


    return NextResponse.json({
      galleries: galleries ?? 0,
      testimonials: testimonials ?? 0,
      recentActivity,
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
