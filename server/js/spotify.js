require('dotenv').load();
const rp = require('request-promise')
const querystring = require('querystring')
const btoa = require('btoa')
const redirect_uri = 'http://localhost:3001/done'
const fs = require('fs')

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
            Authorization: `Bearer ${tokens.access_token}`
        }
    })
    .then((user) => {
        return {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            id: user.id
        }
    })
}

const getUserCreds = (authCode) => {
    return authorizeUser(authCode)
    .then(tokens => getUserInfo(tokens))
}

const storeUser = (tokens) => {
    return getUser(tokens)
    .then(user => {
        const db = JSON.parse(fs.readFileSync('db.json', 'utf8'))
        let userIdx = 0
        let dbUser = db.users.filter((dbEntry, idx) => {
            userIdx = idx
            return dbEntry.userId == user.id
        })[0]
        if (!dbUser) {
            db.users.push(user)
        } else {
            db.users[dbIdx] = dbUser
        }
        return user
    })
}

module.exports = {
    loginScreenUrl,
    getUserCreds
}
