exports.run = (client, channel, tags, message, args) => {
    const mysql = require('mysql');

    var connection = mysql.createConnection({
        host: 'localhost',
        user: process.env.dbUsername,
        password: process.env.dbPassword,
        database: 'parhelion'
    });

    connection.query(`SELECT * FROM points WHERE twitchID=${tags["user-id"]}`, function (error, results, fields) {
        if (error) throw error;

        if (!results || !results[0]) {
            client.say(channel, `@${tags["username"]}, vous n'avez actuellement aucun point. Envoyez des messages pour en gagner.`);
        } else {
            client.say(channel, `@${tags["username"]}, vous avez actuellement ${results[0]["points"]} points.`);
        }
    });
}