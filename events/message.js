const talkedRecently = new Set();

module.exports = (client, channel, tags, message, self) => {
    if (self === true) return;

    const args = message.replace('!', '').split(' ');
    const command = args[0];

    const prefix = "!";

    if (!message.startsWith(prefix)) {
        const mysql = require('mysql');

        var connection = mysql.createConnection({
            host: 'localhost',
            user: process.env.dbUsername,
            password: process.env.dbPassword,
            database: 'parhelionTwitchBot'
        });

        if (!talkedRecently.has(tags["user-id"])) {
            const points = Math.floor(Math.random() * 10 + 1);

            connection.query(`SELECT * FROM points WHERE twitchID=${tags["user-id"]}`, function (error, results, fields) {
                if (error) throw error;

                if (!results || !results[0]) {
                    connection.query(`INSERT INTO points (twitchID, twitchUName, points) VALUES (${tags["user-id"]}, "${tags["username"]}", ${points})`);
                } else {
                    const newPoints = results[0]["points"] + points;

                    console.log(`[BALANCE] ${points} ont été ajouté à ${tags["username"]}`)

                    connection.query(`UPDATE points SET points=${newPoints} WHERE twitchID=${tags["user-id"]}`);
                }
            });

            talkedRecently.add(tags["user-id"]);

            setTimeout(() => {
                talkedRecently.delete(tags["user-id"])
            }, 15000);
        }
    }

    const cmd = client.commands.get(command);

    if (!cmd) return;

    cmd.run(client, channel, tags, message, args);
    
    console.log(`[COMMANDE] La commande ${command} a été éxectuée par ${tags["username"]}`);
}