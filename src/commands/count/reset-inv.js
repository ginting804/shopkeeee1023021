const { Client, Message, MessageEmbed } = require('discord.js');
const users = require('../../schema/Users');
module.exports = {
    name: 'reset-inv',
    category: 'Configuration',
    description: 'Permet de recommencer les inventaires des membres du serveur',
    usage: '',
    permissions: 'ADMINISTRATOR',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande !');
        users.find({ Guild: message.guild.id  }, async(err, data) => {
            if(!data) {
                return message.channel.send(`Ce serveur n'a pas de membres comptant un inventaire ! Utilisez la commande \`${client.prefix}create-account\` pour créer un compte/inventaire !`)
            } else {

                await message.channel.send(`Êtes-vous sur de vouloir réinitialiser les inventaires ?`).then(async function (m) {
                    await m.react('✅');
                    await m.react('❌');
     
                    let collector = m.createReactionCollector((reaction, user) => user.id == message.author.id, {
                        time: 10000
                    })
               

                collector.on('collect', async(reaction) => {
                    if(reaction.emoji.name == '✅') {
                        data.forEach(async(f) => {
                            f.Items = [];
                            f.save();
                        })
                        await m.edit(`Les inventaires ont bien été réinitialisés !`)
                        collector.stop()
                    } else 
                    if(reaction.emoji.name == '❌') {
                        await m.edit(`Les inventaires n'ont pas été réinitialisés !`)
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