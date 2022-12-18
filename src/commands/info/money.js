const { Client, Message, MessageEmbed } = require('discord.js');
const user = require('../../schema/Users');
const { emoji } = require('../../config.json');

module.exports = {
    name: 'money',
    category: 'Économie',
    description: 'Affiche toutes les informations de votre inventaire.',
    usage: '',
    permissions: 'Aucune',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const member = message.mentions.users.first() || message.author;
        await user.findOne({ id: member.id, Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
                return message.channel.send(`Ce membre n'a pas encore de compte ! Utilisez la commande \`${client.prefix}create-account\` pour créer un compte !`)
            } else {
                const embed = new MessageEmbed()
                .setTitle(`Banque de **${member.username}**`)
                .setDescription(`Kara : **${data.Points}** ${emoji}\n\n`)
                .setFooter(message.author.username, message.author.avatarURL())
                .setColor(message.member.displayHexColor)
                .setTimestamp()
                message.channel.send(embed)
            }
        })
    }
}