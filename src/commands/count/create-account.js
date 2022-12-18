const { Client, Message, MessageEmbed, User } = require('discord.js');
const user = require('../../schema/Users');
module.exports = {
    name: 'create-account',
    category: 'Configuration',
    description: 'Permet de se créer un compte',
    usage: '',
    permissions: 'MANAGE_MESSAGES',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {        
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission de faire cette commande !');
        user.findOne({ id: message.author.id, Guild: message.guild.id }, async(err, data) => {
            if(data) {
                return message.channel.send(`Vous avez déjà un compte !`)
            } else {
                data = new user({
                    id: message.author.id,
                    Guild: message.guild.id,
                    Counts: 0,
                    Points: 0,
                    Items: [],
                })
                data.save();
                message.channel.send(`Vous avez bien créé un compte !`)
            }
        })
    }
}