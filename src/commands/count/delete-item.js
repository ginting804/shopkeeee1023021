const { Client, Message, MessageEmbed } = require('discord.js');
const Items = require('../../schema/Shop');

  module.exports = {
      name: 'delete-item',
      category: 'Configuration',
      description: 'Permet de supprimer un item pour du shop',
      usage: '<item>',
      permissions: 'MANAGE_MESSAGES',
      /** 
       * @param {Client} client 
       * @param {Message} message 
       * @param {String[]} args 
       */
      run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission de faire cette commande !');
          const item_name = args[0];

          if(!item_name) return message.reply('Veuillez mettre un nom !');

          Items.deleteOne({
            id: message.guild.id,
            name: item_name
          }, async(err, data) => {
            if(err) throw err;

            message.channel.send(`L'item ${item_name} a bien été supprimé du shop !`);
          })
      }
    }