const Eris = require('eris')

const client = Eris(process.env['TOKEN'], {
  intents: 0
})

const { collect } = require('./commands')

client.on('interactionCreate', (interaction) => {
  if(interaction.type == 2) {
    if(interaction.data.name == 'collect') {
      collect.run(interaction)
    }
  }
})

