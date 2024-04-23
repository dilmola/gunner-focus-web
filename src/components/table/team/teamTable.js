// pages/product-table.js
"use client";

import CustomTable from "../Table";

const TeamTablePage = () => {
  const TeamColumns = [
    { key: "player", label: "Player" },
    { key: "nationality", label: "Nationality" },
    { key: "position", label: "Position" },
  ];

  const TeamData = [
    {
      player: "Bukayo Saka",
      nationality: "England",
      position: "Midfielder",
      image:
        "https://resources.premierleague.com/premierleague/photos/players/250x250/p223340.png",
    },
    {
      player: "Gabriel Martinelli",
      nationality: "Brazil",
      position: "Forward",
      image:
        "https://resources.premierleague.com/premierleague/photos/players/250x250/p444145.png",
    },
    {
      player: "William Saliba",
      nationality: "France",
      position: "Defender",
      image:
        "https://resources.premierleague.com/premierleague/photos/players/250x250/p462424.png",
    },
  ];

  return (
    <div>
      <h2 className="uppercase font-semibold mb-4">Team</h2>
      <CustomTable columns={TeamColumns} data={TeamData} />
    </div>
  );
};

export default TeamTablePage;
