require('dotenv').load();
const rp = require('request-promise')
const querystring = require('querystring')
const btoa = require('btoa')
const redirect_uri = 'http://localhost:3001/done'

const loginScreenUrl = () => {
    return 'https://accounts.spotify.com/en/authorize?' +
    querystring.stringify({
        client_id: process.env.client_id,
        response_type: 'code',
        redirect_uri: redirect_uri,
        scope: 'playlist-modify-private playlist-modify-public'
    })
}

const authorizeUser = (authCode) => {
    const req = {
        uri: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(process.env.client_id + ':' + process.env.client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            grant_type: "authorization_code",
            code: authCode,
            redirect_uri: redirect_uri,
        },
        json: true
    }
    return rp.post(req)
    .then((res) => {
        return {access_token: res.access_token,
                refresh_token: res.refresh_token}
    })
}

const getUserInfo = (tokens) => {
    return rp('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
            'Content-Type': 'application/json'
        },
        json: true
    })
}

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
}

const getDiscoverWeeklySongs = (user) => {
    return getPlaylistId(user, "Discover Weekly")
    .then(id => getPlaylistTracks(user, id))
    .then(res => {
        console.log(`res: ${res}`)
    })
}

const addSongsToPlaylist = (playlistId, songIds) => {

}

const getPlaylistTracks = (user, playlistId) => {
    return rp.post(`https://api.spotify.com/v1/users/${user.id}/playlists/${playlistId}/tracks`, {
        headers: {
            'Authorization': `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json'
        },
        body: {
            'fields': 'items.track.id'
        },
        json: true
    })
}

const getPlaylists = (user) => {
    return rp('https://api.spotify.com/v1/me/playlists', {
        headers: {
            'Authorization': `Bearer ${user.accessToken}`
        },
        json: true
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}

const getPlaylistId = (user, playlistName) => {
    return getPlaylists(user)
    .then(res => {
        const playlist = res.items.filter(item => item.name == playlistName)[0]
        if (playlist) {
            return playlist.id
        } else {
            return spotify.createPlaylist(user)
            .then(res => res.id)
        }
    })
}

const getUserCreds = (authCode) => {
    return authorizeUser(authCode)
    .then(tokens => {
        return getUserInfo(tokens)
        .then(user => {

            return {
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                id: user.id
            }
        })
    })
}


module.exports = {
    loginScreenUrl,
    getUserCreds,
    getPlaylists,
    createPlaylist,
    getPlaylistId,
    getDiscoverWeeklySongs,
    addSongsToPlaylist
}
