const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config.js")
const { Client, Intents, Collection } = require('discord.js');
const msglog = db.table("msglog")
const color = config.app.color
var getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }) } }


module.exports = {
    name: 'messageDelete',
    once: false,

    async execute(client, message) {

        client.snipes = new Map()


        client.snipes.set(message.channel.id, {
            content: message.content,
            author: message.author,
            image: message.attachments.first() ? message.attachments.first().proxyURL : null
        })


        if (!message.author) return
        let chan = `${await msglog.get(`${message.guild.id}.messagelog`)}`
        if (chan == null) return

        let channel = message.guild.channels.cache.get(chan)
        if (channel == null) return

        const mess = message.content

        var fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',
        }),
            deletionLog = fetchedLogs.entries.first();
        const { executor, target } = deletionLog;
        const embed1 = new Discord.MessageEmbed()
            .setTitle(`❌ Suppression`)
            .setDescription(`Message supprimé de <@${message.author.id}> dans [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id})\n\`${mess}\``)
            .setFooter({ text: `🕙 ${getNow().time}` })
            .setColor(color)
        if (!deletionLog) return channel.send({ embeds: [embed1] })


        const embed = new Discord.MessageEmbed()
            .setTitle(`❌ Suppression`)
            .setDescription(`Message supprimé de <@${message.author.id}> dans [\`${message.channel.name}\`](https://discord.com/channels/${message.guild.id}/${message.channel.id})\n\`${mess}\``)
            .setFooter({ text: `🕙 ${getNow().time}` })
            .setColor(color)

        if (target.id === message.authorID) {
            channel.send({ embeds: [embed] })
        } else {
            channel.send({ embeds: [embed] })
        }
    }
}