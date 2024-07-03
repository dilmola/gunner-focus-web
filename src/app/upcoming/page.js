import CardUpcomingDetail from "../../components/cards/cards-upcoming/card-upcoming-detail";

export default function UpcomingsPage() {
  return (
    <main className="min-h-screen">
      <h2 className="font-semibold mb-4">Upcoming matches</h2>
      <div>
        <CardUpcomingDetail />
      </div>
    </main>
  );
}
