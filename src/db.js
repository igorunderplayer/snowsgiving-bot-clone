const SimplDb = require('simpl.db')

const db = SimplDb({
  collectionsFolder: './collections',
  dataFile: './database/db.json'
})

const Guilds = db.createCollection('guilds')

module.exports = { db, Guilds }