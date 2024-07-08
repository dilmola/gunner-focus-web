import Welcome from "@/components/welcome/welcome";
import Match from "@/components/match/match";
import TableRanked from "@/components/tables/table-ranked";
import TableTeam from "@/components/tables/table-team";

export default function Home() {
  return (
    <div>
      <Welcome />
      <Match />
      <TableRanked />
      <TableTeam />
    </div>
  );
}
