const axios = require("axios");

module.exports =
{
  axios_request: function (url, method, header, timeout) {
    return axios({
      url: url,
      method: method,
      headers: header,
      timeout: timeout,
    })
    .then(res => res.data)
    .catch(err => console.log("Error WeatherApi: ", err));
  },

  getCurrentTemp: function (city) {
    axios_request(
      "https://api.weatherapi.com/v1/current.json?key="+WEATHER_API_KEY+"&q="+city,
      "get",
      {"Content-Type": "application/json"},
      8000
    );
    res.send(response);
  }
};