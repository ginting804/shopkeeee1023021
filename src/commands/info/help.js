const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const client = require('../..');
const prefix = client.prefix

module.exports = {
    name: 'help',
    category: 'Utilitaire',
    description: 'Affiche la liste des commandes',
    usage: '<command>',
    permissions: 'Aucune',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        const e = []; // Utilitaire
        const o = []; // Configuration
        const r = []; // Économie


        if (client.commands.map(x => x.category == 'Utilitaire')) {
            e.push(client.commands.filter(c => c.category == 'Utilitaire'));
        }
        if (client.commands.map(x => x.category == 'Configuration')) {
            o.push(client.commands.filter(c => c.category == 'Configuration'));
        }
        if (client.commands.map(x => x.category == 'Économie')) {
            r.push(client.commands.filter(c => c.category == 'Économie'));
        }

        const help = args[0];
        if (!help) {
            message.channel.send(new MessageEmbed()
                .setTitle('Liste des commandes')

                .setDescription(`
                **Commandes Utilitaires :**\n
                ${e[0].map(x => `\`${x.name}\``).join(', ')}\n\n 
                **Commandes Configuration :**\n
                ${o[0].map(x => `\`${x.name}\``).join(', ')}\n\n
                **Commandes Économies :**\n
                ${r[0].map(x => `\`${x.name}\``).join(', ')}
                `)
                .setFooter(`Faites ${prefix}help <commande> pour plus d'informations`)
                .setColor('#0099ff'))
        } else {

            const command = client.commands.map(c => c.name).find(c => c === help);
            if (!command) return message.channel.send('Cette commande n\'existe pas !');

            message.channel.send(new MessageEmbed()
                .setTitle(`Aide de la commande \`${command}\``)
                .setDescription(`Description : **${client.commands.get(command).description}**\n Catégorie : **${client.commands.get(command).category}**\n Utilisation : **${prefix}${client.commands.get(command).name} ${client.commands.get(command).usage}**\n Permissions : **${client.commands.get(command).permissions}**`)
                .setColor('#0099ff'))
        }
    }
}