/**
 * Created by dev on 2016-01-18.
 */
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

//워커 스케쥴을 OS에 맡긴다.
cluster.schedulingPolicy = cluster.SCHED_NONE;

//워커 스케쥴을 Round Robin 방식으로 한다.
cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isMaster) {

    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('online', function (worker) {
        console.log('Already Make Worker ID : ' + worker.process.pid);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
        if (code == 200) {
            //종료 코드가 200인 경우, 워커 재생성
            cluster.fork();
        }
    });

} else {
    //change this line to Your Node.js app entry point.
    require("./bin/www");
}

