require('dotenv').load();
const rp = require('request-promise')
const querystring = require('querystring')
const redirect_uri = 'http://localhost:3001/done'

function loginScreen() {
  return 'https://accounts.spotify.com/en/authorize?' +
    querystring.stringify({
      client_id: process.env.client_id,
      response_type: 'code',
      redirect_uri: redirect_uri,
    })
}

function fetchAuthToken(authCode) {
  console.log(authCode)
}

module.exports = {
  loginScreen,
  fetchAuthToken
}
