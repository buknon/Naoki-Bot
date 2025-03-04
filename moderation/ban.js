const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

const owner = db.table("Owner")
const cl = db.table("Color")
const config = require("../config.js")
const fs = require('fs')
const moment = require('moment')
const ml = db.table("modlog")
const p3 = db.table("Perm3")

module.exports = {
    name: 'ban',
    usage: 'ban <membre>',
    description: `Permet de bannir un membre.`,
    async execute(client, message, args) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if (!member) try {
                member = await client.users.fetch(args[0])
            }
                catch (e) {
                    member = null
                }

            if (!member) {
                return message.reply("Merci de mentionner l'utilisateur que vous souhaitez bannir du serveur !")
            }

            if (member.id === message.author.id) {
                return message.reply("Tu ne peux pas te bannir !")
            }

            if (await owner.get(`owners.${member.id}`) || config.app.owners.includes(member.id) || config.app.funny.includes(member.id) === true) return;


            let reason = args.slice(1).join(" ") || `Aucune raison`

            message.reply({ content: `${member} à été banni du serveur` }).catch(err => err)
            member.send({ content: `Tu as été banni par ${message.author} pour la raison suivante: \n\n ${reason}` })
            member.ban({ reason: `${reason}` })

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`<@${message.author.id}> a \`banni\` ${member} du serveur\nRaison : ${reason}`)
                .setTimestamp()
                .setFooter({ text: `📚` })
            const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)
        }



    }
}

