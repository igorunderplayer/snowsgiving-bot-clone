const SimplDb = require('simpl.db')

const db = SimplDb({
  collectionsFolder: './collections',
  dataFile: './src/database/db.json',
  autoSave: true
})

const Guilds = db.createCollection('guilds')

module.exports = { db, Guilds }