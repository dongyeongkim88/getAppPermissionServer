var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

/*
[
    "ANDROID_WEAR",
    "BOOKS_AND_REFERENCE",
    "BUSINESS",
    "COMICS",
    "COMMUNICATION",
    "EDUCATION",
    "ENTERTAINMENT",
    "FAMILY_ACTION",
    "FAMILY_BRAINGAMES",
    "FAMILY_CREATE",
    "FAMILY_EDUCATION",
    "FAMILY_MUSICVIDEO",
    "FAMILY_PRETEND",
    "FINANCE",
    "GAME_ACTION",
    "GAME_ADVENTURE",
    "GAME_ARCADE",
    "GAME_BOARD",
    "GAME_CARD",
    "GAME_CASINO",
    "GAME_CASUAL",
    "GAME_EDUCATIONAL",
    "GAME_MUSIC",
    "GAME_PUZZLE",
    "GAME_RACING",
    "GAME_ROLE_PLAYING",
    "GAME_SIMULATION",
    "GAME_SPORTS",
    "GAME_STRATEGY",
    "GAME_TRIVIA",
    "GAME_WORD",
    "HEALTH_AND_FITNESS",
    "LIBRARIES_AND_DEMO",
    "LIFESTYLE",
    "MEDIA_AND_VIDEO",
    "MEDICAL",
    "MUSIC_AND_AUDIO",
    "NEWS_AND_MAGAZINES",
    "PERSONALIZATION",
    "PHOTOGRAPHY",
    "PRODUCTIVITY",
    "SHOPPING",
    "SOCIAL",
    "SPORTS",
    "TOOLS",
    "TRANSPORTATION",
    "TRAVEL_AND_LOCAL",
    "WEATHER"
]*/

