const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const owner = db.table("Owner")
const p = db.table("Prefix")
const cl = db.table("Color")
const config = require("../config.js")
const footer = config.app.footer
const giphy = require("giphy-api")("W8g6R14C0hpH6ZMon9HV9FTqKs4o4rCk");

module.exports = {
  name: 'gif',
  usage: 'gif',
  description: `jeux`,
  async execute(client, message, args) {

    let pf = await p.get(`prefix_${message.guild.id}`)
    if (pf == null) pf = config.app.px

    let color = await cl.get(`color_${message.guild.id}`)
    if (color == null) color = config.app.color

    if (args.length === 0) {
      message.channel.send("Indiquez une recherche");
      return;
    }
    if (args.length === 1) {
      term = args.toString();
    } else {
      term = args.join(" ");
    }
    giphy.search(term).then(function (res) {

      let id = res.data[0].id;
      let msgurl = `https://media.giphy.com/media/${id}/giphy.gif`;

      const embed = new Discord.MessageEmbed()
        .setTitle(`Résultat pour \`${term}\``)
        .setImage(msgurl)
        .setFooter({ text: `${footer}` })
        .setColor(color);
      message.channel.send({ embeds: [embed] });
    });

    message.delete();
  },
};