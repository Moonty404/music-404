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
    .setThumbnail(`https://media.discordapp.net/attachments/902880684505456680/905246272938737704/image0.gif`)
    .setAuthor(`Meow-Music`, `https://images-ext-2.discordapp.net/external/wddx7UZ9Abt46a0ewygiTK6MDI2uQWF8nbvTxUXJBRg/https/cdn.discordapp.com/emojis/642159082207313922.png`)
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
   message.react("✅")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
