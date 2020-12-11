const Discord = require("discord.js");
const bot = new Discord.Client();
const twitter = new(require('./lib/twitter'))();
const channeltweet = ""; //Channel ID
require('dotenv').config();

bot.on('message', (msg) => {
  if (msg.author.bot) return;

  msg.attachments.forEach((attachment) => {
    if (!/\.png|\.jpg/i.test(attachment.filename)) return;
    twitter.addImage(attachment.url, msg.id, msg.author);
  })
  let embed = new Discord.RichEmbed()
    .setTitle('Twitter success')
    .setDescription("You have 5 min to remove your success in case you forgot to hide your personal infos")
    .addField("Delete? ", "React with the 🗑️ emoji")
    .setFooter('Mthor Success')
    .setTimestamp()
    .setColor("RED")
  msg.channel.send(embed).then(msg2 => {
    msg2.react('🗑️').then(r => {
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '🗑️' && user.id === msg.author.id;
      const forwards = msg2.createReactionCollector(forwardsFilter, {
        time: 3000
      });
      forwards.on('collect', r => {
        msg.delete()
        msg2.delete()
      })
    });
  })
})

bot.on('messageDelete', msg => {
  if (msg.channel.id !== channeltweet) return;
  twitter.deleteImage(msg.id, msg.author);
});

bot.login("").then(() => console.log(`${bot.user.tag} is running`)); //Change le token
