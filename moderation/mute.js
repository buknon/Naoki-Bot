const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const p = db.table("Prefix")
const config = require("../config.js")
const p1 = db.table("Perm1")
const p2 = db.table("Perm2")
const p3 = db.table("Perm3")
const footer = config.app.footer

module.exports = {
    name: 'mute',
    usage: 'mute',
    description: `Permet de mute un utilisateur sur le serveur`,
    async execute(client, message, args) {

        let pf = await p.get(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        const perm1 = await p1.get(`perm1_${message.guild.id}`)
        const perm2 = await p2.get(`perm2_${message.guild.id}`)
        const perm3 = await p3.get(`perm3_${message.guild.id}`)

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm1) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let muted = await db.get(`muterole_${message.guild.id}`)
            let muterole = await message.guild.roles.cache.get(muted) || message.guild.roles.cache.find(role => role.name === `muet`) || message.guild.roles.cache.find(role => role.name === `Muted`) || message.guild.roles.cache.find(role => role.name === `Mute`)
            const target = message.mentions.members.first()

            var reason = args.slice(1).join(" ");

            if (!muterole) return message.channel.send(`**Ce serveur ne possède pas de role muet** \`${pf}muterole\``)

            if (!args[0]) return message.channel.send(`**Veuillez mentionner un utilisateur !**`)
            if (!target) return message.channel.send(`**Veuillez mentionner un utilisateur !**`)

            if (!reason) {
                reason = '`Aucune raison fournie`';
            }

            if (target.id === message.author.id) return message.channel.send(`**Vous ne pouvez pas vous mute !**`)

            if (owner.get(`owners.${target.id}`) || config.app.owners.includes(target.id) || config.app.funny.includes(target.id) === true)
                return;

            try {
                await target.roles.add(muterole);

                message.channel.send({ content: `${target} a été mute` })
            } catch (err) {
                return
            }

        }
    }
}
