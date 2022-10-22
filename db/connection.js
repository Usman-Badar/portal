const mysql = require('mysql');

const db = mysql.createPool( 
    {
        host: '127.0.0.1',
        port : process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true,
        supportBigNumbers: true,
        connectionLimit: 300
    }
);

db.getConnection(
    ( err, connection ) => {

        if ( err )
        {
            console.log("Could not connect to MySQL.");
        }else
        {
            console.log("Connected to MySQL.");
            connection.release();
        }

    }
)

// db.on(
//     'release', ( connection ) => {
//         console.log('Connection %d released', connection.threadId);
//     }
// );

// setInterval(() => {
    
//     db.end(function (err) {
//         // all connections in the pool have ended
//         console.log('Pool end')
//     });

// }, 2000);

// setInterval(() => {
//     console.log('Database Open Connections: ', db._allConnections.length);
// 	console.log('Acquiring Connections: ', db._acquiringConnections.length);
// 	console.log('Free Connections: ', db._freeConnections.length);
// 	console.log('Queue Connections: ', db._connectionQueue.length);
// }, 10000);

module.exports = db;