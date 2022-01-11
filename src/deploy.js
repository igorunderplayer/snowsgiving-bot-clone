require('dotenv/config')
const Eris = require('eris')

const client = Eris(process.env['TOKEN'], {
  intents: 0
})


client.connect()


client.once('ready', async () => {
  const commands = require('./commands')

  const commandValues = Object.values(commands)

  commandValues.forEach(async (command, i) => {
    if (process.argv.includes('--dev-guild')) {
      await client.createGuildCommand('672933215836569610', command).then(() => {
        console.log(`Command ${command.name} created!`)
      })
    } else {
      await client.createCommand(command).then(() => {
        console.log(`Global Command ${command.name} created!`)
      })
    }

    if (i === commandValues.length - 1) process.exit()
  })
})