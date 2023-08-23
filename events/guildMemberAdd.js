const Discord = require('discord.js')
const moment = require('moment');
const config = require('../config')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const cl = db.table("Color")
const owner = db.table("Owner")
const rlog = db.table("raidlog")
const punish = db.table("Punition")
const lock = db.table("Serverlock")
const atb = db.table("Antibot")

module.exports = {
    name: 'guildMemberAdd',
    once: false,

    async execute(client, member) {

        let color = await cl.get(`color_${member.guild.id}`)
        if (color == null) color = config.app.color


        let rr = member.guild.roles.cache.get(db.get(`joinrole_${member.guild.id}`))
        if (rr) member.roles.add(rr.id)


        if (lock.get(`serverlock_${member.guild.id}`) === "lock") {
            member.kick("Serveur Vérouillé")
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`${member} à été **kick** pour avoir \`rejoint pendant que le serveur était verrouillé\``)
            const channel = client.channels.cache.get(await rlog.get(`${member.guild.id}.raidlog`))
            if (channel) channel.send({ embeds: [embed] }).catch(() => false)
        }

        if (await db.get(`blacklist.${member.id}`)) {

            member.send({ content: `Vous etes blacklist de **${member.guild.name}** vous ne pouvez pas rejoindre le serveur` })
            member.guild.members.ban(member.id, { reason: `Blacklist` })
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`${member} a rejoit en étant __blacklist__, il à été **ban**`)
            const channel = client.channels.cache.get(await rlog.get(`${member.guild.id}.raidlog`))
            if (channel) channel.send({ embeds: [embed] }).catch(() => false)
        }


        if (member.user.bot) {

            if (await atb.get(`config.${member.guild.id}.antibot`) === true) {

                const action = await member.guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" }).then(async (audit) => audit.entries.first());
                if (action.executor.id === client.user.id) return;

                let perm = config.app.owners == action.executor.id || config.app.funny == action.executor.id || owner.get(`owners.${action.executor.id}`)

                if (!perm) {

                    member.kick('Antibot')

                    if (punish.get(`sanction_${member.guild.id}`) === "ban") {
                        member.guild.members.ban(action.executor.id, { reason: `Anti Bot` })

                    } else if (punish.get(`sanction_${member.guild.id}`) === "derank") {

                        member.guild.members.resolve(action.executor).roles.cache.forEach(role => {
                            if (role.name !== '@everyone') {
                                member.guild.members.resolve(action.executor).roles.remove(role).catch(() => false)
                            }
                        })

                    } else if (punish.get(`sanction_${member.guild.id}`) === "kick") {

                        member.guild.members.kick(action.executor.id, { reason: `Anti bot` })
                    }

                    const embed = new Discord.MessageEmbed()
                        .setDescription(`<@${action.executor.id}> a ajouté un \`bot\` au serveur\nBot ajouté: <@${member.id}>`)
                        .setTimestamp()
                    const channel = client.channels.cache.get(await db.get(`${member.guild.id}.raidlog`))
                    if (channel) channel.send({ embeds: [embed] }).catch(() => false)

                }
            }
        }

        if (member.user) {

            let joinsettings = await db.get(`joinsettings_${member.guild.id}`)
            if (joinsettings == null) joinsettings == true

            if (joinsettings === true) {

                const messagejoin = await db.get(`messagebvn_${member.guild.id}`)

                const salonbvn = await db.get(`salonbvn_${member.guild.id}`)

                const premiumTier = {
                    NONE: 0,
                    TIER_1: 1,
                    TIER_2: 2,
                    TIER_3: 3,
                };

                const content = messagejoin
                    .replaceAll('{MemberName}', member)
                    .replaceAll('{MemberMention}', `<@${member.id}>`)
                    .replaceAll('{MemberTag}', member.user.tag)
                    .replaceAll('{MemberID}', member.id)
                    .replaceAll('{Server}', member.guild)
                    .replaceAll('{MemberCount}', member.guild.memberCount)
                    .replaceAll('{ServerBoostsCount}', `${member.guild.premiumSubscriptionCount || '0'}`)
                    .replaceAll('{ServerLevel}', `${premiumTier[member.guild.premiumTier]}`)
                    .replaceAll('{VocalMembersCount}', member.guild.members.cache.filter(m => m.voice.channel).size)
                    .replaceAll('{OnlineMembersCount}', member.guild.presences.cache.filter((presence) => presence.status !== "offline").size)

                const logchannel = client.channels.cache.get(salonbvn)
                if (logchannel) logchannel.send({ content: content }).catch(() => false)

                let joinsettingsmp = db.get(`joinsettingsmp_${member.guild.id}`)
                if (joinsettingsmp == null) joinsettingsmp == true

                if (joinsettingsmp === true) {

                    const messagejoin = await db.get(`messagebvnmp_${member.guild.id}`)

                    const contentt = messagejoin
                        .replaceAll('{MemberName}', member)
                        .replaceAll('{MemberMention}', `<@${member.id}>`)
                        .replaceAll('{MemberTag}', member.user.tag)
                        .replaceAll('{MemberID}', member.id)
                        .replaceAll('{Server}', member.guild)
                        .replaceAll('{MemberCount}', member.guild.memberCount)
                        .replaceAll('{ServerBoostsCount}', `${member.guild.premiumSubscriptionCount || '0'}`)
                        .replaceAll('{ServerLevel}', `${premiumTier[member.guild.premiumTier]}`)
                        .replaceAll('{VocalMembersCount}', member.guild.members.cache.filter(m => m.voice.channel).size)
                        .replaceAll('{OnlineMembersCount}', member.guild.presences.cache.filter((presence) => presence.status !== "offline").size)

                    member.send({ content: contentt }).catch(() => false)

                }



            }
        }
    }
}
