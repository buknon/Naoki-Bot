const Discord = require("discord.js")
const { Colors } = require("discord.js/src/util/Constants")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const rlog = db.table("raidlog")
const wl = db.table("Whitelist")
const msglog = db.table("msglog")
const owner = db.table("Owner")
const al = db.table("AntiLink")
const config = require("../config.js")

const color = config.app.color
var getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }) } }
const links = [
    'discord.gg',
    'dsc.bio',
    'www',
    'https',
    'http',
    '.ga',
    '.fr',
    '.com',
    '.tk',
    '.ml',
    '://',
    '.gg'
]


module.exports = {
    name: 'messageUpdate',
    once: false,

    async execute(client, oldMessage, newMessage) {

        let isLink = false
        let antilink = await al.get(`config.${newMessage.guild.id}.antilink`)

        if (!newMessage | !newMessage.content) return

        links.forEach(l => {
            if (newMessage.content.includes(l)) {
                isLink = true
            }
        })
        if (owner.get(`owners.${newMessage.author.id}`) || wl.get(`${newMessage.guild.id}.${newMessage.author.id}.wl`) || config.app.owners === newMessage.author.id === true || client.user.id === newMessage.author.id === true) return

        if (antilink == true) {
            if (isLink == true) {
                newMessage.delete()
                newMessage.member.timeout(15000)
                newMessage.channel.send({ content: `<@${newMessage.author.id}> Tu n'as pas le droit de d'envoyé de lien dans ce serveur.` }).then(msg => {
                    setTimeout(() => msg.delete(), 6000)
                })

                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${newMessage.author.id}> a envoyer un \`lien\` dans \`${newMessage.channel.name}\`, j'ai supprimé son message`)
                    .setTimestamp()
                client.channels.cache.get(await rlog.get(`${newMessage.guild.id}.raidlog`)).send({ embeds: [embed] }).catch(() => false)
            }
        }

        const chan = await msglog.get(`${oldMessage.guild.id}.messagelog`)
        if (chan == null) return

        const channel = oldMessage.guild.channels.cache.get(chan)
        if (channel == null) return

        if (oldMessage.content === newMessage.content) return;

        if (!oldMessage.author | !newMessage.author) return

        const embed = new Discord.MessageEmbed()
            .setTitle(`📝 Message édité`)
            .setDescription(`**${oldMessage.author.username}**#${oldMessage.author.discriminator} (\`${oldMessage.author.id}\`) a édité son message dans [\`${oldMessage.channel.name}\`](https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}) \n  **Avant**: \`\`\`${oldMessage.content}\`\`\` **Après:** \`\`\`${newMessage.content}\`\`\``)
            .setFooter({ text: `🕙 ${getNow().time}` })
            .setColor(color)

        channel.send({ embeds: [embed] })

    }
}