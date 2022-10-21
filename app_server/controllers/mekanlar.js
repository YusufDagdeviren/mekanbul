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
    res.render('mekanbilgisi',
    {  
        "baslik":"Mekan Bilgisi",
        "mekanBaslik":"Starbucks",
        "mekanDetay":{
            "ad":"Starbucks",
            "puan":"3",
            "adres":"Centrum Garden Avm",
            "saatler":[
                {
                "gunler":"Pazartesi-Cuma",
                "acilis":"9:00-23:00",
                "kapali":"false"
                },
                {
                    "gunler":"Cumartesi-Pazar",
                    "acilis":"9:00-21:00",
                    "kapali":"false"
                }
            ],
            "imkanlar":[
                "kahve","Çay","Kek"
            ],
            "koordinatlar":{
                "enlem":"37.7",
                "boylam":"30.5"
            },
            "yorumlar":[
                {
                    "yorumYapan":"Asım Sinan Yuksel",
                    "yorumMetini":"berbaaaat",
                    "tarih":"20 Ekim 2022",
                    "puan":"1"
                },
                {
                    "yorumYapan":"Zehra Çakır",
                    "yorumMetini":"cok iyi",
                    "tarih":"20 Kasım 2022",
                    "puan":"5"
                }
            ]
        }
    }
    
    );
}
const yorumEkle=function(req, res, next) {
    res.render('yorumekle', { title: 'Yorum Ekle' });
}

module.exports={
    anaSayfa,
    mekanBilgisi,
    yorumEkle
}