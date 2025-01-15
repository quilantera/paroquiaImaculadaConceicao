// TeamSummaryTable.tsx

interface TeamSummaryTableProps {
  teamCount: { [team: string]: number };
  onClose: () => void;
}

export function TeamSummaryTable({ teamCount, onClose }: TeamSummaryTableProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <button onClick={onClose} className="text-gray-500 float-right font-bold mb-4">
          Fechar
        </button>
        <h2 className="text-lg font-semibold mb-4">Resumo de Equipes</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="border-b pb-2">Equipe</th>
              <th className="border-b pb-2">Integrantes</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(teamCount).map(([team, count]) => (
              <tr key={team}>
                <td className="py-2">{team}</td>
                <td className="py-2">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
