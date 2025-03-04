const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const config = require("../config.js")
const cl = db.table("Color")
const ms = require('ms')
const emote = require('../emotes.json')

module.exports = {
    name: 'unbanall',
    usage: 'unbanall',
    description: `Permet d'unban toutes les personnes du serveur.`,
    async execute(client, message, args) {

        if (await owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            message.channel.send({ content: `${emote.utilitaire.loading} Unban all en cours merci de patienter` }).then(async msg => {
                message.guild.bans.fetch().then(bans => {
                    if (bans.size == 0) { msg.edit({ content: "Aucun utilistateur banni" }) };
                    bans.forEach(ban => {
                        message.guild.members.unban(ban.user.id);
                        msg.edit({ content: `${emote.utilitaire} Unban all effectué avec succès` })
                    })
                })
            })
        }
    }
}






