/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;

    let embed = new Discord.MessageEmbed()
        .setTitle("🏓 Pong!")
        .setColor(3447003)
        .addField("Bot Latency", `${message.createdTimestamp - message.createdTimestamp}ms`, true)
        .addField("API Latency", `${Math.round(client.ws.ping)}ms`, true)
        .setTimestamp()
        .setFooter(`© 2020 bastianleicht`);
    await message.channel.send(embed);
};

module.exports.help = {
    name: "ping"
};