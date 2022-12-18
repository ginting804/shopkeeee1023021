const { Client, Message } = require('discord.js');
const Guild = require('../../schema/Guild');
  module.exports = {
      name: 'set-channel',
      category: 'Configuration',
      description: 'Permet de définir le salon de comptage',
      usage: '<channel>',
      permissions: 'MANAGE_MESSAGES',
      /** 
       * @param {Client} client 
       * @param {Message} message 
       * @param {String[]} args 
       */
      run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission de faire cette commande !');
        const channel = message.mentions.channels.first();
        if(!channel) return message.reply('Veuillez mentionner un salon !');
        Guild.findOne({
          id: message.guild.id,
        }, async(err, data) => {
          if(err) throw err;
          if(data) {
            data.Channel = channel.id;
          } else {
            data = new Guild({
              id: message.guild.id,
              Current: 0,
              Channel: channel.id
            })
          }
          data.save();
          message.channel.send('Le compteur est appliqué dans le salon ' + channel.toString());
        })
      }
  }