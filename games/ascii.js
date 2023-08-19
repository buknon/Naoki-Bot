const figlet = require('figlet');
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const p = db.table("Prefix")
const config = require("../config.js")
const footer = config.app.footer
const emote = require('../emotes.json')

module.exports = {
    name: 'ascii',
    usage: 'ascii',
    description: `jeux`,
    async execute(client, message, args) {

        let pf = await p.get(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        if (!args[0]) return message.channel.send(`${emote.games.no} **Veuillez fournir du texte**`);

        msg = args.join(" ");

        message.delete()

        figlet.text(msg, function (err, data) {
            if (err) {
                console.log(`Quelque chose s'est mal passé`);
                console.dir(err);
            }
            if (data.length > 2000) return message.channel.send(`${emote.games.no} **Veuillez fournir un texte de moins de 2 000 caractères**`)

            message.channel.send('```' + data + '```')
        })
    }
}