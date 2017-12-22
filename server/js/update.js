const spotify = require('./spotify.js')
const db = require('./db.js')

const getDiscoverWeeklyHistoryPlaylist = (user) => {
    return spotify.getPlaylistId(user, "DiscoverWeeklyHistory")
    .then(playlistId => {
        if (playlistId) {
            return playlistId
        } else {
            console.log(`Couldn't find DiscoverWeeklyHistory for ${user.id}`)
            return Promise.reject()
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


const updatePlaylist = (user) => {
    getDiscoverWeeklyHistoryPlaylist(user)
    .then(playlistId => {
        getDiscoverWeeklySongs(user)
        .then(trackUris => spotify.addSongsToPlaylist(user, playlistId, trackUris))
        .then(res => {
        })
    })
    .catch(err => {
    })
}

const update = () => {
    const curDate = new Date()
    console.log(`Updating at ${curDate.toISOString()}`)
    db.loadDB()
    .then(DB => {
        for (id in DB.users) {
            spotify.updateCreds(DB.users[id])
            .then(user => {
                db.updateUser(user)
                updatePlaylist(user)
                console.log(user.id)
            })
        }
    })
}

update()
