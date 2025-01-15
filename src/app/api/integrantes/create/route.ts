import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  // Lógica para manipular os dados recebidos
  return NextResponse.json({ message: 'Integrante criado com sucesso!', data });
}