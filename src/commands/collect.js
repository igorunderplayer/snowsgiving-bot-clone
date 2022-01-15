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

    if (!!user.timeout && WARMUP - (Date.now() - user.timeout) > 0) {
      const time = ~~((Date.now() + WARMUP - (Date.now() - user.timeout)) / 1000)

      return interaction.createMessage({
        embed: {
          description: `Você foi atingido por uma bola de neve, por favor, se aqueça primeiro. (pronto em <t:${time}:R>)`,
          color: 0xe67e22
        }
      })
    } else if (!!user.cooldown && COOLDOWN - (Date.now() - user.cooldown) > 0) {
      return interaction.createMessage({
        embed: {
          description: 'Você já pegou toda a neve! Deixe cair por cerca de 30 segundos, então você poderá fazer outra bola de neve.',
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

      const balls = user.balls + 1

      interaction.createMessage({
        embed: {
          description: `Colocando seu par de luvas mais quentes, você juntou um pouco de neve e começou a moldar algumas bolas de neve. Agora você tem **${balls}** delas - deixe-os voar!`,
          color: 0x5865F2,
          image: {
            url: 'https://cdn.discordapp.com/attachments/746119086702067844/930572369989357608/throw.png'
          }
        }
      })
    }
  }
}