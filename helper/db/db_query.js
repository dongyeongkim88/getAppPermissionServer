var mysql_dbc = require("./db_configuration")();
var mysql = mysql_dbc.init();
mysql_dbc.test_open(mysql);

exports.insert = function(insertquery, callback){

    mysql.getConnection(function (err, connection) {

        if (err) {
            connection.release();
            callback(err, "DB Connection Error");
            return;
        }

        connection.beginTransaction(function(err){

            if(err){
                callback(err, "error");
                return;
            }

            connection.query(insertquery, function (err, rows) {

                if (!err) {

                    //commit start
                    connection.commit(function(){
                        connection.release();
                        if (err) {
                            connection.rollback(function () {
                                callback(err, "rollback");
                            });
                        } else {
                            callback(err, rows);
                        }// if err
                    }); //commit end

                } else {

                    connection.rollback(function(){
                        connection.release();
                        callback(err, "rollback");
                    })

                } // if

            }); // cnnection query

        }); // beginTransaction
    }); // getConnection

};

exports.bulkInsert = function(insertquery, dataArray, callback){

    mysql.getConnection(function (err, connection) {

        if (err) {
            connection.release();
            callback(err, "DB Connection Error");
            return;
        }

        connection.beginTransaction(function(err){
            if(err){
                connection.release();
                callback(err, "error");
                return;
            }

            connection.query(insertquery, [dataArray], function (err, rows) {
                connection.release();
                if (!err) {
                    //commit start
                    connection.commit(function(){
                        if (err) {
                            connection.rollback(function () {
                                callback(err, "rollback");
                            });
                        } else {
                            callback(err, rows);
                        }// if err
                    }); //commit end
                } else {
                    connection.rollback(function(){
                        callback(err, "rollback");
                    })
                } // if
            }); // cnnection query
        }); // beginTransaction
    }); // getConnection
};

exports.update = function(insertquery, callback){

    mysql.getConnection(function (err, connection) {

        if (err) {
            connection.release();
            callback(err, "DB Connection Error");
            return;
        }

        connection.beginTransaction(function(err){

            if(err){
                connection.release();
                callback(err, "error");
                return;
            }

            connection.query(insertquery, function (err, rows) {
                connection.release();
                if (!err) {
                    //commit start
                    connection.commit(function(){
                        if (err) {
                            connection.rollback(function () {
                                callback(err, "rollback");
                            });
                        } else {
                            callback(err, rows);
                        }// if err
                    }); //commit end
                } else {
                    connection.rollback(function(){
                        callback(err, "rollback");
                    })
                } // if
            }); // cnnection query
        }); // beginTransaction
    }); // getConnection
};

exports.delete = function(insertquery, callback){

    mysql.getConnection(function (err, connection) {

        if (err) {
            connection.release();
            callback(err, "DB Connection Error");
            return;
        }

        connection.beginTransaction(function(err){
            if(err){
                connection.release();
                callback(err, "error");
                return;
            }

            connection.query(insertquery, function (err, rows) {
                connection.release();
                if (!err) {
                    //commit start
                    connection.commit(function(){
                        if (err) {
                            connection.rollback(function () {
                                callback(err, "rollback");
                            });
                        } else {
                            callback(err, rows);
                        }// if err
                    }); //commit end
                } else {
                    connection.rollback(function(){
                        callback(err, "rollback");
                    })
                } // if
            }); // cnnection query
        }); // beginTransaction
    }); // getConnection

};

exports.select = function(query, callback){

    mysql.getConnection(function(err,connection){

        if(err){
            connection.release();
            callback(err, "DB Connection Error");
            return;
        }

        connection.query(query, function(err, result){
            connection.release();

            if(!err){
                callback(err,result);
            } else {
                callback(err, "error");
            }

        });

    });

};


exports.getDBConnection = function(callback){

    mysql.getConnection(function (err, connection) {

        if (err) {
            connection.release();
            callback(err, false)
        } else {
            callback(err, connection);
        }

    }); // getConnection

};