var mysql = require('mysql');
var config = require('./db_info').local;

module.exports = function () {
    return {
        init: function () {
            return mysql.createPool({
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database,
                connectionLimit: 50,
                queueLimit: 50

            })
        },
        test_open: function (con) {
            con.getConnection(function (err) {
                if (err) {
                    console.error('mysql connection error :' + err);
                } else {
                    console.info('mysql is connected successfully.');
                }
            })
        }
    }
};