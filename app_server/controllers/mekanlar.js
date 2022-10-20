var express = require('express');
var router = express.Router();

const anaSayfa=function(req, res, next) {
    res.render('anasayfa',
    {
    "baslik":"Anasayfa",
     "sayfabaslik":{
        "siteAd":"MekanBul",
        "Slogan":"Civardaki Mekanları keşfet!"
     },   
     "mekanlar":[
        {
            "ad":"Starbucks",
            "puan":"3",
            "adres":"Centrum Garden Avm",
            "imkanlar":["Dunya Kahveleri","Cay","Kek"],
            "mesafe":"10km"
        },
        {
            "ad":"Barida Kafe",
            "puan":"1",
            "adres":"Sdu batı kampusu",
            "imkanlar":["Tost","Cay","Kahve"],
            "mesafe":"1km"
        },
        
     ]
    }
    );
}
const mekanBilgisi=function(req, res, next) {
    res.render('mekanbilgisi', { title: 'Mekan Bilgisi' });
}
const yorumEkle=function(req, res, next) {
    res.render('yorumekle', { title: 'Yorum Ekle' });
}

module.exports={
    anaSayfa,
    mekanBilgisi,
    yorumEkle
}