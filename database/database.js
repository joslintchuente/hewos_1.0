let mysql = require('mysql');


let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hewos'

});

db.connect((err) => {
    if (err) throw err

    console.log('connexions etablie avec la BD Hewos ...');
})

module.exports = db;