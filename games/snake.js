const { Snake } = require("discord-gamecord")
const Discord = require("discord.js")
const config = require("../config.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const footer = config.app.footer

module.exports = {
    name: 'snake',
    usage: 'snake',
    async execute(client, message, args) {

        let color = await db.get(`color_${message.guild.id}`)
        if (color == null) color = config.app.color


        new Snake({
            message: message,
            embed: {
                title: 'Snake',
                color: color,
                OverTitle: "Fin",
            },
            snake: { head: '🟢', body: '🟩', tail: '🟢' },
            emojis: {
                board: '⬛',
                food: '🍎',
                up: '⬆️',
                right: '➡️',
                down: '⬇️',
                left: '⬅️',
            },
            othersMessage: 'Vous ne pouvez pas appuyer sur ces boutons',
        }).startGame()
    }
}