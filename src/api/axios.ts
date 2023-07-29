import axios from "axios";
//import.meta.env.VITE_POKEMON_URL
const baseURL = "https://pokeapi.co/api/v2";
export default axios.create({
  baseURL: baseURL,
});
