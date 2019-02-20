const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "?"

bot.on("message", function (message) {
  console.log(message.content);
});

bot.on("ready", function () {
  console.log("Im ready");
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("You'r every move", { type: "Watching" });

});

bot.on("message", function (message) {
  if (message.content.indexOf("nigger") == 0) {
    message.delete().catch(O_o => { });
    message.channel.send("your racism has been logged and action may follow")
    let racismEmbed = new Discord.RichEmbed()
      .setDescription("racism log")
      .setColor("#f00000")
      .addField("racist wank", `${message.author} with ID: ${message.author.id}`)
      .addField("Channel", message.channel)
      .addField("Time", message.createdAt);

    let reportschannel = message.guild.channels.find(`name`, "logs");
    if (!reportschannel) return message.channel.send("Couldn't find reports channel.");

    reportschannel.send(racismEmbed);
  }

});

bot.on("message", function (message) {
  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith(prefix)) return;

  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0]) {
    case "commands":
      let bicon = bot.user.displayAvatarURL;
      let commandEmbed = new Discord.RichEmbed()
        .setDescription("Bot Commands.")
        .setColor("#15f153")
        .setThumbnail(bicon)
        .addField("Kick", "?kick @user Reason")
        .addField("Ban", "?ban @user Reason")
        .addField("multijake", "multistream for ron & jake")
        .addField("Server Information", "?serverinfo")
        .addField("Bot Information", "?botinfo")
        .addField("Coder", 'Gh0st');

      message.delete().catch(O_o => { });
      message.channel.send(commandEmbed);

      break;
    //ReportCmd
    case "report":

      let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if (!rUser) return message.channel.send("Couldn't find user.");
      let rreason = args.join(" ").slice(22);

      let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#15f153")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", rreason);

      let reportschannel = message.guild.channels.find(`name`, "logs");
      if (!reportschannel) return message.channel.send("Couldn't find reports channel.");


      message.delete().catch(O_o => { });
      reportschannel.send(reportEmbed);

      break;

    case "multijake":
      message.channel.send("The multistream link for Ron & Jake: https://multistre.am/roninpt/jakekapusta/layout4/");
      message.delete().catch(O_o => { });
      break;

    case "multi?":
      message.channel.send("");
      message.delete().catch(O_o => { });
      break;

    case "live":
      message.channel.send("@everyone i am live at https://twitch.tv/roninpt/");
      message.delete().catch(O_o => { });
      break;

    case "ban":
      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if (!bUser) return message.channel.send("Can't find user!");
      let bReason = args.join(" ").slice(22);
      if (!message.member.hasPermission(`BAN_MEMBERS`)) return message.channel.send("No can do pal!");
      if (bUser.hasPermission(`BAN_MEMBERS`)) return message.channel.send("That person can't be kicked!");

      let banEmbed = new Discord.RichEmbed()
        .setDescription("~Ban~")
        .setColor("#bc0000")
        .addField("Banned User", `${bUser} with ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);

      let incidentchannel = message.guild.channels.find(`name`, "logs");
      if (!incidentchannel) return message.channel.send("Can't find logs channel.");

      message.delete().catch(O_o => { });

      message.guild.member(bUser).ban(bReason);
      incidentchannel.send(banEmbed);

    case "kick":
      let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if (!kUser) return message.channel.send("Can't find user!");
      let kReason = args.join(" ").slice(22);
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
      if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

      let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("#e56b00")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Tiime", message.createdAt)
        .addField("Reason", kReason);

      let kickChannel = message.guild.channels.find(`name`, "logs");
      if (!kickChannel) return message.channel.send("Can't find logs channel.");

      message.delete().catch(O_o => { });

      message.guild.member(kUser).kick(kReason);
      kickChannel.send(kickEmbed);
      break;

    case "botinfo":


      let ficon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#15f153")
        .setThumbnail(ficon)
        .addField("Bot Name", bot.user.username)
        .addField("Created On", bot.user.createdAt);

      message.delete().catch(O_o => { });

      return message.channel.send(botembed);

      break;



    case "":



      message.delete().catch(O_o => { });

      break;

    case "serverinfo":

      let sicon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#15f153")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount);

      return message.channel.send(serverembed);

      message.delete().catch(O_o => { });
      break;
  }


});

bot.login(process.env.token);
 
