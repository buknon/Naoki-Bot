const config = require("../config.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
    name: 'stream',
    usage: 'stream <status>',
    description: `Permet de changer le nom du bot.`,
    async execute(client, message, args) {

        if (config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let status = args.join(" ")
            if (args.join(" ").length > 20) return message.reply("le status ne peux pas faire plus de 20 caracteres")

            client.user.setActivity(status, { type: "STREAMING", url: "https://twitch.tv/karma" })
            await db.set('stream', status)
            await db.set('type', "STREAMING")
            message.reply(`Le bot stream dès à présent : **${status}**`)


        }
    }
}
