import axios from "axios";

const fetchPlayer = async (playerId) => {
  console.log("Player ID:", playerId); // Log playerId

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/players",
    params: {
      id: playerId,
      season: "2023",
      league: "39",
    },
    headers: {
      "X-RapidAPI-Key": "868455a8d0mshf05117d7763056fp1a7547jsn3d555557a5cd",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.response[0];
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while fetching player."
    );
  }
};

export default fetchPlayer;
