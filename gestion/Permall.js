const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const alerte = db.table("AlertePerm")
const cl = db.table("Color")
const pgp = db.table("PermGp")
const config = require("../config.js")
const emote = require('../emotes.json')


module.exports = {
    name: 'pall',
    usage: 'pall',
    category: "owner",
    description: `Permet de Désactive toutes les permissions du serveur.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(await pgp.get(`permgp_${message.guild.id}`)) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const roles = message.guild.roles.cache.filter(role => role.permissions.any(["ADMINISTRATOR", "MANAGE_ROLES", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_WEBHOOKS", "MUTE_MEMBERS", "MOVE_MEMBERS", "MANAGE_GUILD"]));
            roles.forEach(role => role.setPermissions(role.permissions.remove(["ADMINISTRATOR", "MANAGE_ROLES", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_WEBHOOKS", "MUTE_MEMBERS", "MOVE_MEMBERS", "MANAGE_GUILD"])).catch(() => { }))

            const permEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription('**Je désactive toute les permissions à tous les rôles.**')
                .addField("`Permissions Désactivé`", "Permission: **ADMINISTRATOR**, **MANAGE_ROLES**, **KICK_MEMBERS**, **BAN_MEMBERS**, **MANAGE_WEBHOOKS**, **MUTE_MEMBERS**, **MOVE_MEMBERS**, **MANAGE_GUILD**")

            message.channel.send({ embeds: [permEmbed] })

            const channellogs = alerte.get(`${message.guild.id}.alerteperm`)
            let roleping = db.get(`role_${message.guild.id}`)
            if (roleping === null) roleping = "@everyone"

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(`${message.author.tag} à désactivé toutes les __permissions__ du serveur`)
                .setDescription(`${emote.administration.loading} Merci de patienter avant de réactiver les permissions le temps que le problème soit réglé\n Executeur : <@${message.author.id}>`)
                .setTimestamp()
                .setFooter({ text: `📚` })
            client.channels.cache.get(channellogs).send({ content: `${roleping}`, embeds: [embed] }).catch(() => false)

        }
    }
}