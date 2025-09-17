import { NextRequest, NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServer();
  const testimonialId = params.id;

  try {
    const { data: testimonial, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', testimonialId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ message: `Depoimento com id ${testimonialId} não encontrado.` }, { status: 404 });
      }
      console.error('Error fetching testimonial:', error);
      return NextResponse.json({ message: 'Erro ao buscar depoimento.' }, { status: 500 });
    }

    if (!testimonial) {
        return NextResponse.json({ message: `Depoimento com id ${testimonialId} não encontrado.` }, { status: 404 });
    }

    return NextResponse.json(testimonial, { status: 200 });

  } catch (error) {
    console.error('Erro na rota do depoimento:', error);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
