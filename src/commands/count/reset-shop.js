const { Client, Message, MessageEmbed } = require('discord.js');
const shop = require('../../schema/Shop');
module.exports = {
    name: 'reset-shop',
    category: 'Configuration',
    description: 'Permet de réinitialiser les items du shop',
    usage: '',
    permissions: 'ADMINISTRATOR',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande !');
        shop.find({ Guild: message.guild.id  }, async(err, data) => {
            if(!data) {
                return message.channel.send(`Ce serveur n'a pas de shop ! Utilisez la commande \`${client.prefix}set-item\` pour rajouter des items !`)
            } else {
                await message.channel.send(`Êtes-vous sur de vouloir réinitialiser le shop ?`).then(async function (m) {
                    await m.react('✅');
                    await m.react('❌');
     
                    let collector = m.createReactionCollector((reaction, user) => user.id == message.author.id, {
                        time: 10000
                    })
               

                collector.on('collect', async(reaction) => {
                    if(reaction.emoji.name == '✅') {
                        // delete all items (documents) from the collection using guild id
                        await shop.deleteMany({ id: message.guild.id }, async(err, data) => {
                            if(err) {
                                console.log(err)
                            } else {
                                await m.edit(`Les items du shop ont bien été réinitialisés !`)
                                collector.stop()
                            }
                        })
                    } else 
                    if(reaction.emoji.name == '❌') {
                        await m.edit(`Les items du shop n'ont pas été réinitialisés !`)
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