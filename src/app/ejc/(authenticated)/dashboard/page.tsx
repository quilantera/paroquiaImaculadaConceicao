import { TeamBoard, TeamMember } from "@/components/TeamBoard";
import axios from 'axios';

export default async function Dashboard() {
    const fetchTeamMembers = async () => {
        try {
          const response = await axios.get<TeamMember[]>(`${process.env.BASE_URL}/api/integrantes`);
          return response.data;
        } catch (error) {
          console.error("Error fetching team members:", error);
        }
    }

    return (
        <TeamBoard teamMembersProps={await fetchTeamMembers()} />
    );
}
