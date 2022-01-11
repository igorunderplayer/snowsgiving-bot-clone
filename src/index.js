require('dotenv/config')
const Eris = require('eris')

const client = Eris(process.env['TOKEN'], {
  intents: 1,
  restMode: true,
  messageLimit: 5
})

const commands = require('./commands')

client.on('ready', () => {
  console.log('Ready!')
})

client.on('interactionCreate', async (interaction) => {
  if(interaction.type == 2) {
    const cmd = commands[interaction.data.name]

    if(cmd) {
      try {
        await cmd.run(client, interaction)
      } catch (err) {
        console.error(err)
      }
    }
  }
})

client.connect()

