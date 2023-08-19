const Discord = require("discord.js")
const config = require("../config.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const ad = db.table("Antidown")

module.exports = {
    name: 'antidown',
    usage: 'antidownn',
    description: `Permet de config l'antiraid.`,
    async execute(client, message, args) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (args[0] == 'on') {
                ad.set(`config.${message.guild.id}.antidown`, true)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'anti down** est maintenant **activé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })

            } else if (args[0] == 'off') {
                ad.set(`config.${message.guild.id}.antidown`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'anti down** est maintenant **désactivé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else {
                return message.reply(`Paramètres invalide`)
            }
        }
    }
}