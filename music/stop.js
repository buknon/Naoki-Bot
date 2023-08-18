const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const cl = db.table("Color")
const config = require("../config.js")
const { QueryType } = require('discord-player');
const emote = require('../emotes.json')
module.exports = {
    name: 'stop',
    usage: 'stop',
    category: "owner",
    description: `Music`,
    async execute(client, message, args) {

        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply(`Aucun son en cours de lecture ${message.author} ❌`);

        queue.destroy();

        message.reply(`La musique s'est arrêtée ${emote.musique.yes}`);

    }
}