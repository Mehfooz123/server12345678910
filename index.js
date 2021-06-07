const Discord = require('discord.js');
const client = new Discord.Client();

let prefix = "!!";

client.on("ready", ()=>{
  console.log("bot is online");
})

client.login("Nzg5MjE0NTk4OTg4NTYyNDg0.X9uzXw.3jnDVedfF47Vm2xoUcjZDAN_f7Y");

client.on("message", async message=>{
  if(message.author.bot) return;

  if(!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

if(command === "ban"){
    const reason = args.slice(1).join(" ");
    const member = message.mentions.members.first();
    let permissionmissing = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Missing permission")
        .setDescription(`You don't have permission to ban this user 'BAN_MEMBERS'`)
        .setFooter(`Moderator: ${message.author.tag}`);
    if(!message.member.hasPermission("BAN_MEMBERS"))
        return message.channel.send(permissionmissing);
    let mentionauser = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Invalid member")
        .setDescription(`Please mention a valid user`)
        .setFooter(`Moderator: ${message.author.tag}`);
    if(!member)
        return message.channel.send(mentionauser);
    message.guild.members.ban(member);
    let UserBanned = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("User has been seccussfully banned!")
        .setDescription(`${member.user.tag} has been banned by: ${message.author.tag} because of: ${reason}`)
        .setFooter(`Moderator: ${message.author.tag}`);
    message.channel.send(UserBanned);
}

if(command === "warn"){
    let member = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send("You don't have permission");
    if(!member)
        return message.reply("mention someone to warn.");
    let embed = new Discord.MessageEmbed()
        .setTitle("Warnings")
        .setDescription(`${member} got warned by ${message.author} because of: ${reason}`)
        .setColor("GREEN")
        .setFooter(`Moderator : ${message.author.username}`)
    message.channel.send(embed);
    let MemberDm = new Discord.MessageEmbed()
        .setTitle("You have been warned")
        .setDescription(`You have been warned by ${message.author} because of: ${reason}`)
        .setColor("RED")
        .setFooter(`Moderator : ${message.author.username}`)
    member.send(MemberDm);
}  

	if(command === "unmute") {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let logchannel = message.guild.channels.find('name', 'cgr420-logs');
    let role = message.guild.roles.find('name', 'mute')
    //CHANGE THIS ^^


if (!logchannel) return message.reply("'I cannot find a logs channel'");
if (!message.member.hasPermission("Adminnistrator")) return 
message.reply(":no_entry_sign: **Error:** You don't have the **Mute Members** permission")
if (reason.length < 1) return message.reply("'You must supply a reason for the mute.'");
if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
if (!message.guild.member(user).roles.has(role)) return message.reply("`:no_entry_sign: I cannot unmute that member`");
message.guild.member(user).removeRole(role);

const embed = new Discord.MessageEmbed()
  .setColor("0xFF0000")
  .setTimestamp()
  .addField('Action:', 'Unmute')
  .addField('User:', `${user.tag} (${user.id})`)
  .addField('Moderator:', 
  `${message.author.tag}`)
  .addField('Reason', reason);
  message.channel.send("`:hammer: Bippity boppity **UNMUTED**! I\'ve logged the  unmute in the logs channel.`")
  return logchannel.send(embed);
}
  
	if(command === "unban"){
    let userID = args[0];
    if(!message.member.hasPermission("BAN_MEMBERS,Adminnistrator"))
            return message.channel.send("You don't have permission to ban this user BAN_MEMBERS");
    if(!userID)
      return message.channel.send("Please provide a valid user ID");
   message.guild.members.unban(userID).catch(error=> message.channel.send("ERROR: CANNOT UNBAN USER | CONSOLE ERROR:" + error))
    message.channel.send("USER HAS BEEN UNBANNED");
}
});