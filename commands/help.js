exports.run = (client, channel, tags, message, args) => {
    client.say(channel, `@${tags.username}, vous pouvez retrouver mes commandes ici : https://github.com/Parhelion-Minecraft/Twitch-Bot/blob/main/README.md !`);
}