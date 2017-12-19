const rp = require('request-promise')

const createPlaylist = (user) => {
    return rp.post(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
        headers: {
            'Authorization': `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json'
        },
        body: {
            'name': 'DiscoverWeeklyHistory',
            'public': true
        },
        json: true
    })
    .then(res => {
        return res.id
    })
    .catch(err => {
        console.log(err)
    })
}

const getDiscoverWeeklySongs = (user) => {

}

const addSongsToPlaylist = (playlistId, songIds) => {

}

const setup = (user) => {
    createPlaylist(user)
    // .then(user => getDiscoverWeeklySongs(user))
    // .then(user, songs => addSongsToPlaylist(user, songs))
}

module.exports = {
    setup,

}
