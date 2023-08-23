const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const cl = db.table("Color")
const config = require("../config.js")
const footer = config.app.footer

module.exports = {
    name: 'unbl',
    usage: 'unbl',
    description: `Permet d'unblacklist un membre`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            if (args[0]) {
                let member = message.mentions.users.first() || client.users.cache.get(args[0]);
                if (!member) try {
                    member = await client.users.fetch(args[0])
                }
                    catch (e) {
                        return message.channel.send(`Aucun utilisateur de trouvÃ© pour \`${args[0] || "rien"}\``)
                    }
                if (await db.get(`blacklist.${member.id}`) === null) { return message.channel.send(`${member.username} n'est pas blacklist`) }
                await db.set(`${config.app.blacklist}.blacklist`, db.get(`${config.app.blacklist}.blacklist`).filter(s => s !== member.id))
                await db.delete(`blacklist.${member.id}`, member.id)

                message.channel.send(`**__${member.username}__** est maintenant unblacklist`)

            } else if (!args[0]) {
                return
            }
        } else { }
    }
}