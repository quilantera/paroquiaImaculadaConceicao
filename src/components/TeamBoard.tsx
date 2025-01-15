"use client";
// TeamBoard.tsx
import { useState } from 'react';
import { TeamCard } from './TeamCard';
import { Filters } from './Filters';
import { TeamSummaryTable } from './TeamSummaryTable';
import MembersJson from "@/utils/teamMembers.json";
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
interface TeamBoardProps{
  teamMembersProps?: TeamMember[] | undefined | null;
}
// Lista de integrantes fictícios
const teamMembersJson: TeamMember[] = [
  { id: 1, photoUrl: 'https://via.placeholder.com/150', name: 'Maria Silva', position:"Primo",age: 28, lastTeam: 'Encontrista' },
  { id: 2, photoUrl: 'https://via.placeholder.com/150', name: 'João Santos',position:"Primo", age: 32, lastTeam: 'Encontrista' },
  { id: 3, photoUrl: 'https://via.placeholder.com/150', name: 'Ana Costa', position:"Primo", age: 25, lastTeam: 'Encontrista' },
  // Outros membros...
];

// Equipes disponíveis e suas cores
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

export function TeamBoard({teamMembersProps}:TeamBoardProps) {
  console.log(teamMembersProps);
  const teamMembersJsonTeste:TeamMember[] = MembersJson;
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(teamMembersJsonTeste);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

 // const uniqueTeams = Array.from(new Set(teamMembers.map(member => member.lastTeam)));

  // Filtrando membros
  const filteredMembers = teamMembers.filter(member => {
    const matchesTeam = selectedTeam ? member.lastTeam === selectedTeam : true;
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTeam && matchesSearch;
  });

  // Função para atribuir equipe a um membro
  const handleTeamAssignment = (memberId: number, team: string) => {
    setTeamMembers(prev => 
      prev.map(member =>
        member.id === memberId ? { ...member, currentTeam: team } : member
      )
    );
  };

  const assignTeamAutomatically = () => {
    let teamAssignmentCountAux = 1;
    const auxTeamMembers = teamMembers.map(member => {
      if (member.currentTeam) return member; 
      const newTeam = availableTeams[teamAssignmentCountAux]; // Obtem a equipe de forma circular
      teamAssignmentCountAux ++;
      if(teamAssignmentCountAux == availableTeams.length){
        teamAssignmentCountAux = 1; // Reseta o contador para a próxima equipe
      }
      return { ...member, currentTeam: newTeam };
    });
    setTeamMembers(auxTeamMembers);
  };
  const teamCount = teamMembers.reduce((acc, member) => {
    const team = member.currentTeam || 'Sem Equipe';
    acc[team] = (acc[team] || 0) + 1;
    return acc;
  }, {} as { [team: string]: number });

  

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
      
      {showSummary && (
        <TeamSummaryTable
          teamCount={teamCount}
          onClose={() => setShowSummary(false)}
        />
      )}

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
        uniqueTeams={[]}
      />
      <div className="md:grid sm:grid-cols-2 md:grid-cols-3 flex flex-wrap justify-between gap-3">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <TeamCard
              id={member.id}
              key={member.id} // Usa id único para a chave
              photoUrl={member.photoUrl}
              name={member.name}
              age={member.age||20}
              lastTeam={member.lastTeam}
              currentTeam={member.currentTeam || ''}
              availableTeams={availableTeams}
              onAssignTeam={handleTeamAssignment}
              teamColor={teamColors[member.currentTeam || ''] || ''} 
              position={member.position|| "Primo"}
              />
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhum integrante encontrado.</p>
        )}
      </div>
    </div>
  );
}
