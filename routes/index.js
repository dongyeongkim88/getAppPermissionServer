var express = require('express');
var router = express.Router();
var gplay = require('google-play-scraper');
var indexModel = require("../model/index").index;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/crow", function(req, res){

    indexModel.insert(function(err){

        if(err) {
            res.json("ERRIR");
            return;
        }

        res.json("TRUE");

    });


});

router.get("/gp", function(req, res){

    var categoryList = null;

    gplay.categories().then(function(categoryList){

       this.categoryList = categoryList;
        res.json(categoryList);

    });

});


router.get("/list", function(req, res){

    for(var index in gplay.category) {
        console.log(gplay.category[index])
    }

    gplay.list({
        category: gplay.category.GAME_ACTION,
        collection: gplay.collection.TOP_FREE,
        num: 2
    }).then(function(collection){
      res.json(collection);
    });

});

router.get("/permission", function(req, res){

    gplay.permissions({appId: "com.h8games.helixjump"}).then(function(info){
        console.log(info);
    });

    res.json("asdas");

});

module.exports = router;
