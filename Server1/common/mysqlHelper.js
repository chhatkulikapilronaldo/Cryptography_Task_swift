// "use strict";
// const mysql = require('mysql2/promise');
// ((mysqlHelper) => {
//     let dbClient = null;
//     let tranConn = null;
//     mysqlHelper.init = async () => {
//         try {
//             if (!dbClient) {
//                 dbClient = await mysql.createPool({
//                     user: process.env.MYSQL_DB_USER,
//                     host: process.env.MYSQL_DST,
//                     port: process.env.MYSQL_DB_PORT,
//                     database: process.env.MYSQL_DB_NAME,
//                     password: process.env.MYSQL_DB_PASSWORD
//                 });
//             }
//             return dbClient;

//         } catch (error) {
//             throw error;
//         }
//     };

//     mysqlHelper.query = async (query, fields, metaData) => {
//         try {
//             // console.log(dbClient.host)
//             let res = await dbClient.query(query, fields);
//             return res;
//         } catch (error) {
//             throw error;
//         }
//     }

// })(module.exports);
"use strict";
const mysql = require('mysql2/promise');
require('dotenv').config(); // Load environment variables from .env file

const mysqlHelper = {};

mysqlHelper.init = async () => {
    try {
        let dbClient = await mysql.createPool({
            user: process.env.MYSQL_DB_USER,
            host: process.env.MYSQL_DB_HOST,
            port: process.env.MYSQL_DB_PORT,
            database: process.env.MYSQL_DB_NAME,
            password: process.env.MYSQL_DB_PASSWORD
        });
        return dbClient;
    } catch (error) {
        throw error;
    }
};

mysqlHelper.query = async (query, fields, metaData) => {
    try {
        const dbClient = await mysqlHelper.init(); // Initialize the database connection
        let res = await dbClient.query(query, fields);
        return res;
    } catch (error) {
        throw error;
    }
};

module.exports = mysqlHelper;

