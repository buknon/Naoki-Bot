const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const cl = db.table("Color")
const config = require("../config.js")

module.exports = {
    name: 'annonce',
    usage: 'annonce',
    description: `Permet de faire une annonce de l'administration.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            message.delete()

            if (!args.join(" ")) return message.lineReply("Rentrez votre message !");


            let embed = new Discord.MessageEmbed()

                .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024, }))
                .setImage(message.guild.bannerURL({ dynamic: true, size: 512 }))
                .setColor(color)
                .setDescription(`**Message de l'administration :** \n \`\`\`\n${args.join(" ")}\n\`\`\``)
            message.channel.send({ content: '@everyone', embeds: [embed] })
        }
    }
}