const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { 
  PREFIX, 
} = require(`../config.json`);

  


module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: 8,
  description: "**meow Bot**",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
    .setThumbnail(``)
    .setAuthor(``, ``)
    .setDescription(`

❄️ **Music Commands**
__play  - skip- skipto - stop - voloume - nowplaying - shuffle - search - resume - remove - queue - filter - loop - lyrics - radio__

❄️ **Public Commands**
__invite - support - about - ping - prefix - uptime - avatar - se <emoji>__

❄️ **Giveaway Command**
__start <time> <prize> <#channel>__
`)

   .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
   .setColor("#F3692F");
   message.react("❄️")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
