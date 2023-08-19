const Discord = require("discord.js")
const config = require("../config.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const ae = db.table("Antieveryone")

module.exports = {
    name: 'antieveryone',
    usage: 'antieveryone',
    description: `Permet de config l'antiraid.`,
    async execute(client, message, args) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (args[0] == 'on') {
                ae.set(`config.${message.guild.id}.antieveryone`, true)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'Antieveryone** est maintenant **activé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else if (args[0] == 'off') {
                ae.set(`config.${message.guild.id}.antieveryone`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'Antieveryone** est maintenant **désactivé**`)
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
            } else {
                return message.reply(`Paramètres invalide`)
            }
        }
    }
}