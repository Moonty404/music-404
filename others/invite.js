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
    .setDescription(`
[Click here](https://discord.com/api/oauth2/authorize?client_id=794288634659995659&permissions=3439696&scope=bot) to invite Meow Music.
`)

  
   .setColor("RANDOM");
   message.react("<:yesaeon:900950547539054643>")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
