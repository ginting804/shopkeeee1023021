const { Client, Message, MessageEmbed } = require('discord.js');
const guild = require('../../schema/Guild');
module.exports = {
    name: 'reset-count',
    category: 'Configuration',
    description: 'Permet de recommencer le compteur du serveur',
    usage: '',
    permissions: 'ADMINISTRATOR',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande !');
        guild.findOne({ id: message.guild.id }, async(err, data) => {
            if(!data) {
                return message.channel.send(`Ce serveur n'a pas encore de compteur ! Utilisez la commande \`${client.prefix}set-channel\` pour créer un compteur !`)
            } else {

                await message.channel.send(`Êtes-vous sur de vouloir réinitialiser le compteur ?`).then(async function (m) {
                    await m.react('✅');
                    await m.react('❌');
     
                    let collector = m.createReactionCollector((reaction, user) => user.id == message.author.id, {
                        time: 10000
                    })
               

                collector.on('collect', async(reaction) => {
                    if(reaction.emoji.name == '✅') {
                        data.Current = 0;
                        data.User = "";
                        data.Channel = ""
                        data.save();
                        m.edit(`Le compteur a bien été réinitialisé !`)
                        collector.stop()
                    } else 
                    if(reaction.emoji.name == '❌') {
                        await m.edit(`Le compteur n'a pas été réinitialisé !`)
                        collector.stop()
                    }
                })
                collector.on('end', async() => {
                    await m.reactions.removeAll()
                })
            })
            }
        })
    }
}