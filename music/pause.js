const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const cl = db.table("Color")
const config = require("../config.js")
const { QueryType } = require('discord-player');

module.exports = {
    name: 'pause',
    usage: 'pause',
    category: "owner",
    description: `Music`,
    async execute(client, message, args) {

        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.reply(`Aucun son en cours de lecture ${message.author} <a:noo:957097967553220628>`);

        const success = queue.setPaused(true);

        return message.reply(success ? `${queue.current.title} mis en pause ✅` : `Quelque chose s'est mal passé ${message.author} <a:noo:957097967553220628>`);

    }
}