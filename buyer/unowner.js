const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const ownercount = db.table("Ownercount")
const cl = db.table("Color")
const config = require("../config.js")
const footer = config.app.footer

module.exports = {
    name: 'unowner',
    usage: 'unowner',
    category: "owner",
    description: `Permet de gérer les owners du bot.`,
    async execute(client, message, args) {

        if (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.app.color


            if (args[0]) {
                let member = client.users.cache.get(message.author.id);
                if (args[0]) {
                    member = client.users.cache.get(args[0]);
                } else {
                    return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)

                }
                if (message.mentions.members.first()) {
                    member = client.users.cache.get(message.mentions.members.first().id);
                }
                if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)
                if (!owner.get(`owners.${member.id}`) === member.id) {
                    return message.channel.send({ content: `__${member.username}__ n'est pas owner` })
                } else {
                    owner.set(`owners.${member.id}`, false)
                    message.channel.send({ content: `**__${member.username}__** n'est plus owner` })
                }
            }
        }
    }
}
