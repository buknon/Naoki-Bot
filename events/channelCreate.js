const Discord = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const rlog = db.table("raidlog")
const punish = db.table("Punition")
const wl = db.table("Whitelist")
const atc = db.table("antichannelcreate")
const config = require('../config')

module.exports = {
    name: 'channelCreate',
    once: false,

    async execute(client, channel) {
        let muterole = await channel.guild.roles.cache.get(db.get(`muterole_${channel.guild.id}`)) || channel.guild.roles.cache.find(role => role.name === `muet`) || channel.guild.roles.cache.find(role => role.name === `Muted`) || channel.guild.roles.cache.find(role => role.name === `Mute`)
        if (muterole) {

            channel.permissionOverwrites.edit(muterole, {
                SEND_MESSAGES: false,
                SPEAK: false,
            })
        }

        if (atc.get(`config.${channel.guild.id}.antichannelcreate`) == true) {
            const audit = await channel.guild.fetchAuditLogs({ type: "CHANNEL_CREATE" }).then((audit) => audit.entries.first())
            if (audit.executor === client.user.id) return
            if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${channel.guild.id}.${audit.executor.id}.wl`) || config.app.owners === audit.executor.id === true || client.user.id === audit.executor.id === true) return
            channel.delete()

            if (punish.get(`sanction_${channel.guild.id}`) === "ban") {
                channel.guild.members.ban(audit.executor.id, { reason: `AntiChannel Create` })

            } else if (punish.get(`sanction_${channel.guild.id}`) === "derank") {

                channel.guild.members.resolve(audit.executor).roles.cache.forEach(role => {
                    if (role.name !== '@everyone') {
                        channel.guild.members.resolve(audit.executor).roles.remove(role).catch(() => false)
                    }
                })

            } else if (punish.get(`sanction_${channel.guild.id}`) === "kick") {

                channel.guild.members.kick(audit.executor.id, { reason: `AntiChannel Create` })
            }
            else if (punish.get(`sanction_${channel.guild.id}`) === "derank") {

                const member = await channel.guild.members.fetch(audit.executor.id)
                member.roles.set([], "AntiChannel Create").catch(() => false)
            }

            const embed = new Discord.MessageEmbed()
                .setDescription(`<@${audit.executor.id}> a tenté de \`créer un salon\`, il a été sanctionné`)
                .setTimestamp()
            const logchannel = client.channels.cache.get(await rlog.get(`${channel.guild.id}.raidlog`))
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

        }
    }
}