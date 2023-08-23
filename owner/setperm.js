const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const cl = db.table("Color")
const p1 = db.table("Perm1")
const p2 = db.table("Perm2")
const p3 = db.table("Perm3")
const pgs = db.table("PermGs")
const pgp = db.table("PermGp")
const pga = db.table("PermGa")
const config = require("../config.js")
const footer = config.app.footer

module.exports = {
    name: 'set',
    usage: 'set <perm1/2/3/gs/gp/ga> @role',
    category: "owner",
    description: `Permet de gérer les permissions des roles du serveur.`,
    async execute(client, message, args) {

        if (await owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            if (args[0] === "perm1") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le role que vous souhaitez attribué à la **perm 1**" })

                if (await p1.get(`perm1_${message.guild.id}`) === role.id) {
                    return message.channel.send({ content: `Le role ${role} est déjà attribué à la **perm 1**` })
                } else {
                    await p1.set(`perm1_${message.guild.id}`, role.id)

                    const embed1 = new Discord.MessageEmbed()
                        .setDescription(`Le role ${role} à désormais accès à toutes les commandes de la **perm 1**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed1] })
                }
            }

            if (args[0] === "perm2") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le role que vous souhaitez attribué à la **perm 2**" })

                if (await p2.get(`perm2_${message.guild.id}`) === role.id) {
                    return message.channel.send({ content: `Le role ${role} est déjà attribué à la **perm 2** !` })
                } else {
                    await p2.set(`perm2_${message.guild.id}`, role.id)

                    const embed2 = new Discord.MessageEmbed()
                        .setDescription(`Le role ${role} à désormais accès à toutes les commandes de la **perm 2**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed2] })
                }
            }

            if (args[0] === "perm3") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le role que vous souhaitez attribué à la **perm 3**" })

                if (await p3.get(`perm3_${message.guild.id}`) === role.id) {
                    return message.channel.send({ content: `Le role ${role} est déjà attribué à la **perm 3**` })
                } else {
                    await p3.set(`perm3_${message.guild.id}`, role.id)

                    const embed3 = new Discord.MessageEmbed()
                        .setDescription(`Le role ${role} à désormais accès à toutes les commandes de la **perm 3**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embed3] })
                }
            }

            if (args[0] === "permgs") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le role que vous souhaitez attribué à la perm **Gestion Staff**" })

                if (await pgs.get(`permgs_${message.guild.id}`) === role.id) {
                    return message.channel.send({ content: `Le role ${role} est déjà attribué à la perm **Gestion Staff**` })
                } else {
                    await pgs.set(`permgs_${message.guild.id}`, role.id)

                    const embedgs = new Discord.MessageEmbed()
                        .setDescription(`Le role ${role} à désormais accès à toutes les commandes de la perm **Gestion Staff**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embedgs] })
                }
            }

            if (args[0] === "permgp") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le role que vous souhaitez attribué à la perm **Gestion Permissions**" })

                if (await pgp.get(`permgp_${message.guild.id}`) === role.id) {
                    return message.channel.send({ content: `Le role ${role} est déjà attribué à la perm **Gestion Permissions**` })
                } else {
                    await pgp.set(`permgp_${message.guild.id}`, role.id)

                    const embedgp = new Discord.MessageEmbed()
                        .setDescription(`Le role ${role} à désormais accès à toutes les commandes de la perm **Gestion Permissions**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embedgp] })
                }
            }

            if (args[0] === "permga") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le role que vous souhaitez attribué à la perm **Giveaway**" })

                if (await pga.get(`permga_${message.guild.id}`) === role.id) {
                    return message.channel.send({ content: `Le role ${role} est déjà attribué à la perm **Giveaway**` })
                } else {
                    await pga.set(`permga_${message.guild.id}`, role.id)

                    const embedga = new Discord.MessageEmbed()
                        .setDescription(`Le role ${role} à désormais accès à toutes les commandes de la perm **Giveaway**`)
                        .setColor(color)
                    message.channel.send({ embeds: [embedga] })
                }
            }
        }
    }
}