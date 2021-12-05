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
  },
};