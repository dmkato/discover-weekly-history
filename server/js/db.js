const fs = require('fs')

const loadDB = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        resolve(JSON.parse(data))
    })
  })
}

const saveDB = (db) => {
    fs.writeFile('./db.json', JSON.stringify(db, null, '    '), 'utf8')
}

const updateUser = (user) => {
    return loadDB()
    .then(db => {
        db.users[user.id] = user
        saveDB(db)
    })
}

const userExists = (user) => {
    return loadDB()
    .then(db => {
        if (db.user[user.id]) return true
        else return false
    })
}

module.exports = {
    updateUser,
    loadDB,
    userExists
}
