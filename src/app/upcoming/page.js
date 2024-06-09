import UpcomingCardDetails from "../../components/card/upcomingDetail/cardUpcomingDetail";

export default function UpcomingsPage() {
  return (
    <main className="h-fit">
      <h2 className="uppercase font-semibold mb-4">Upcoming Matches</h2>
      <div>
        <UpcomingCardDetails /> 
      </div>
    </main>
  );
}
