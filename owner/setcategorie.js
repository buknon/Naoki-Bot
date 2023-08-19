const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config.js")
const owner = db.table("Owner")
const cl = db.table("Color")
const ct = db.table("CategorieTicket")
const footer = config.app.footer


module.exports = {
    name: 'setcategorie',
    usage: 'setcategorie <id>',
    description: `Permet de changer la catégorie des tickets.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const funny = message.guild.channels.cache.filter(x => x.type === "GUILD_CATEGORY")

            const newCategorie = message.guild.channels.cache.get(args[0] || funny.id);
            if (!newCategorie) return message.channel.send({ content: "Aucun catégorie trouvé !" })
            if (ct.get(`${message.guild.id}.categorie`) === newCategorie) return message.channel.send(`📧 | __Nouvelle catégorie :__ \`${ct.get(`${message.guild.id}.categorie`)}\``)
            else {
                ct.set(`${message.guild.id}.categorie`, args[0])
                message.channel.send(`📧 | __Nouvelle catégorie :__ ${newCategorie.name}`)
            }

        }
    }
}