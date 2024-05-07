import axios from "axios";

const fetchUpcoming = async () => {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    params: {
      season: "2023",
      team: "42",
    },
    /*headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
    },*/
    headers: {
      "X-RapidAPI-Key": "868455a8d0mshf05117d7763056fp1a7547jsn3d555557a5cd",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response);
    return response.data.response; // Ensure this is the expected data
  } catch (error) {
    throw new Error(
      error.message || "An error occurred while fetching standings."
    );
  }
};

export default fetchUpcoming;
