import axios from "axios";

const fetchPlayer = async (playerId, seasonYear) => {
  const options = {
    method: "GET",
    url: `https://${process.env.NEXT_PUBLIC_API_FOOTBALL_HOST}/v3/players`,
    params: {
      id: playerId,
      season: seasonYear,
      league: "39",
    },
    headers: {
      "X-RapidAPI-Key": process.env.API_FOOTBALL_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_FOOTBALL_HOST,
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
