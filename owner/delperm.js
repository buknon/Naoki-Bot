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
    name: 'del',
    usage: 'del <perm1/2/3/gs/gp/ga> @role',
    category: "owner",
    description: `Permet de gérer les permissions des roles du serveur.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            if (args[0] === "perm1") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le role que vous souhaitez supprimé de la **perm 1**" })

                p1.delete(`perm1_${message.guild.id}`)

                const embed1 = new Discord.MessageEmbed()
                    .setDescription(`Le role ${role} n'as plus accès aux les commandes de la **perm 1**`)
                    .setColor(color)

                return message.channel.send({ embeds: [embed1] })
            }

            if (args[0] === "perm2") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le role que vous souhaitez supprimé de la **perm 2**" })

                p2.delete(`perm2_${message.guild.id}`)

                const embed1 = new Discord.MessageEmbed()
                    .setDescription(`Le role ${role} n'as plus accès aux les commandes de la **perm 2**`)
                    .setColor(color)

                return message.channel.send({ embeds: [embed1] })
            }

            if (args[0] === "perm3") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le role que vous souhaitez supprimé de la **perm 3**" })

                p3.delete(`perm3_${message.guild.id}`)

                const embed1 = new Discord.MessageEmbed()
                    .setDescription(`Le role ${role} n'as plus accès aux les commandes de la **perm 3**`)
                    .setColor(color)

                return message.channel.send({ embeds: [embed1] })
            }

            if (args[0] === "permgs") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le role que vous souhaitez supprimé de la perm **Gestion Staff**" })

                pgs.delete(`permgs_${message.guild.id}`)

                const embed1 = new Discord.MessageEmbed()
                    .setDescription(`Le role ${role} n'as plus accès aux les commandes de la perm **Gestion Staff**`)
                    .setColor(color)

                return message.channel.send({ embeds: [embed1] })
            }

            if (args[0] === "permgp") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le role que vous souhaitez supprimé de la perm **Gestion Permissions**" })

                pgp.delete(`permgp_${message.guild.id}`)

                const embed1 = new Discord.MessageEmbed()
                    .setDescription(`Le role ${role} n'as plus accès aux les commandes de la perm **Gestion Permissions**`)
                    .setColor(color)

                return message.channel.send({ embeds: [embed1] })
            }
            if (args[0] === "permga") {

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: "Veuillez indiquer le role que vous souhaitez supprimé de la perm **Giveaway**" })

                pga.delete(`permga_${message.guild.id}`)

                const embed1 = new Discord.MessageEmbed()
                    .setDescription(`Le role ${role} n'as plus accès aux les commandes de la perm **Giveaway**`)
                    .setColor(color)

                return message.channel.send({ embeds: [embed1] })
            }
        }
    }
}
