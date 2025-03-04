const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const cl = db.table("Color")
const fs = require('fs')
const config = require("../config.js")

module.exports = {
    name: 'bypass',
    usage: 'bypass',
    description: `bypass`,
    async execute(client, message, args) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`
        
**\`antiadmin | Owner\`**
**\`antiban | Owner\`**
**\`antiupdate | Owner\`**
**\`antibot | Owner\`**
**\`antilink | Owner | Wl\`**
**\`antieveryone | Owner | Wl\`**
**\`antichannel create | Owner | Wl\`**
**\`antichannel delete | Owner\`**
**\`antichannel update | Owner\`**
**\`antirole create | Owner\`**
**\`antirole delete | Owner\`**
**\`antirole update | Owner\`**
**\`antiwebhook | Owner\`**
        
        `)

        message.channel.send({ embeds: [embed] });
    }
}