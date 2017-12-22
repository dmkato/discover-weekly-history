const rp = require('request-promise')
const spotify = require('./spotify.js')
const db = require('./db.js')

const checkDWH = (user) => {
    return spotify.getPlaylistId(user, "DiscoverWeeklyHistory")
    .then(res => {
        if (res) return true
        else return false
    })
}

const getDiscoverWeeklyHistoryPlaylist = (user) => {
    return spotify.getPlaylistId(user, "DiscoverWeeklyHistory")
    .then(playlistId => {
        if (playlistId) {
            return playlistId
        } else {
            return spotify.createPlaylist(user, "DiscoverWeeklyHistory")
            .then(res => res.id)
        }
    })
}

const getDiscoverWeeklyPlaylist = (user) => {
    return spotify.search(user, 'discover weekly', 'playlist')
    .then(res => res.playlists.items[0].id)
}

const getDiscoverWeeklySongs = (user) => {
    return getDiscoverWeeklyPlaylist(user)
    .then(id => spotify.getPlaylistTracks(user, id))
    .then(res => res.items.map(item => item.track.uri))
}

const createPlaylist = (user) => {
    db.updateUser(user)
    checkDWH(user)
    .then(DWHExists => {
        if (DWHExists) console.log('Already Created DiscoverWeeklyHistory')
        else {
            getDiscoverWeeklyHistoryPlaylist(user)
            .then(playlistId => {
                getDiscoverWeeklySongs(user)
                .then(trackUris => spotify.addSongsToPlaylist(user, playlistId, trackUris))
            })
        }
    })
}

module.exports = createPlaylist
