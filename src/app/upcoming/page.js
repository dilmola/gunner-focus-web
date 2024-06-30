import UpcomingCardDetails from "../../components/card/upcomingDetail/cardUpcomingDetail";

export default function UpcomingsPage() {
  return (
    <main className="h-fit">
      <h2 className="font-semibold mb-4">Upcoming matches</h2>
      <div>
        <UpcomingCardDetails /> 
      </div>
    </main>
  );
}
