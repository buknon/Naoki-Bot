const Discord = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const rlog = db.table("raidlog")
const punish = db.table("Punition")
const wl = db.table("Whitelist")
const atd = db.table("antichanneldelete")
const config = require('../config')

module.exports = {
    name: 'channelDelete',
    once: false,

    async execute(client, channel) {

        const audit = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE" }).then((audit) => audit.entries.first())
        if (audit.executor === client.user.id) return

        if (await atd.get(`config.${channel.guild.id}.antichanneldelete`) == true) {

            if (owner.get(`owners.${audit.executor.id}`) || wl.get(`${channel.guild.id}.${audit.executor.id}.wl`) || config.app.owners === audit.executor.id === true || client.user.id === audit.executor.id === true) return

            if ((audit.action == "CHANNEL_DELETE" || audit.action == "CHANNEL_OVERWRITE_DELETE")) {

                channel.clone({ position: channel.rawPosition })

                if (punish.get(`sanction_${channel.guild.id}`) === "ban") {
                    channel.guild.members.ban(audit.executor.id, { reason: `AntiChannel Delete` })

                } else if (punish.get(`sanction_${channel.guild.id}`) === "derank") {

                    channel.guild.members.resolve(audit.executor).roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            channel.guild.members.resolve(audit.executor).roles.remove(role).catch(() => false)
                        }
                    })

                } else if (punish.get(`sanction_${channel.guild.id}`) === "kick") {

                    channel.guild.members.kick(audit.executor.id, { reason: `AntiChannel Delete` })
                }
                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${audit.executor.id}> a tenté de \`supprimé\` un salon, il a été sanctionné`)
                    .setTimestamp()
                const logchannel = client.channels.cache.get(await rlog.get(`${channel.guild.id}.raidlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)
            }
        }
    }
}