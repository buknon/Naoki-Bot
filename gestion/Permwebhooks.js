const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const alerte = db.table("AlertePerm")
const pgp = db.table("PermGp")
const cl = db.table("Color")
const config = require("../config.js")
const emote = require('../emotes.json')

module.exports = {
    name: 'pwebhooks',
    usage: 'pwebhooks',
    description: `Permet de Désactive toutes les permissions webhooks du serveur.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(await pgp.get(`permgp_${message.guild.id}`)) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const roles = message.guild.roles.cache.filter(role => role.permissions.any(["MANAGE_WEBHOOKS"]));
            roles.forEach(role => role.setPermissions(role.permissions.remove(["MANAGE_WEBHOOKS"])).catch(() => { }))

            const permEmbed = new Discord.MessageEmbed()
                .setDescription('**Je désactive les permissions WEBHOOKS à tous les rôles.**')
                .setColor(color)

            message.channel.send({ embeds: [permEmbed] })

            const channellogs = alerte.get(`${message.guild.id}.alerteperm`)
            let roleping = db.get(`role_${message.guild.id}`)
            if (roleping === null) roleping = "@everyone"

            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag} à désactivé toutes les __permissions webhooks__ du serveur`)
                .setDescription(`${emote.administration.loading} Merci de patienter avant de réactiver les permissions le temps que le problème soit réglé\n Executeur : <@${message.author.id}>`)
                .setTimestamp()
                .setColor(color)
                .setFooter({ text: `📚` })
            client.channels.cache.get(channellogs).send({ content: `${roleping}`, embeds: [embed] }).catch(() => false)

        }
    }
}