const Eris = require('eris')

const client = Eris(process.env['TOKEN'], {
  intents: 0
})

const commands = require('./commands')

Object.values(commands).forEach(command => {
  console.log(command)
})