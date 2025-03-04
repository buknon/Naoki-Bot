const Discord = require("discord.js")
const config = require("../config.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const cl = db.table("Color")
const ml = db.table("modlog")
const p3 = db.table("Perm3")

module.exports = {
    name: 'renew',
    usage: 'renew',
    description: `Permet de renew un salon.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(await p3.get(`perm3_${message.guild.id}`)) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (!message.channel.deletable) return message.reply("*Impossible de renew ce channel !*")
            message.channel.clone().then((ch) => {
                ch.setParent(message.channel.parent);
                ch.setPosition(message.channel.position);
                message.channel.delete();
                ch.send("<@" + message.author.id + "> Salon recrée !").then(msg => {
                })
            })

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`<@${message.author.id}> a \`renew\` le salon ${message.channel.name}`)
                .setTimestamp()
                .setFooter({ text: `📚` })
            const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)
        }

    }
}