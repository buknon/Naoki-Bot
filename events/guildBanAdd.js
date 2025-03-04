const Discord = require('discord.js')
const config = require('../config')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const cl = db.table("Color")
const owner = db.table("Owner")
const rlog = db.table("raidlog")
const punish = db.table("Punition")
const ab = db.table("Antiban")

module.exports = {
    name: 'guildBanAdd',
    once: false,

    async execute(client, guild, user) {

        if (!user) return
        if (ab.get(`config.${user.guild.id}.antiban`) === true) {

            const action = await user.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" }).then(async (audit) => audit.entries.first());

            let perm = config.app.owners == action.executor.id || config.app.funny == action.executor.id || owner.get(`owners.${action.executor.id}`) || client.user.id == action.executor.id
            if (!perm) {

                if (punish.get(`sanction_${user.guild.id}`) === "ban") {
                    guild.members.ban(action.executor.id, { reason: `Antiban` })

                } else if (punish.get(`sanction_${user.guild.id}`) === "derank") {

                    user.guild.members.resolve(action.executor.id).roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            user.guild.members.resolve(action.executor.id).roles.remove(role).catch(() => false)
                        }
                    })

                } else if (punish.get(`sanction_${user.guild.id}`) === "kick") {

                    user.guild.members.kick(action.executor.id, { reason: `Antiban` })
                }

                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${action.executor.id}> a \`banni\` un membre, il a été sanctionné`)
                    .setTimestamp()
                client.channels.cache.get(await rlog.get(`${user.guild.id}.raidlog`)).send({ embeds: [embed] }).catch(() => false)

            }
        }
    }
}