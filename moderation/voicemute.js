const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config.js")
const owner = db.table("Owner")
const cl = db.table("Color")
const ml = db.table("modlog")
const p1 = db.table("Perm1")
const p2 = db.table("Perm2")
const p3 = db.table("Perm3")
const footer = config.app.footer


module.exports = {
    name: 'voicemute',
    usage: 'voicemute <@>',
    description: `Permet de mute vocal un membre sur le serveur.`,
    async execute(client, message, args, member) {

        const perm1 = p1.fetch(`perm1_${message.guild.id}`)
        const perm2 = p2.fetch(`perm2_${message.guild.id}`)
        const perm3 = p3.fetch(`perm3_${message.guild.id}`)

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm1) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            await message.guild.members.fetch();
            await message.client.guilds.fetch(message.guild.id);

            const muteUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])


            if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true)
                return message.reply("Tu ne peux pas le voicemute !")

            const muteReason = args.join(" ").slice(23);

            if (muteUser.voice.serverMute) {
                return message.channel
                    .send("Le membre n'est pas dans un salon vocal ou est déjà mute vocal.")
            }

            try {
                muteUser.voice.setMute(true, "muteReason");
            } catch (err) {
                console.error(err);
                message
                    .reply("Je n'ai pas pu désactiver le son de cet utilisateur, veuillez vérifier mes permissions et réessayer.\n" + err)
            }

            try {
                muteUser.user.send(
                    `Vous avez été **Mute** sur **${message.guild.name}**, Raison: **${muteReason || "Aucune"}**.`
                );
            } catch (err) {
                console.err(err);
                message.reply("Impossible d'envoyer un message privé à ce membre...").then((m) => setTimeout(() => m.delete(), 10000));
            }

            message.channel.send(
                `**${muteUser.user.tag}** a été mute avec succès sur le serveur. Raison: **${muteReason || "Aucune"
                }**. `
            )

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`<@${message.author.id}> a \`voicemute\` ${muteUser}\nRaison: ${muteReason}`)
                .setTimestamp()
                .setFooter({ text: `📚` })
            const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

        }
    }
}