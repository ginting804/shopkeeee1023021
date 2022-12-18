const { Client, Message, MessageEmbed } = require('discord.js');
const user = require('../../schema/Users');
module.exports = {
    name: 'remove-item',
    category: 'Configuration',
    description: 'Permet de retirer de l\'argent à un membre',
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

        const item = args[1];
        if(!item) return message.channel.send('Veuillez mettre un item !');
        const quantity = args[2];
        if(!quantity) return message.channel.send('Veuillez mettre une quantité !');

        user.findOne({ id: member.id, Guild: message.guild.id, }, async(err, data) => {
            if(!data) {
                return message.channel.send(`Ce membre n'a pas encore de compte ! Utilisez la commande \`${client.prefix}create-account\` pour créer un compte !`)
            } else {
                data.Items.find(it => it.name === item).quantity = parseInt(data.Items.find(it => it.name === item).quantity) - parseInt(quantity);
                if(data.Items.find(it => it.name === item).quantity <= 0) {
                    data.Items.splice(data.Items.findIndex(it => it.name === item), 1);
                }
            }
            data.save();
            message.channel.send(`${member} a bien perdu ${quantity} ${item} !`)
        })
    }
}