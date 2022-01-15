const { Guilds } = require('../db')

module.exports = {
  name: 'leaderboard',
  description: 'Exibe a pontuação do desempenho dos membros do seu servidor.',

  run: async (client, interaction) => {
    const guild = Guilds.getOrCreate((guild) => guild.id == interaction.guildID, {
      id: interaction.guildID,
      users: {}
    })

    const data = Object.values(guild.users).sort((a, b) => b.hits - a.hits).slice(0, 10)

    const embed = {
      title: 'Campeões de bola de neve',
      description: '( Acertos / Erros / Acertado? )',
      color: 0x5865F2,
      fields: []
    }

    for await (const u of data) {
      const user = await client.getRESTUser(u.id)
      const index = data.indexOf(u)

      embed.fields.push({
        name: `${index + 1} | ${user.username}#${user.discriminator}`,
        value: `( ${u.hits} / ${u.fails} / ${u.hitted} )`
      })
    }

    interaction.createMessage({
      embed
    })
  }
}