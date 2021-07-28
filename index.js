require("dotenv").config();

const tmi = require('tmi.js');

const client = new tmi.Client({
    identity: {
        username: 'parhelionbot',
        password: process.env.OAuth
    },
    channels: ['parhelionminecraft']
});
client.connect()
    .then(function () {
        console.log('[LANCÉ] Bot connecté !');
    })
    .catch(err => {
        console.error(err);
    });

const fs = require('fs');
const Enmap = require('enmap');

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`[LANCEMENT] Chargement en cours de l'événement ${eventName}.`);
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`[LANCEMENT] Chargement en cours de la commande ${commandName}.`);
        client.commands.set(commandName, props);
    });
});