const { Client, Message, MessageEmbed } = require('discord.js');
const user = require('../../schema/Users');
module.exports = {
    name: 'add-money',
    category: 'Configuration',
    description: 'Permet d\'ajouter de l\'argent à un membre',
    usage: '<membre> <quantity>',
    permissions: 'MANAGE_MESSAGES',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission de faire cette commande !');
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.channel.send('Veuillez mentionner un membre !');

        const money = args[1];
        if(!money) return message.channel.send('Veuillez mettre une quantité !');

        user.findOne({ id: member.id, Guild: message.guild.id }, async(err, data) => {
            if(!data) {
                return message.channel.send(`Ce membre n'a pas encore de compte ! Utilisez la commande \`${client.prefix}create-account\` pour créer un compte !`)
            } else {
                data.Points = parseInt(data.Points) + parseInt(money);
            }
            data.save();
            message.channel.send(`${member} a bien reçu ${money} Kara !`)
        })
    }
}