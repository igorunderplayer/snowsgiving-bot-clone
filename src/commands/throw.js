const { Guilds } = require('../db')
const messages = require('../assets/json/messages.json')

module.exports = {
  name: 'throw',
  description: 'Joga uma bola de neve em outro usuário no servidor.',
  options: [{
    name: 'alvo',
    description: 'Em quem você quer jogar uma bola de neve?',
    type: 6,
    required: true
  }],
  run: async (client, interaction) => {
    const target = await client.getRESTUser(interaction.data.options[0].value)

    const guild = Guilds.fetchOrCreate((guild) => guild.id == interaction.guildID, {
      id: interaction.guildID,
      users: {}
    })

    const dbUser = guild.users[interaction.member.id]

    if (!dbUser || dbUser.balls < 1) {
      return interaction.createMessage({
        embed: {
          description: 'Ops! Parece que você não tem nenhuma bola de neve. Use /collect para aumentar o estoque!',
          color: 0xe67e22
        }
      })
    }
    const results = ['success', 'fail']
    const result = results[Math.floor((Math.random() * results.length))]
    const message = messages[result][Math.floor((Math.random() * messages[result].length))]

    if(target.id == interaction.member.id || result == 'fail') {
      Guilds.update(
        guild => {
          const user = guild.users[interaction.member.id]
          user.balls -= 1
          user.fails += 1
        },
        guild => guild.id == interaction.guildID
      )
    }

    if (target.id == interaction.member.id) {
      return interaction.createMessage({
        embed: {
          description: 'Você não pode jogar uma bola de neve a si mesmo! A menos que você goste, esmague-o contra o seu rosto... então escolha um colega membro do servidor!',
          color: 0xED4245
        }
      })
    }

    if (result == 'success') {
      Guilds.update(
        guild => {
          const user = guild.users[interaction.member.id]
          user.balls -= 1
          user.hits += 1
        },
        guild => guild.id == interaction.guildID
      )


      Guilds.update(
        guild => {
          const user = guild.users[target.id] ?? {
            id: target.id,
            balls: 0,
            hits: 0,
            hitted: 0,
            fails: 0,
            cooldown: null,
            timeout: null
          }
          user.timeout = Date.now()
          user.hitted += 1
        },
        guild => guild.id == interaction.guildID
      )
    }

    const COLORS = {
      success: 0x57F287,
      fail: 0xe67e22
    }

    const IMAGES = {
      success: 'https://cdn.discordapp.com/attachments/746119086702067844/930572369507020810/hit.png',
      fail: 'https://cdn.discordapp.com/attachments/746119086702067844/930572369758674944/miss.png'
    }

    interaction.createMessage({
      embed: {
        description: message.replaceAll('{user}', target.username),
        color: COLORS[result],
        image: {
          url: IMAGES[result]
        }
      }
    })
  }
}