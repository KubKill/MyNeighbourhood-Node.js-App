const mysql = reqire('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tin-somsiad-sequelize'
})

module.exports = pool;