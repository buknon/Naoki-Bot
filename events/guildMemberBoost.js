const { QuickDB } = require("quick.db");
const db = new QuickDB();
const boostlog = db.table("boostlog")

module.exports = {
    name: 'guildMemberUpdate',
    once: false,

    async execute(client, oldMember, newMember) {

        if (oldMember.premiumSince === newMember.premiumSince) return

        const chan = `${boostlog.fetch(`${member.guild.id}.boostlog`)}`
        if (!chan) return

        const channel = oldMember.guild.channels.cache.get(chan)
        if (channel) channel.send({ content: `${oldMember.user.tag} vient de boost le serveur !` }).catch(() => false)

    }
}