const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { 
  PREFIX, 
} = require(`../config.json`);

  


module.exports = {
  name: "invite",
  aliases: ["i"],
  cooldown: 8,
  description: "**all commands**",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
    .setThumbnail(`https://media.discordapp.net/attachments/797588358590365713/900623771336081418/image0.jpg`)
    .setDescription(`
[Click here](https://discord.com/api/oauth2/authorize?client_id=794288634659995659&permissions=3439696&scope=bot) to invite Meow Music.
`)

  
   .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
   .setColor("RANDOM");
   message.react("<:yesaeon:900950547539054643>")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
