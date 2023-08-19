const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const config = require("../config.js")
const footer = config.app.footer

module.exports = {
    name: 'gestion',
    usage: 'gestion',
    description: `Permet d'afficher toutes les commandes de gestions`,
    async execute(client, message, args) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        let pf = await p.get(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        const Embed = new Discord.MessageEmbed()
            .setTitle(`Gestion Permissions`)
            .setDescription(`Prefix actuel : \`${pf}\``)
            .addField(`\`pall\` : `, `Désactive toutes les permissions du serveur à tous les roles`)
            .addField(`\`padmin\` : `, `Désactive toutes les permissions administrateur du serveur`)
            .addField(`\`prole\` : `, `Désactive toutes les permissions roles du serveur`)
            .addField(`\`pkick\` : `, `Désactive toutes les permissions kick du serveur`)
            .addField(`\`pban\` : `, ` Désactive toutes les permissions ban du serveur`)
            .addField(`\`pmoove\` : `, ` Désactive toutes les permissions moove du serveur`)
            .addField(`\`pwebhooks\` : `, `Désactive toutes les permissions créer des webhooks du serveur`)
            .addField(`\`pmute\` : `, `Désactive toutes les permissions mute du serveur`)
            .addField(`\`pviewc\` : `, `Désactive toutes les permissions voir les salons du serveur`)
            .addField(`\`pserver\` : `, `Désactive toutes les permissions gérer le serveur`)
            .setFooter({ text: `${footer}` })
            .setColor(color)
        message.channel.send({ embeds: [Embed] })
    }
}