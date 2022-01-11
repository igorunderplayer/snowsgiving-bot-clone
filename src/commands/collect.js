const { Guilds } = require('../db')

const COOLDOWN = 30 * 1000 // 30 seconds
const WARMUP = 120 * 1000 // 2 minutes

module.exports = {
  name: 'collect',
  description: 'Coleta uma bola de neve',

  run: async (_client, interaction) => {

    const guild = Guilds.fetchOrCreate(guild => guild.id == interaction.guildID, {
      id: interaction.guildID,
      users: {}
    })

    let user = null;

    if (!guild.users[interaction.member.id]) {
      user = {
        id: interaction.member.id,
        balls: 0,
        hits: 0,
        hitted: 0,
        fails: 0,
        cooldown: null,
        timeout: null
      }
    }
    else {
      user = guild.users[interaction.member.id]
    }

    if (user.timeout != null && WARMUP - (Date.now() - user.timeout) > 0) {
      const time = (Date.now() + WARMUP - (Date.now() - timeout) / 1000).toFixed()

      return interaction.createMessage({
        embed: {
          description: `penos (ready <t:${time}:R>)`,
          color: 0xe67e22
        }
      })
    } else if (user.cooldown != null && COOLDOWN - (Date.now() - user.cooldown) > 0) {
      return interaction.createMessage({
        embed: {
          description: `cool`,
          color: 0xe67e22
        }
      })
    } else {
      Guilds.update(
        guild => {
          const user = guild.users[interaction.member.id]
          user.balls += 1
          user.cooldown = Date.now()
        },
        guild => guild.id == interaction.guildID
      )

      interaction.createMessage('Coleto')
    }
  }
}