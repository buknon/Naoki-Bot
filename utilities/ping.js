const ms = require('ms')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const config = require("../config.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const cl = db.table("Color")
const footer = config.app.footer

module.exports = {
    name: 'ping',

    async execute(client, message, args) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        const embed = new Discord.MessageEmbed()
        embed.addField('BOT', client.ws.ping + 'ms', true)
        embed.setColor()
        message.channel.send({ embeds: [embed] }).then(async msg => {
            embed.addField("API", msg.createdTimestamp - message.createdTimestamp + 'ms', true)
            msg.edit({ embeds: [embed] })
        })
    }
}