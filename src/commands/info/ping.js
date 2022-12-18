const { Client, Message, MessageEmbed, version } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    name : 'info',
    category : 'Utilitaire',
    description : 'Retourne les informations du bot',
    usage : '',
    permissions: 'Aucune',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const msg = await message.channel.send(new MessageEmbed()
        .setDescription('Patientez un instant...')
        .setColor('#0099ff'))

        const embed = new MessageEmbed()
            .setTitle('Information du bot')
            .setDescription(`ㅤ`)
            .addFields(
                { name: 'Latence du bot', value: `${msg.createdTimestamp - message.createdTimestamp}ms\n`},
                { name: 'Latence de l\'API', value: `${Math.round(client.ws.ping)}ms`},
                { name: 'Nombre de serveurs', value: `${client.guilds.cache.size}`, inline: true },
                { name: 'Version du bot', value: `${version}`, inline: true },
                { name: 'Invitation du bot', value: `[Cliquez ici](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`, inline: true },
                { name: 'Créateur', value: `<@!${config.id}>`, inline: true }
                )
            setTimeout(() => {
            msg.edit("", { embed: embed })
            }, 1500)
    }
}