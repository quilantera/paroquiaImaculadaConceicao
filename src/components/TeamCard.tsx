// TeamCard.tsx
import React from 'react';

interface TeamCardProps {
    id?: number; // Mantenha o id como uma propriedade opcional
    photoUrl: string;
    name: string;
    age: number;
    cel?: string;
    position: string;
    lastTeam: string;
    currentTeam: string;
    availableTeams: string[];
    onAssignTeam: (memberId: number, team: string) => void; // Continua aceitando number
    teamColor: string;
}

export function TeamCard({
  id, // Adicione o id aqui
  photoUrl,
  name,
  age,
  cel,
  position,
  lastTeam,
  currentTeam,
  availableTeams,
  onAssignTeam,
  teamColor = '',
}: TeamCardProps) {
  return (
    <div className={`bg-white shadow-lg rounded-lg  min-w-[250px] max-w-[300px] p-4 flex flex-col items-center text-center border-4 ${teamColor}`}>
      <h3 className='text-lg font-semibold mb-2'>{position}</h3>
      <img
        src={photoUrl}
        alt={name}
        className="w-28 h-28 rounded-full object-cover object-top mb-3"
        style={{ objectPosition: 'center 20%' }}
      />
      <h3 className="text-lg font-semibold">{name.length > 20 ? `${name.slice(0, 20)}...` : name}</h3>
      <p className="text-gray-800">Idade: {age}</p>
      <p className="text-gray-700">Última equipe: {lastTeam}</p>
      
      <select
        className="mt-2 p-2 border rounded-md"
        value={currentTeam}
        onChange={(e) => {
          if (id !== undefined) { // Verifica se o id está definido
            onAssignTeam(id, e.target.value); // Passa o id do membro e a nova equipe
          }
        }}
      >
        <option value="">Selecione uma equipe</option>
        {availableTeams.map((team, index) => (
          <option key={index} value={team}>
            {team}
          </option>
        ))}
      </select>
    </div>
  );
}
