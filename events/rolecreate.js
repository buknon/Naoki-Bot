const Discord = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const rlog = db.table("raidlog")
const punish = db.table("Punition")
const wl = db.table("Whitelist")
const atr = db.table("antirolecreate")
const config = require('../config')

module.exports = {
    name: 'roleCreate',
    once: false,

    async execute(client, role) {

        const audit = await role.guild.fetchAuditLogs({ type: "ROLE_CREATE" }).then((audit) => audit.entries.first())
        if (audit.executor === client.user.id) return

        if (await atr.get(`config.${role.guild.id}.antirolecreate`) == true) {

            if (await owner.get(`owners.${audit.executor.id}`) || wl.get(`${role.guild.id}.${audit.executor.id}.wl`) || config.app.owners === audit.executor.id === true || client.user.id === audit.executor.id === true) return

            if (audit.action == 'ROLE_CREATE') {

                role.delete()

                if (punish.get(`sanction_${role.guild.id}`) === "ban") {
                    role.guild.members.ban(audit.executor.id, { reason: `Antirole Create` })

                } else if (punish.get(`sanction_${role.guild.id}`) === "derank") {

                    role.guild.members.resolve(audit.executor).roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            role.guild.members.resolve(audit.executor).roles.remove(role).catch(() => false)
                        }
                    })

                } else if (punish.get(`sanction_${role.guild.id}`) === "kick") {

                    role.guild.members.kick(audit.executor.id, { reason: `Antirole Create` })
                }
                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${audit.executor.id}> a tenté de \`créer un role\`, il a été sanctionné`)
                    .setTimestamp()
                if (channel) client.channels.cache.get(await rlog.get(`${role.guild.id}.raidlog`))
                if (channel) channel.send({ embeds: [embed] }).catch(() => false)

            }
        }
    }
}