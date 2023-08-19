const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const config = require("../config.js")
const footer = config.app.footer
const { QuickClick } = require("weky");

module.exports = {
    name: 'click',
    usage: 'click',
    description: `jeux`,
    async execute(client, message, args) {

        let pf = await p.get(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        await QuickClick({
            message: message,
            embed: {
                title: 'Clique | Soit rapide',
                color: `${color}`,
                footer: footer,
                timestamp: true
            },
            time: 60000,
            waitMessage: 'Les boutons peuvent apparaître à tout moment',
            startMessage:
                'La première personne à appuyer sur le bon bouton gagnera. Tu as **{{time}}**!',
            winMessage: 'GG, <@{{winner}}> a appuyé sur le bouton dans **{{time}} secondes**.',
            loseMessage: 'Personne n\'a appuyé sur le bouton à temps. Alors',
            emoji: '🎁',
            ongoingMessage:
                "Un jeu est déjà en cours dans <#{{channel}}>"
        });
    }
}