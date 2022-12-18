const client = require('../index');

client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`);
    client.user.setActivity('%leaderboard', {
        type: 'STREAMING',
        url: 'https://twitch.tv/saboyana'
    })
})