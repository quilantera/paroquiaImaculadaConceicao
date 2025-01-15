import { TeamBoard, TeamMember } from "@/components/TeamBoard";
import axios from 'axios';

export default async function Dashboard() {
    const fetchTeamMembers = async () => {
        try {
          const response = await axios.get<TeamMember[]>(`${process.env.BASE_URL}/api/integrantes`);
          if(response.data) return response.data;
          else return null;
        } catch (error) {
          console.error("Error fetching team members:", error);
        }
    }
    if(fetchTeamMembers){
     
      return (
        <TeamBoard teamMembersProps={await fetchTeamMembers()} />
    );
    }
    return (
      <p>Loading...</p>
    )

    
}
