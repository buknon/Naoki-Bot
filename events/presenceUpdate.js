const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'presenceUpdate',
    once: false,

    async execute(client, oldPresence, newPresence) {

        const member = newPresence.member
        if (!member) return
        const link = await db.get("support" + member.guild.id)
        if (link === null) return;
        if (link === true) {
            const roleID = await db.get("role" + member.guild.id)
            const inviteLink = await db.get("status" + member.guild.id)
            if (member.roles.cache.find(role => role.id === roleID)) {
                if (member.presence.activities.some(activity => activity.type === "CUSTOM" && activity.state && activity.state.includes(inviteLink))) return;
                if (!member.presence.activities.some(activity => activity.type === "CUSTOM" && activity.state && activity.state.includes(inviteLink))) {
                    await member.roles.remove(roleID, "Soutien");
                }
            } if (!member.roles.cache.find(role => role.id === roleID) && member.presence.activities.some(activity => activity.type === "CUSTOM" && activity.state && activity.state.includes(inviteLink))) {
                await member.roles.add(roleID, "Soutien");
            }
        }
    }
}
