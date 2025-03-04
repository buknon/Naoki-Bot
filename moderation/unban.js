const Discord = require("discord.js")
const config = require('../config')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const p3 = db.table("Perm3")

module.exports = {
    name: 'unban',
    usage: 'unban',
    description: `Permet de unban`,
    async execute(client, message, args) {

        const perm3 = await p3.get(`perm3_${message.guild.id}`)

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            const user = args[0]

            const bans = await message.guild.bans.fetch()

            const isBanned = bans.has(user)
            if (!isBanned)
                return message.reply(`ID invalide.`)

            message.guild.bans.remove(user)
            message.reply(`<@${user}> a été unban`)

        }
    }

}