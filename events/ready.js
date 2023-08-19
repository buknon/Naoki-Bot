const Discord = require('discord.js')
const config = require('../config')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const cl = db.table("Color")
const pfp = db.table("Pfp")
module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        const status = await db.get('stream');
        const type = await db.get('type');
        client.user.setActivity(status, { type: type, url: "https://twitch.tv/karma" });
        console.log("Naoki Yoko Perso")
        console.log("---------------------------------------")
        console.log(`> [BOT]: ${client.user.username} est en ligne !`)
        console.log(`> [PREFIX]: ${config.app.px}`);

        console.log("---------------------------------------")
        console.log(`> [INVITE]: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)

        setInterval(() => {
            client.guilds.cache.forEach(async guild => {

                let color = await cl.get(`color_${guild.id}`)
                if (color == null) color = config.app.color

                const channelId = await pfp.get(`${guild.id}.channelpfp`)
                if (!channelId) return;
                const channel = guild.channels.cache.get(channelId)
                if (!channel) return;
                const user = client.users.cache.random();
                const embed = new Discord.MessageEmbed({ footer: { text: user.username } })
                    .setTitle("Pfp")
                    .setImage(user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
                    .setColor(color);
                const button = new Discord.MessageButton()
                    .setLabel("Avatar")
                    .setURL(user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
                    .setStyle("LINK");
                const row = new Discord.MessageActionRow().addComponents(button)
                channel.send({ embeds: [embed], components: [row] });
            })
        }, ms("30s"))


        if (db.get('stream') === null) return client.user.setActivity(`${client.users.cache.size} utilisateurs !`, { type: "WATCHING", url: 'https://www.twitch.tv/karma' });
        if (db.get('stream') === undefined) return client.user.setActivity(`${client.users.cache.size} utilisateurs !`, { type: "WATCHING", url: 'https://www.twitch.tv/karma' });
        if (db.get('stream') === false) return client.user.setActivity(`${client.users.cache.size} utilisateurs !`, { type: "WATCHING", url: 'https://www.twitch.tv/karma' });
    }
}
