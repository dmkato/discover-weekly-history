const {loginScreen, fetchAuthToken} = require('./js/spotify.js')
const express = require('express')
const app = express()

app.get('/login', (req, res) => {
    res.redirect(loginScreen())
})

app.get('/done', (req, res) => {
  fetchAuthToken(req.query.code)
  res.redirect('http://localhost:3000/loggedIn')
})

app.listen(3001, () => {
  console.log('Listening on 3001')
});
