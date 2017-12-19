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

const getAllRequestPages = (user, requestFunc) => {
    let pages = []
    let limit = 50
    let max = 0
    let offset = 0

    pages.push(requestFunc(user, offset))
    return pages[0].then(res => {
        max = res.total
        offset += limit
    })
    .then(() => {
        while (offset < max) {
            pages.push(requestFunc(user, offset))
            offset += limit
        }
        return Promise.resolve(pages)
    })
}

const authorizeUser = (authCode) => {
    return rp.post('https://accounts.spotify.com/api/token', {
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
    })
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

const createPlaylist = (user, playlistName) => {
    return rp.post(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
        headers: {
            'Authorization': `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json'
        },
        body: {
            'name': playlistName,
            'public': true
        },
        json: true
    })
}

const getPlaylistPage = (user, offset) => {
    let limit = 50
    return rp(`https://api.spotify.com/v1/users/spotify/playlists?limit=${limit}&offset=${offset}`, {
        headers: {
            'Authorization': `Bearer ${user.accessToken}`
        },
        json: true
    })
}

const addSongsToPlaylist = (playlistId, songIds) => {

}

const getPlaylistTracks = (user, playlistId) => {
    return rp(`https://api.spotify.com/v1/users/spotify/playlists/${playlistId}/tracks`, {
        headers: {
            "Authorization": `Bearer ${user.accessToken}`,
            "Content-Type": 'application/json'
        },
        // body: {
        //     "fields": "items.track.id"
        // },
        json: true
    })
}

const getPlaylists = (user) => {
    return rp(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
        headers: {
            'Authorization': `Bearer ${user.accessToken}`
        },
        json: true
    })
}

const getPlaylistId = (user, playlistName) => {
    return getPlaylists(user)
    .then(res => {
        const playlist = res.items.filter(item => item.name == playlistName)[0]
        return playlist ? playlist.id : null
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

const search = (user, query, type) => {
    return rp(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, {
        headers: {
            "Authorization": `Bearer ${user.accessToken}`,
            "Content-Type": 'application/json'
        },
        json: true
    })
}

module.exports = {
    loginScreenUrl,
    getUserCreds,
    getPlaylists,
    getPlaylistId,
    getPlaylistPage,
    createPlaylist,
    addSongsToPlaylist,
    getAllRequestPages,
    search
}
