const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { 
  PREFIX, 
} = require(`../config.json`);

  


module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: 8,
  description: "**Aeon Bot**",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
    .setThumbnail(`https://media.discordapp.net/attachments/797588358590365713/900623771336081418/image0.jpg`)
    .setAuthor(`Aeon-Music`, `https://media.discordapp.net/attachments/797588358590365713/900624067651051520/image0.png`)
    .setDescription(`

**User Commands**
\`${PREFIX}invite\` - \`${PREFIX}support\` - \`${PREFIX}about\`
\`${PREFIX}ping\` - \`${PREFIX}prefix\` - \`${PREFIX}uptime\`
\`${PREFIX}avatar\` - \`${PREFIX}se\` - \`${PREFIX}invites\`

**Music Commands**
\`${PREFIX}play\` - \`${PREFIX}skip\` - \`${PREFIX}skipto\`
\`${PREFIX}stop\` - \`${PREFIX}volume\` - \`${PREFIX}nowplaying\`
\`${PREFIX}shuffle\` - \`${PREFIX}search\` - \`${PREFIX}resume\`
\`${PREFIX}remove\` - \`${PREFIX}queue\` - \`${PREFIX}filter\`
\`${PREFIX}loop\` - \`${PREFIX}lyrics\` - \`${PREFIX}radio\`

**Fun Commands**
\`${PREFIX}lock\` - \`${PREFIX}unlock\` - \`${PREFIX}ban\`
\`${PREFIX}unban\` - \`${PREFIX}slowmode\` - \`${PREFIX}giveaway=!start\`

**Links**
[support](https://discord.gg/SwUTJd7ZYB)    -    [invite](https://discord.com/api/oauth2/authorize?client_id=794288634659995659&permissions=3439696&scope=bot)
`)

   .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
   .setColor("RANDOM");
   message.react("✅")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
