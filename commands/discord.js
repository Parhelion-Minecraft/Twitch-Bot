exports.run = (client, channel, tags, message, args) => {
    client.say(channel, `@${tags.username}, voici le lien de notre serveur Discord : https://discord.gg/sGuzTFQnVE !`);
}