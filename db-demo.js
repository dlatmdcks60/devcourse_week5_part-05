const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Board',
});

connection.query("SELECT * FROM `posts`;", (err, rows) => {
    console.log(rows[0]);
});
