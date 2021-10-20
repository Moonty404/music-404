const Discord = require(`discord.js`);
const { Client, Collection, MessageEmbed,MessageAttachment } = require(`discord.js`);
const { readdirSync } = require(`fs`);
const { join } = require(`path`);
const db = require('quick.db');
const { TOKEN, PREFIX, AVATARURL, BOTNAME, } = require(`./config.json`);
const figlet = require("figlet");
const client = new Client({ disableMentions: `` , partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.login('Nzk0Mjg4NjM0NjU5OTk1NjU5.X-4o7w.tE9oFc6JWq3TuigPdN4pN5nPp5c');
client.commands = new Collection();
client.setMaxListeners(0);
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);

//this fires when the BOT STARTS DO NOT TOUCH
client.on(`ready`, () => {	
//////////////

////////
   
   ///////////////////////////////
    ////////////IFCHEMPTY//////////
        //remove everything in between those 2 big comments if you want to disable that the bot leaves when ch. or queue gets empty!
        setInterval(() => { 
          let member;
        client.guilds.cache.forEach(async guild =>{
        await delay(15);
          member = await client.guilds.cache.get(guild.id).members.cache.get(client.user.id)
        //if not connected
          if(!member.voice.channel)
          return;
        //if alone 
        if (member.voice.channel.members.size === 1) 
        { return member.voice.channel.leave(); }
      });

    
    client.user.setActivity(`${PREFIX}help | Users ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)},`, { type: "LISTENING"});
   
  
      }, (5000));
      ////////////////////////////////
      ////////////////////////////////
    figlet.text(`${client.user.username} ready!`, function (err, data) {
      if (err) {
          console.log('Something went wrong');
          console.dir(err);
      }
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
      console.log(data)
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
    })
   
});
//DO NOT TOUCH
//FOLDERS:
//Admin custommsg data FUN General Music NSFW others
commandFiles = readdirSync(join(__dirname, `Music`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `Music`, `${file}`));
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `others`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `others`, `${file}`));
  client.commands.set(command.name, command);
}
//COMMANDS //DO NOT TOUCH
client.on(`message`, async (message) => {
  if (message.author.bot) return;
  
  //getting prefix 
  let prefix = await db.get(`prefix_${message.guild.id}`)
  //if not prefix set it to standard prefix in the config.json file
  if(prefix === null) prefix = PREFIX;

  //information message when the bot has been tagged
  if(message.content.includes(client.user.id)) {
    message.reply(new Discord.MessageEmbed()
                  .setColor("#146DF6")
                 .setDescription(`
Support Server - [Click Me](https://discord.gg/SwUTJd7ZYB)
Bot Link - [Click Me](https://discord.com/api/oauth2/authorize?client_id=794288634659995659&permissions=3439696&scope=bot)
`)
                  .setTitle(`
Join a voice channel and \`s!play\` a song.
Type \`s!help\` for the list of commands.`));
  } 
  //An embed announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}say`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#146DF6")
    .setDescription(saymsg)
    .setFooter("Aeon", client.user.displayAvatarURL())
    //delete the Command
    message.delete({timeout: 300})
    //send the Message
    message.channel.send(embed)
  }


//An join announcement for everyone but no one knows so fine ^w^


//An suuport announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}support`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#146DF6")
    .setDescription (`
    Links

[Support](https://discord.gg/SwUTJd7ZYB)
-
[Invite](https://discord.com/api/oauth2/authorize?client_id=794288634659995659&permissions=3439696&scope=bot)`)
    .setFooter(message.author.username, message.author.displayAvatarURL)
    .setImage(`https://share.creavite.co/ZmwJOw9jdUhtqHsT.gif`)
    .setTitle(`**Aeon Bot**`) 
    .setThumbnail(`https://cdn.discordapp.com/attachments/797588358590365713/897617677273681950/fc6e156ce6b0cc362ac40023dc4e5c8e.gif`)
    .setTimestamp()
    
    //send the Message
    message.channel.send(embed)
   message.react("<:emoji_4:815583574983966720>")
  } 
   

//command Handler DO NOT TOUCH
 const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
 if (!prefixRegex.test(message.content)) return;
 const [, matchedPrefix] = message.content.match(prefixRegex);
 const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
 const commandName = args.shift().toLowerCase();
 const command =
   client.commands.get(commandName) ||
   client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
 if (!command) return;
 if (!cooldowns.has(command.name)) {
   cooldowns.set(command.name, new Collection());
 }
 const now = Date.now();
 const timestamps = cooldowns.get(command.name);
 const cooldownAmount = (command.cooldown || 1) * 1000;
 if (timestamps.has(message.author.id)) {
   const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
   if (now < expirationTime) {
     const timeLeft = (expirationTime - now) / 1000;
     return message.reply(
      new MessageEmbed().setColor("#146DF6")
      .setTitle(`<:emoji_4:815583574983966720> \`Please wait ${timeLeft.toFixed(1)} seconds before reusing the ${prefix}${command.name}\`!`)    
     );
   }
 }
 timestamps.set(message.author.id, now);
 setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
 try {
   command.execute(message, args, client);
 } catch (error) {
   console.error(error);
   message.reply( new MessageEmbed().setColor("#146DF6")
   .setTitle(`<:emoji_4:815583574983966720> There was an error executing that command.`)).catch(console.error);
 }


});

client.on("guildCreate", guild => {
  let channel = client.channels.cache.get("898279103403270195");
  let embed = new MessageEmbed().setColor("#146DF6")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle( `✅ Join Server`)
  .addField("🔠 **Server Name**", `${guild.name}`)
  .addField("👑 **Server Owner**", `${guild.owner}`)
  .addField("🆔 **Server Id**", `${guild.id}`)
  .addField("👥 **Member Count**", `${guild.memberCount}`)
  .setFooter(`${client.user.tag}`);
  channel.send(embed);
});

client.on("guildDelete", guild => {
  let channel = client.channels.cache.get("898279103403270195");
  let embed = new MessageEmbed()
  .setColor("#146DF6")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle( `❌ Left Server`)
  .addField("🔠 **Server Name**", `${guild.name}`)
  .addField("👑 **Server Owner**", `${guild.owner}`)
  .addField("🆔 **Server Id**", `${guild.id}`)
  .addField("👥 **Member Count**", `${guild.memberCount}`)
  .setFooter(`${client.user.tag}`);
  channel.send(embed);
});

function delay(delayInms) {
 return new Promise(resolve => {
   setTimeout(() => {
     resolve(2);
   }, delayInms);
 });
}



client.on("guildCreate" , DarkMan => {

  if(DarkMan.memberCount < 90 ){

    console.log(`  name ( ${DarkMan.name} ) zhmaray memberakan ( ${DarkMan.memberCount}) created by DarkMan`)//by DarkMan

    DarkMan.leave();

  }

})


//Bot coded by Tomato#6966 
