var express = require('express')
var router = express.Router()
var ctrlMekanlar=require('../controllers/mekanlar')
var ctrlDigerler=require("../controllers/digerleri")
/* GET home page. */
router.get('/',ctrlMekanlar.anaSayfa)
router.get('/mekan',ctrlMekanlar.mekanBilgisi)
router.get('/mekan/yorum/yeni',ctrlMekanlar.yorumEkle)
router.get('/hakkinda',ctrlDigerler.hakkinda)

module.exports = router;
