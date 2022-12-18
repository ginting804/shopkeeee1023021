const { Client, Message, MessageEmbed } = require('discord.js');
const Items = require('../../schema/Shop');

  module.exports = {
      name: 'set-item',
      category: 'Configuration',
      description: 'Permet de définir un item pour le shop',
      usage: '<item> <prix> <description>',
      permissions: 'MANAGE_MESSAGES',
      /** 
       * @param {Client} client 
       * @param {Message} message 
       * @param {String[]} args 
       */
      run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission de faire cette commande !');
          const item_name = args[0];
          const item_price = args[1];
          const item_description = args.slice(2).join(' ');

          if(!item_name) return message.reply('Veuillez mettre un nom !');
          if(!item_price) return message.reply('Veuillez mettre un prix !');
            if(!item_description) return message.reply('Veuillez mettre une description !');

          Items.findOne({
            id: message.guild.id,
          }, async(err, data) => {
            if(err) throw err;
              data = new Items({
                id: message.guild.id,
                name: item_name,
                price: item_price,
                description: item_description
              })

            data.save();
            message.channel.send(`L'item ${item_name} (${item_price} Kara) a bien été ajouté au shop !`);
          })
      }
    }