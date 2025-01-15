import { TeamMember } from "@/components/TeamBoard";
import { authClient } from "@/config/AuthClient";
import { google } from "googleapis";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

const service = google.sheets("v4");

// Função para calcular a idade com base na data de nascimento
function calculateAge(birthdate?: string): number {
  if (!birthdate) return 0;
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Ajusta a idade caso o aniversário ainda não tenha ocorrido no ano atual
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export async function GET() {
  try {
    // Primeira requisição ao Google Sheets
    const res = await service.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId: "1ZCs7ubmqfwlG8YNKgp0iT53gd1bPXvwlU5tGqxjySO0",
      range: "A:G",
    });

    const rows = res.data.values || [];
    
    // Mapeia as linhas para o formato desejado, ignorando o cabeçalho
    const teamMembersJson: TeamMember[] = rows.slice(1).map((row, index) => ({
      id: index + 1,
      photoUrl: row[0] || 'https://via.placeholder.com/150',
      name: row[1] || '',
      cel: row[6],
      age: calculateAge(row[3] || '2000-01-01'),
      lastTeam: 'Encontrista',
      position: 'Primo/a'
    }));

    // Segunda requisição ao Google Sheets
    const res2 = await service.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId: "1kVRDuqkUjMSsbXXS25QirzyQHos83DX2OX5eBuliSP0",
      range: "A:F",
    });

    const rows2 = res2.data.values || [];
    const auxIndex = teamMembersJson.length;

    // Mapeia as linhas da segunda planilha para o mesmo formato, com IDs ajustados
    const teamMembersJson2: TeamMember[] = rows2.slice(1).map((row, index) => ({
      id: auxIndex + index + 1,
      photoUrl: row[0] || 'https://via.placeholder.com/150',
      name: row[1] || '',
      age: calculateAge(row[2] || '2000-01-01'),
      cel: row[3],
      lastTeam: row[4] || 'Encontrista',
      position: row[5] || 'Primo/a'
    }));

    // Junta os dois arrays
    const result = [...teamMembersJson, ...teamMembersJson2];
    
    return NextResponse.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
    return NextResponse.json({ error: 'An unknown error occurred' });
  }
}

