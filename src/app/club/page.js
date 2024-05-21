export default function ClubPage() {
  return (
    <main className="h-screen">
      <div className="text-white font-semibold grid grid-cols-2 gap-2 rounded-lg">
        <h2 className="rounded-lg bg-red-600 p-3">Nickname: The Gunners</h2>
      </div>
      <div className="border-2 border-red-600 p-4 rounded-lg">
        <h2 className="text-right">History</h2>
        <span className="text-2xl	text-justify">
          Arsenal have played in the top division of English football since
          1913, which is the longest unbroken run in the history of English
          football. Arsenal are the
          <span className="text-red-500"> only team </span>
          to have finished a Premier League season undefeated (2003/04).
        </span>
      </div>
      <div className="border-2 border-red-600 p-4 rounded-lg">
        <h2>Founded</h2>
      </div>
      <div>
        <h2>LOGO</h2>
      </div>
      <div>
        <h2>Emirates Stadium</h2>
      </div>
      <div>
        <h2>Manager</h2>
      </div>
      <div>
        <h2>Kits</h2>
      </div>
      <div>
        <h2>Honours</h2>
      </div>
      <div>
        <h2>Map</h2>
      </div>
    </main>
  );
}
