const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const config = require("../config.js")
const cl = db.table("Color")
const p2 = db.table("Perm2")
const p3 = db.table("Perm3")

module.exports = {
    name: 'rlist',
    usage: 'rlist',
    description: `Permet d'afficher la liste des perm roles présent sur le serveur.`,
    async execute(client, message, args) {

        const perm2 = await p2.get(`perm2_${message.guild.id}`)
        const perm3 = await p3.get(`perm3_${message.guild.id}`)

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            var str_filtrer = message.guild.members.cache.filter(member => member.permissions.has("MANAGE_ROLES") && !member.user.bot && !member.permissions.has("ADMINISTRATOR"))
            var str_map = str_filtrer.map(m => `${m.user.tag}: \`(${m.user.id})\``).join("\n")
            for (let i = 0; i < str_map.length; i += 1995) {
                const str_content = str_map.substring(i, Math.min(str_map.length, i + 1995));

                const embed = new Discord.MessageEmbed()
                    .setTitle(`Liste des perm Roles`)
                    .setDescription(`\n ${str_content}`)
                    .setFooter({ text: `Total: ${str_filtrer.size}` })
                    .setColor(color)
                return message.channel.send({ embeds: [embed] })
            }

            const embed = new Discord.MessageEmbed()
                .setTitle(`Liste des perm Roles`)
                .setDescription(` `)
                .setFooter({ text: `Total: 0` })
                .setColor(color)
            message.channel.send({ embeds: [embed] })
        }
    }
}