const rp = require('request-promise')
const spotify = require('./spotify.js')
const db = require('./db.js')

const createPlaylist = (user) => {
    db.storeUser(user)
    spotify.getPlaylistId(user, "DiscoverWeeklyHistory")
    .then(playlistId => {
        spotify.getDiscoverWeeklySongs(user)
        .then(songs => spotify.addSongsToPlaylist(songs, playlistId))
    })
}

module.exports = createPlaylist
