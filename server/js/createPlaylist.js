const rp = require('request-promise')
const spotify = require('./spotify.js')
const db = require('./db.js')

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
    return spotify.getAllRequestPages(user, spotify.getPlaylistPage)
    .then(pages => {
        return Promise.all(pages)
        .then(resList => {
            resList.map((res) => {
                targetPlaylistNames = res.items.map(item => item.name)
                console.log(targetPlaylistNames)
                // if (targetPlaylist) {
                //     console.log('Its here')
                //     return targetPlaylist.id
                // }
            })
        })
    })
}

const getDiscoverWeeklySongs = (user) => {
    return getDiscoverWeeklyPlaylist(user)
    .then(id => {
        console.log(id)
    })
    // .then(id => getPlaylistTracks(user, id))
}

const createPlaylist = (user) => {
    // db.storeUser(user)
    getDiscoverWeeklyHistoryPlaylist(user)
    .then(playlistId => {
        getDiscoverWeeklySongs(user)
        .then(songs => spotify.addSongsToPlaylist(songs, playlistId))
    })
}

module.exports = createPlaylist
