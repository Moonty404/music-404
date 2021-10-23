const { MessageEmbed } = require("discord.js");

const Color = `#F3692F`;


module.exports = {

  name: "avatar",
  aliases: ["A"],
description: " ``` Avatar @user```",
  category: "fun",
execute(message, args) {
 

    const member = message.mentions.users.first() || message.author;


    const Embed = new MessageEmbed()

      .setColor("#F3692F")

      .setTitle(` ${member.username} ` )
.setURL(URL)
   
.setImage(member.avatarURL({size: 2048, dynamic: true, format: "png"}))
    .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
    .addField(`Link`, `[Click Me](${member.displayAvatarURL()})`);
    message.channel.send(Embed);

  }

};
