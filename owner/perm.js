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
const wl = db.table("Whitelist")
const footer = config.app.footer

module.exports = {
    name: 'perm',
    usage: 'perm',
    category: "owner",
    description: `Permet de voir la liste des permissions du serveur.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            if (args[0] == 'list') {

                let color = await cl.get(`color_${message.guild.id}`)
                if (color == null) color = config.app.color

                let perm1 = `<@&${await p1.get(`perm1_${message.guild.id}`)}>`
                if (perm1 == `<@&null>`) perm1 = "Non configuré"

                let perm2 = `<@&${await p2.get(`perm2_${message.guild.id}`)}>`
                if (perm2 == `<@&null>`) perm2 = "Non configuré"

                let perm3 = `<@&${await p3.get(`perm3_${message.guild.id}`)}>`
                if (perm3 == `<@&null>`) perm3 = "Non configuré"

                let permgs = `<@&${await pgs.get(`permgs_${message.guild.id}`)}>`
                if (permgs == `<@&null>`) permgs = "Non configuré"

                let permgp = `<@&${await pgp.get(`permgp_${message.guild.id}`)}>`
                if (permgp == `<@&null>`) permgp = "Non configuré"

                let permga = `<@&${await pga.get(`permga_${message.guild.id}`)}>`
                if (permga == `<@&null>`) permga = "Non configuré"


                const embed = new Discord.MessageEmbed()
                    .setTitle('Permission du serveur')
                    .addField(`Permission 1`, `${perm1}`)
                    .addField(`Permission 2`, `${perm2}`)
                    .addField(`Permission 3`, `${perm3}`)
                    .addField(`Gestion Staff`, `${permgs}`)
                    .addField(`Gestion Permissions`, `${permgp}`)
                    .addField(`Permission Giveaway`, `${permga}`)
                    .setFooter({ text: `Voir le +helpall pour voir les commandes auxquelles chaque permission donne accès` })
                    .setColor(color)

                message.channel.send({ embeds: [embed] })
                return

            }
        }

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        const perms1 = {
            KICK_MEMBERS: "Expulser",
            BAN_MEMBERS: "Bannir",
            ADMINISTRATOR: "Administrateur",
            MANAGE_CHANNELS: "Gérer les salons",
            MANAGE_GUILD: "Gérer le serveur",
            ADD_REACTIONS: "Ajouter des réactions",
            VIEW_AUDIT_LOG: "Voir les logs",
            PRIORITY_SPEAKER: "Voix prioritaire",
            STREAM: "Stream",
            VIEW_CHANNEL: "Voir les salons",
            SEND_MESSAGES: "Envoyez des messages",
            SEND_TTS_MESSAGES: "Envoyez des messages TTS",
            MANAGE_MESSAGES: "Gérer les messages",
            EMBED_LINKS: "Envoyez des embeds",
            ATTACH_FILES: "Envoyez des fichiers/images",
            READ_MESSAGE_HISTORY: "Voir les anciens messages",
            MENTION_EVERYONE: "@everyone",
            USE_EXTERNAL_EMOJIS: "Utiliser des emojis externe",
            VIEW_GUILD_INSIGHTS: "Voir les perspectives du serveur",
            CONNECT: "Se connecter",
            SPEAK: "Parler",
            MUTE_MEMBERS: "Mute",
            DEAFEN_MEMBERS: "Déconnecter",
            MOVE_MEMBERS: "Move",
            USE_VAD: "Mute casque",
            CHANGE_NICKNAME: "Changer de pseudonyme",
            MANAGE_NICKNAMES: "Gérer les pseudonymes",
            MANAGE_ROLES: "Gérer les rôles",
            MANAGE_WEBHOOKS: "Gérer les webhooks",
            MANAGE_EMOJIS_AND_STICKERS: "Gérer les emojis/autolocollants",
            USE_APPLICATION_COMMANDS: "Utiliser les slashcommands",
            REQUEST_TO_SPEAK: "Detection de voix",
            MANAGE_EVENTS: "Gérer les évènements",
            MANAGE_THREADS: "Gérer les fils",
            USE_PUBLIC_THREADS: "Utiliser les fils publique",
            CREATE_PUBLIC_THREADS: "Créer des fils publique",
            USE_PRIVATE_THREADS: "Utiliser les fils privé",
            CREATE_PRIVATE_THREADS: "Créer des fils privé",
            USE_EXTERNAL_STICKERS: "Utiliser des autolocollants externe",
            SEND_MESSAGES_IN_THREADS: "Envoyez un message dans un fils",
            START_EMBEDDED_ACTIVITIES: "Utiliser l'activité",
            MODERATE_MEMBERS: "Gérer les utilisateurs",
        };

        const member = message.mentions.members.first() || message.member
        const perms = `\`\`\`${member.permissions.toArray().map(perm => perms1[perm]).join("\n")}\`\`\` `;
        const embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Permissions de ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setColor(color)
            .setDescription(perms)
            .setFooter({ text: `${footer}` })
        message.channel.send({ embeds: [embed] })
    }
}
