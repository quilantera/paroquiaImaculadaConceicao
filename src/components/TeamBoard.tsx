"use client";
import { useState } from 'react';
import { TeamCard } from './TeamCard';
import { Filters } from './Filters';
import { TeamSummaryTable } from './TeamSummaryTable';
import MembersJson from "@/utils/teamMembers.json";
import * as XLSX from 'xlsx';

export interface TeamMember {
  id: number;
  photoUrl: string;
  name: string;
  age: number | null;
  cel?: string;
  position: string;
  lastTeam: string;
  currentTeam?: string;
}

interface TeamBoardProps {
  teamMembersProps?: TeamMember[] | undefined | null;
}

const availableTeams = [
  'Pilotos', 'Alegria', 'Animação', 'Circulo Verde', 'Circulo Vermelho', 'Circulo Amarelo', 
  'Circulo Azul', 'Circulo Roxo', 'Compras', 'Café/Cozinha', 'Liturgia', 'Sala', 
  'Secretaria', 'Trânsito', 'Visitação', 'Ordem/Patrimonio',
];

const teamColors: { [key: string]: string } = {
  'Pilotos': 'border-red-500',
  'Alegria': 'border-yellow-500',
  'Animação': 'border-blue-500',
  'Circulo Verde': 'border-green-500',
  'Circulo Vermelho': 'border-red-600',
  'Circulo Amarelo': 'border-yellow-600',
  'Circulo Azul': 'border-blue-600',
  'Circulo Roxo': 'border-purple-600',
  'Compras': 'border-pink-500',
  'Café/Cozinha': 'border-orange-500',
  'Liturgia': 'border-indigo-500',
  'Sala': 'border-green-700',
  'Secretaria': 'border-teal-500',
  'Trânsito': 'border-lime-500',
  'Visitação': 'border-amber-500',
  'Ordem/Patrimonio': 'border-fuchsia-500',
};

export function TeamBoard({ teamMembersProps }: TeamBoardProps) {
  const teamMembersJsonTeste: TeamMember[] = MembersJson;
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(teamMembersJsonTeste);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const filteredMembers = teamMembers.filter(member => {
    const matchesTeam = selectedTeam ? member.currentTeam === selectedTeam : true;
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTeam && matchesSearch;
  });

  const handleTeamAssignment = (memberId: number, team: string) => {
    setTeamMembers(prev => 
      prev.map(member =>
        member.id === memberId ? { ...member, currentTeam: team } : member
      )
    );
  };

  const assignTeamAutomatically = () => {
    const validTeams = [ 'Alegria', 'Animação', 'Compras', 'Café/Cozinha', 'Liturgia', 
  'Secretaria', 'Trânsito', 'Visitação', 'Ordem/Patrimonio']
    let teamAssignmentCountAux = 0;
    const auxTeamMembers = teamMembers.map(member => {
      if (member.currentTeam) return member; 
      const newTeam = validTeams[teamAssignmentCountAux]; // Obtem a equipe de forma circular
      teamAssignmentCountAux = (teamAssignmentCountAux + 1) % availableTeams.length; // Incrementa e reseta
      return { ...member, currentTeam: newTeam };
    });
    setTeamMembers(auxTeamMembers);
  };

  const downloadTeamsAsExcel = () => {
    // Verificando se existem membros para exportar
    if (!Array.isArray(teamMembers) || teamMembers.length === 0) {
      console.error('Nenhum membro encontrado para exportação.');
      return;
    }
  
    // Agrupando os membros por equipe
    const groupedByTeam: { [key: string]: TeamMember[] } = teamMembers.reduce(
      (acc: Record<string, TeamMember[]>, member) => {
        const team = member.currentTeam || 'Sem Equipe';
        if (!acc[team]) acc[team] = [];
        acc[team].push(member);
        return acc;
      },
      {}
    );
  
    // Criando um novo workbook
    const workbook = XLSX.utils.book_new();
  
    // Função para sanitizar nomes de abas
    const sanitizeSheetName = (name: string): string =>
      name.replace(/[\\/:?*[\]]/g, '_').substring(0, 31);
  
    // Criando uma aba para cada equipe
    Object.entries(groupedByTeam).forEach(([teamName, members]) => {
      const sheetData = [
        ['foto', 'Nome', 'Idade', 'Celular', 'Posição', 'Última Equipe'], // Cabeçalho
        ...members.map(member => [
          member.photoUrl || "N/A",
          member.name,
          member.age || 'N/A',
          member.cel || 'N/A',
          member.position,
          member.lastTeam,
        ]),
      ];
  
      const worksheet = XLSX.utils.aoa_to_sheet(sheetData); // Transformando os dados em planilha
      XLSX.utils.book_append_sheet(workbook, worksheet, sanitizeSheetName(teamName)); // Adicionando a aba ao workbook
    });
  
    // Nome personalizado para o arquivo Excel
    const fileName = `teams_export_${new Date().toISOString().slice(0, 10)}.xlsx`;
  
    // Salvando o arquivo Excel
    try {
      XLSX.writeFile(workbook, fileName);
      console.log(`Arquivo "${fileName}" exportado com sucesso!`);
    } catch (error) {
      console.error('Erro ao salvar o arquivo Excel:', error);
    }
  };
  

  return (
    <div className="p-6 bg-gray-100">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
        onClick={assignTeamAutomatically}
      >
        Atribuir Equipes Automaticamente
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-lg mt-4"
        onClick={() => setShowSummary(!showSummary)}
      >
        {showSummary ? 'Ocultar Resumo' : 'Mostrar Resumo'}
      </button>
      <button
        className="px-4 py-2 bg-indigo-500 text-white rounded-lg mt-4"
        onClick={downloadTeamsAsExcel}
      >
        Baixar Equipes
      </button>

      {showSummary && (
        <TeamSummaryTable
          teamCount={teamMembers.reduce((acc, member) => {
            const team = member.currentTeam || 'Sem Equipe';
            acc[team] = (acc[team] || 0) + 1;
            return acc;
          }, {} as { [team: string]: number })}
          onClose={() => setShowSummary(false)}
        />
      )}

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
        uniqueTeams={availableTeams}
      />

      <div className="md:grid sm:flex sm:flex-col sm:flex-wrap sm:items-center md:grid-cols-3 flex flex-wrap justify-between gap-3">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <TeamCard
              id={member.id}
              key={member.id}
              photoUrl={"https://cdn-icons-png.flaticon.com/512/6073/6073873.png"}
              name={member.name}
              age={member.age || 20}
              lastTeam={member.lastTeam}
              currentTeam={member.currentTeam || ''}
              availableTeams={availableTeams}
              onAssignTeam={handleTeamAssignment}
              teamColor={teamColors[member.currentTeam || ''] || ''} 
              position={member.position || "Primo"}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhum integrante encontrado.</p>
        )}
      </div>
    </div>
  );
}
