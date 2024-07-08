import axios from "axios";

const fetchStandings = async () => {
  const options = {
    method: "GET",
    url: `https://${process.env.NEXT_PUBLIC_API_FOOTBALL_HOST}/v3/standings`,
    params: {
      season: "2024",
      league: "39",
    },
    headers: {
      "X-RapidAPI-Key": process.env.API_FOOTBALL_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_FOOTBALL_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    const standings = response.data.response[0].league.standings[0];
    return standings;
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while fetching standings."
    );
  }
};

export default fetchStandings;
