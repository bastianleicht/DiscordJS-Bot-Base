/*
 * Copyright (c) 2020-2021, Bastian Leicht <mail@bastianleicht.de>
 *
 * PDX-License-Identifier: BSD-2-Clause
 */
const Discord = require("discord.js");
const client = new Discord.Client();

const fs = require("fs");

const Enmap = require("enmap");

const config = require("./config.json");
client.config = config;

client.commands = new Enmap();

console.log("------------------------------------------------");

fs.readdir("./events/", (err, files) => {
  if (err) return console.error;
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split(".")[0];
    console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
  console.log("------------------------------------------------");
});

fs.readdir("./commands/", async (err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let cmdName = file.split(".")[0];
    console.log(`Loaded Command '${cmdName}'`);
    client.commands.set(cmdName, props);
  });
  console.log("------------------------------------------------");
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

client.login(config.token || process.env.TOKEN);
