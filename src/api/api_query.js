import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "0e0e616fa66b34c2391ce2742c991f6f";

const getMovieDetail = async (movieId) => {
  const URL = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
  try {
    const response = await axios.get(URL);
    return response.data; // Return the actual data from the response
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null; // Return null or some error indication on failure
  }
};

export default getMovieDetail; // Assuming you'd like to export it for external use
