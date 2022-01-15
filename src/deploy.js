require('dotenv/config')
const Eris = require('eris')

const client = Eris(process.env['TOKEN'], {
  intents: 0
})

client.connect()

const DEV_GUILD = '672933215836569610'

client.once('ready', async () => {
  const commands = require('./commands')
  const commandValues = Object.values(commands)

  for await (const command of commandValues) {
    if (process.argv.includes('--dev-guild')) {
      await client.createGuildCommand(DEV_GUILD, command).then(() => {
        console.log(`Command ${command.name} created!`)
      })
    } else {
      await client.createCommand(command).then(() => {
        console.log(`Global Command ${command.name} created!`)
      })
    }
  }

  process.exit()
})