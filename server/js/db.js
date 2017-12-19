const fs = require('fs')

const loadDB = () => {
    return JSON.parse(fs.readFileSync('db.json', 'utf8'))
}

const saveDB = (db) => {
    fs.writeFileSync('db.json', JSON.stringify(db, null, '    '))
}

const storeUser = (user) => {
    const db = loadDB()
    db.users[user.id] = user
    saveDB(db)
    return user
}

module.exports = {
    storeUser
}
