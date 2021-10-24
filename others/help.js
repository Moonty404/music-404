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
    .setThumbnail(`https://media.discordapp.net/attachments/797588358590365713/900623771336081418/image0.jpg`)
    .setAuthor(`Meow-Music`, `https://media.discordapp.net/attachments/797588358590365713/900624067651051520/image0.png`)
    .setDescription(`

🎶 **Music Commands**
__play  - skip- skipto - stop - voloume - nowplaying - shuffle - search - resume - remove - queue - filter - loop - lyrics - radio__

⚙️ **Public Commands**
__invite - support - about - ping - prefix - uptime - avatar - se <emoji>__

🎉 **Giveaway Command**
__start <time> <prize> <#channel>__

🔗 **Links**
[support](https://discord.gg/SwUTJd7ZYB)-[invite](https://discord.com/api/oauth2/authorize?client_id=794288634659995659&permissions=3439696&scope=bot)-[website](https://happymeow.music.blog/)
`)

   .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
   .setColor("#F3692F");
   message.react("🔘")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
