const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const cl = db.table("Color")
const alerte = db.table("AlertePerm")
const config = require("../config.js")
const footer = config.app.footer
const emote = require('../emotes.json')

module.exports = {
    name: 'derankall',
    usage: 'derankall',
    description: `Permet de derank toutes les personnes ayant des permissions dangereuses sur le serveur`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const embedarray = []
            const perms = [
                "ADMINISTRATOR",
                "MANAGE_GUILD",
                "MANAGE_ROLES",
                "MANAGE_CHANNELS",
                "BAN_MEMBERS",
                "KICK_MEMBERS",
                "MANAGE_WEBHOOKS",
            ];
            let value = false
            try {
                message.guild.members.cache.map((m) => {

                    m.roles.cache.map((r) => {
                        if (r.managed) return;
                        if (r.id === r.guild.id) return;
                        if (m.id === client.user.id) return;
                        embedarray.push({
                            mid: `<@` + m.id + `>`,
                            rid: ` -> ` + `<@&` + r.id + `>`
                        })
                        perms.forEach((p) => {
                            if (r.permissions.has(p)) {
                                m.roles.remove(r.id);
                            } else {
                            }
                        });
                    });
                });
                value = true
            } catch {
                value = false
            }
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("Voici les personnes qui ont été derank")
                .setDescription(`**${embedarray.map(e => e.mid + e.rid).join("\n")}**`)
            if (value = true) message.channel.send({ embeds: [embed] }).catch(() => false)

            const channellogs = alerte.get(`${message.guild.id}.alerteperm`)
            let roleping = db.get(`role_${message.guild.id}`)
            if (roleping === null) roleping = "@everyone"

            const alert = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(`${message.author.tag} à effectué un derank all`)
                .setDescription(`${emote.owner.abus} Toutes les personnes possédant des permissions **Dangereuses** ont étaient derank\n Executeur : <@${message.author.id}>`)
                .setTimestamp()
                .setFooter({ text: `⚠️ ${footer}` })
            const logchannel = client.channels.cache.get(channellogs)
            if (logchannel) logchannel.send({ content: `${roleping}`, embeds: [alert] }).catch(() => false)
        }
    }
}