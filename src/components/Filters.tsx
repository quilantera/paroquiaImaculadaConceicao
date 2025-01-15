// Filters.tsx
import React from 'react';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTeam: string | null;
  setSelectedTeam: (team: string | null) => void;
  uniqueTeams: string[];
}

export function Filters({
  searchTerm,
  setSearchTerm,
  selectedTeam,
  setSelectedTeam,
  uniqueTeams,
}: FiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center mb-6 gap-4 text-gray-700">
      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Pesquisar por nome"
        className="p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Combobox para seleção de equipe */}
      <select
        className="p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
        value={selectedTeam || ''}
        onChange={(e) => setSelectedTeam(e.target.value || null)}
      >
        <option value="">Todas as equipes</option>
        {uniqueTeams.map((team, index) => (
          <option key={index} value={team}>{team}</option>
        ))}
      </select>
    </div>
  );
}
