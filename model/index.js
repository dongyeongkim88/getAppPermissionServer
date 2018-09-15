
var db = require("../helper/db/db_query");
var gplay = require('google-play-scraper');
var async = require("async");

exports.index = {

    insert: function(callback) {

        var count = 0;
        var length = Object.keys(gplay.category).length-1;

        for(var index in gplay.category) {

            gplay.list({
                category: gplay.category[index],
                collection: gplay.collection.TOP_FREE,
                num: 50
            }).then(function(collection){

                for(var i=0; i<collection.length; i++) {

                    // 타이머 이벤트에 즉시 실행 함수를 랩핑.
                    (function(i, collection){
                        process.nextTick(function(){

                            var appInfo = collection[i];

                            var info = {
                                title: appInfo.title,
                                appId: appInfo.appId,
                                developer: appInfo.developer,
                                developerId: appInfo.developerId,
                                score: appInfo.score
                            };

                            var insertCompanyQ = "insert into app_companys(id, name) value('"+info.developerId+"', '"+info.developer+"')";

                            db.insert(insertCompanyQ, function(err, result){

                                if(err) {
                                    console.log(err);
                                    if(err.errno === 1062) {

                                        var appInfoQ = "insert into app_infos(app_id, app_name, app_companys_id) value('"+info.appId+"', '"+info.title+"', (select app_companys_id from app_companys where name='"+info.developer+"'))";

                                        db.insert(appInfoQ, function(err){

                                            gplay.permissions({appId: info.appId}).then(function(permi){

                                                for(var i=0; i<permi.length; i++) {

                                                    (function(i, permi) {
                                                        process.nextTick(function () {

                                                            var permissionQ = "insert into app_permissions(permission, app_infos_id) value('"+permi[i].permission+"',"+result.insertId+")";
                                                            db.insert(permissionQ, function(err, result){})

                                                        });
                                                    })(i, permi)

                                                }

                                            });

                                        })

                                    }

                                } else {

                                    var appInfoQ = "insert into app_infos(app_id, app_name, app_companys_id) value('"+info.appId+"', '"+info.title+"', "+result.insertId+")";

                                    db.insert(appInfoQ, function(err, result){

                                        gplay.permissions({appId: info.appId}).then(function(permi){

                                            for(var i=0; i<permi.length; i++) {
                                                (function(i, permi) {
                                                    process.nextTick(function () {

                                                        var permissionQ = "insert into app_permissions(permission, app_infos_id) value('"+permi[i].permission+"',"+result.insertId+")";
                                                        //console.log(permissionQ);
                                                        db.insert(permissionQ, function(err, result){})

                                                    });
                                                })(i, permi)
                                            }

                                        });

                                    })

                                }

                                if(length === count) {
                                    callback(null);
                                }

                                ++count;

                            });

                        });
                    })(i, collection);

                }



            });

        }



       /* var appInfomation = [];

        var tasks = [
            function (cb) {



            },
            function (cb) {
                cb(null);
            }
        ];

        async.series(tasks, function (err, results) {

            callback(err);

        });
*/
    }
};
