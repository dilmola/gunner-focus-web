import axios from "axios";

const fetchUpcoming = async () => {
  const options = {
    method: "GET",
    url: `https://${process.env.NEXT_PUBLIC_API_FOOTBALL_HOST}/v3/fixtures`,
    params: {
      season: "2024",
      team: "42",
    },
    headers: {
      "X-RapidAPI-Key": process.env.API_FOOTBALL_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_FOOTBALL_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.response; 
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while fetching standings."
    );
  }
};

export default fetchUpcoming;
