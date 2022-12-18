const { Client, Message, MessageEmbed } = require('discord.js');
const user = require('../../schema/Users');
const shop = require('../../schema/Shop');
module.exports = {
    name: 'add-item',
    category: 'Configuration',
    description: 'Permet d\'ajouter un object du shop à un membre',
    usage: '<membre> <item> <quantity>',
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

        shop.findOne({ id: message.guild.id, name: item }, async(err, data) => {

            if(!data) {
                return message.channel.send('Cet item n\'existe pas !')
            } else {
                user.findOne({ id: member.id, Guild: message.guild.id }, async(err, data2) => {

                    if(!data2) {
                        return message.channel.send(`Ce membre n'a pas encore de compte ! Utilisez la commande \`${client.prefix}create-account\` pour créer un compte !`)
                    } else {

                        if(data2.Items.find(it => it.name === item)) {
                            data2.Items.find(it => it.name === item).quantity = parseInt(data2.Items.find(it => it.name === item).quantity) + parseInt(quantity);
                        } else {
                            data2.Items.push({
                                name: item,
                                quantity: quantity
                            })
                        }

                        data2.save();
                    message.channel.send(`${member} a bien reçu ${quantity} ${item} !`)
                    }
                })
            }
        })
    }
}