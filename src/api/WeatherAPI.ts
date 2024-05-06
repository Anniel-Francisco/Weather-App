import axios from "axios";

export default {
  async getWeather(location: string) {
    return axios.get(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=${location}&aqi=no`).then(data => data);
  },
};
