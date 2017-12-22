const spotify = require('./js/spotify.js')
const createPlaylist = require('./js/createPlaylist.js')
const express = require('express')
const querystring = require('querystring')
const app = express()

app.get('/login', (req, res) => {
    const loginUrl = spotify.loginScreenUrl()
    res.redirect(loginUrl)
})

app.get('/done', (req, res) => {
    spotify.getUserCreds(req.query.code)
    .then(user => {
        createPlaylist(user)
        res.redirect(`http://localhost:3000/loggedIn/#${user.id}`)
    })
})

app.get('/playlistUrl', (req, res) => {
    // return playlist url
})

app.listen(3001, () => {
    console.log('Listening on 3001')
})
