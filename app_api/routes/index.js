var express = require("express");
const jwt = require('express-jwt');
var router = express.Router();
const auth =jwt.expressjwt({
    secret:process.env.JWT_SECRET,
    userProperty:'payload',
    algorithms:['sha1','RS256','HS256']
});
var ctrlMekanlar = require("../controllers/mekanlar");
var ctrlYorumlar = require("../controllers/yorumlar");
const ctrlDogrulama = require('../controllers/dogrulama');

// Tek adresle üç adet veritabanı işlemlerini yapabilirz
// /api app.js den geliyor
router
.route("/mekanlar/:mekanid")
.get(ctrlMekanlar.mekanGetir)
.put(ctrlMekanlar.mekanGuncelle)
.delete(ctrlMekanlar.mekanSil);

router
.route("/mekanlar")
.get(ctrlMekanlar.mekanlariListele)
.post(ctrlMekanlar.mekanEkle);

router
.route("/mekanlar/:mekanid/yorumlar")
.post(auth,ctrlYorumlar.yorumEkle);

router
.route("/mekanlar/:mekanid/yorumlar/:yorumid")
.get(ctrlYorumlar.yorumGetir)
.put(auth,ctrlYorumlar.yorumGuncelle)
.delete(auth,ctrlYorumlar.yorumSil);

router
.route("/admin/mekanlar")
.get(ctrlMekanlar.adminSayfaGetir)

router.post('/admin/kayitol',ctrlDogrulama.kayitOl);
router.post('/admin/girisyap',ctrlDogrulama.girisYap);
//router'ı dış dünyaya açmamızı sağlar
module.exports=router;