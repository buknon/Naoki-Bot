const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const config = require("../config.js")
const logticket = db.table("ticketlog")
const lograid = db.table("raidlog")
const logembed = db.table("embedlog")
const logmod = db.table("modlog")
const loggw = db.table("giveaway")
const logboost = db.table("boostlog")
const msglog = db.table("msglog")
const alertelog = db.table("AlertePerm")
const p = db.table("Prefix")
const cl = db.table("Color")
const ct = db.table("CategorieTicket")
const mstatut = db.table("MsgStatut")
const rstatut = db.table("RoleStatut")
const emote = require('../emotes.json')

module.exports = {
    name: 'config',
    usage: 'config',
    description: `Permet de voir la configuration du bot sur le serveur`,
    async execute(client, message, args) {

        const e = emote.administration.loading

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        let alerte = alertelog.get(`${message.guild.id}.alerteperm`)
        if (alerte == null) alerte = "Non configuré"

        let ticket = ct.get(`${message.guild.id}.categorie`)
        if (ticket == null) ticket = "Non configuré"

        let role = db.get(`role_${message.guild.id}`)
        if (role == null) role = "Non configuré"

        let ticketlog = `<#${logticket.get(`${message.guild.id}.ticketlog`)}>`
        if (ticketlog == null) ticketlog = "Non configuré"

        let raidlog = `<#${lograid.get(`${message.guild.id}.raidlog`)}>`
        if (raidlog == null) raidlog = "Non configuré"

        let embedlog = `<#${logembed.get(`${message.guild.id}.embedlog`)}>`
        if (embedlog == null) embedlog = "Non configuré"

        let messagelog = `<#${msglog.get(`${message.guild.id}.messagelog`)}>`
        if (messagelog == null) messagelog = "Non configuré"

        let modlog = `<#${logmod.get(`${message.guild.id}.modlog`)}>`
        if (modlog == null) modlog = "Non configuré"

        let boostlog = `<#${logboost.get(`${message.guild.id}.boostlog`)}>`
        if (boostlog == null) boostlog = "Non configuré"

        let pf = await p.get(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            const embed = new Discord.MessageEmbed()
                .addField(`Configuration du serveur`, `${emote.administration.alerte} | Salon d'alerte : <#${alerte}> \n${emote.administration.ping} | Role alerte : ${role}\n📧 | Catégorie tickets : \`${ticket}\`\n${emote.administration.rainbowheart} | Thème : ${color}`)
                .addField(`Configuration Logs`, `${e} | Logs Messages : ${messagelog}\n${e} | Logs Mods : ${modlog}\n${e} | Logs Boosts : ${boostlog}\n${e} | Logs Tickets : ${ticketlog} \n${e} | Logs Embeds : ${embedlog}\n${e} | Logs Raid : ${raidlog}`)
                .addField(`Prefix : \`${pf}\``, `\`${pf}help\` pour obtenir la liste des commandes`)
                .addField(`Latence du bot`, `${emote.administration.typing} | Ping : **${client.ws.ping}ms**`)
                .setColor(color)

            message.channel.send({ embeds: [embed] })
        }
    }
}