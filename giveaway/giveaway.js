const Discord = require('discord.js');
let started_time_duration = ""
let time_duration = ""
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config.js")
const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const ml = db.table("giveawaylog")
const pga = db.table("PermGa")

module.exports = {
    name: 'giveaway',
    usage: 'giveaway',
    description: `Permet de lancer un Giveaway sur le serveur.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(pga.fetch(`permga_${message.guild.id}`)) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let pf = await p.get(`prefix_${message.guild.id}`)
            if (pf == null) pf = config.app.px

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            let giveawayChannel = message.mentions.channels.first();

            if (!giveawayChannel) {
                return message.reply(":x: Vous devez spécifié un salon valide !");
            }


            let giveawayDuration = args[1];

            if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
                return message.reply(":x: Vous devez spécifier un durée valide!");
            }


            let giveawayNumberWinners = parseInt(args[2]);

            if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
                return message.reply(
                    ":x: Vous devez spécifier le nombre de gagnants !"
                );
            }

            let giveawayPrize = args.slice(3).join(" ");

            if (!giveawayPrize) {
                return message.reply(":x: Vous devez spécifier un gain valide !");
            }

            await client.giveawaysManager.start(giveawayChannel, {

                duration: ms(giveawayDuration),

                prize: giveawayPrize,

                winMessage: 'Félicitation, {winners}! Tu as gagné **{this.prize}**!',

                noWinner: 'Giveaway annulé, aucun membre n\'a participé.',

                winnerCount: parseInt(giveawayNumberWinners),

                hostedBy: config.app.hostedBy ? message.author : null,

                message
            });
            message.reply(`Giveaway lancé ${giveawayChannel}!`);


            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`<@${message.author.id}> a \`lancé un giveaway\` dans <#${giveawayChannel.id}>`)
                .setTimestamp()
                .setFooter({ text: `📚` })
            const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.giveawaylog`))
            if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

        }
    }
}