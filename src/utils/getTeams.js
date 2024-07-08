import axios from "axios";

const fetchTeams = async () => {
  const options = {
    method: "GET",
    url: `https://${process.env.NEXT_PUBLIC_API_FOOTBALL_HOST}/v3/players/squads`,
    params: {
      team: "42",
    },
    headers: {
      "X-RapidAPI-Key": process.env.API_FOOTBALL_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_FOOTBALL_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    const teamsplayer = response.data.response[0].players;
    return teamsplayer;
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while fetching the team."
    );
  }
};

export default fetchTeams;
