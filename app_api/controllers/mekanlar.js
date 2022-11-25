var mongoose = require("mongoose");//mongoose'yi import etmemizi sağlar
var Mekan = mongoose.model("mekan"); //Model adı models/mekansema.js

const cevapOlustur = function(res,status,content){
    res.status(status).json(content);//ekrana json formatına dönüştürüp basar
}
var cevrimler = (function(){
    var dunyaYariCap = 6371;
    var radyan2Kilometre = function(radyan){
        return parseFloat(radyan * dunyaYariCap);
    };
    var kilometre2Radyan = function(mesafe){
        return parseFloat(mesafe/dunyaYariCap);
    };
    return {
        radyan2Kilometre: radyan2Kilometre,
        kilometre2Radyan: kilometre2Radyan,
    }
})();
const mekanlariListele=async(req,res)=>{
    var boylam=parseFloat(req.query.boylam);
    var enlem=parseFloat(req.query.enlem);
    var koordinat={
        type:"Point",
        coordinates:[enlem,boylam],
    };
    var geoOptions={
        distanceField:"mesafe",
        spherical:true,
    };
    if((!enlem && boylam !==0) || (!enlem && boylam !==0)){
        cevapOlustur(res,404,{
            "hata":"enlem ve boylam zorunlu parametreler",
        });
        return;
    }
    try{
        const sonuc=await Mekan.aggregate([
            {
                $geoNear:{
                    near:koordinat,
                    ...geoOptions,
                },
            },
        ]);
        const mekanlar=sonuc.map((mekan)=>{ //sonuc dizisi içinde dolaşır ve mekanlara dönüş yapar
            return{
                mesafe:cevrimler.kilometre2Radyan(mekan.mesafe),
                ad:mekan.ad,
                adres:mekan.adres,
                puan:mekan.puan,
                imkanlar:mekan.imkanlar,
                _id:mekan._id,
            };
        });
        cevapOlustur(res,200,mekanlar);
    }catch(e){
        cevapOlustur(res,404,e);
    }
};

const mekanEkle = function(req,res){//request ve response alıyor
    Mekan.create({
        ad:req.body.ad,
        adres:req.body.adres,
        imkanlar:req.body.imkanlar.split(","),
        koordinat:[parseFloat(req.body.enlem),parseFloat(req.body.boylam)],
        saatler:[
            {
            gunler:req.body.gunler1,
            acilis:req.body.acilis1,
            kapanis:req.body.kapanis1,
            kapali:req.body.kapali1
            },
            {
            gunler:req.body.gunler2,
            acilis:req.body.acilis2,
            kapanis:req.body.kapanis2,
            kapali:req.body.kapali2
            }
        ]
    },function(hata,mekan){
        if(hata){
            cevapOlustur(res,400,hata)
        }else{
            cevapOlustur(res,201,mekan)
        }
    });
}

const mekanGetir = function(req,res){//request ve response alıyor
    if (req.params && req.params.mekanid){
        Mekan.findById(req.params.mekanid).exec(function (hata,mekan){ //exec fonksiyonu sorguyu çalıştırır
            if(!mekan){
                cevapOlustur(res,404,{"hata":"Böyle bir mekan yok"});

            }else if(hata){
                cevapOlustur(res,404,{"hata":hata});
            }else{
                cevapOlustur(res,200,mekan);
            }
        });

    }else{
        cevapOlustur(res,404,{"hata":"İstekte mekanid yok!"});
    }
}
const mekanGuncelle = function(req,res){//request ve response alıyor
    if(!req.params.mekanid) {
        cevapOlustur(res,404,{"mesaj":"Bulunamadı. mekanid gerekli"});
        return;
    } //işaretli yorumlar ve puan dışındaki her şeyi almamızı söyler
    Mekan.findById(req.params.mekanid).select("-yorumlar -puan")
        .exec(function(hata,gelenMekan){
            if(!gelenMekan) {cevapOlustur(res,404,{"mesaj":"mekanid bulunamadı"});
            return;
        }else if(hata){cevapOlustur(res,400,hata);
            return;}
        gelenMekan.ad=req.body.ad;
        gelenMekan.adres=req.body.adres;
        gelenMekan.imkanlar=req.body.imkanlar.split(",");
        gelenMekan.koordinat = [parseFloat(req.body.enlem),parseFloat(req.body.boylam)];
        gelenMekan.saatler = [
            {
                gunler: req.body.gunler1,
                acilis: req.body.acilis1,
                kapanis: req.body.kapanis1,
                kapali: req.body.kapali1,
            },
            {
                gunler:req.body.gunler2,
                acilis: req.body.acilis2,
                kapanis:req.body.kapanis2,
                kapali:req.body.kapali2,
            }];
            gelenMekan.save(function(hata,mekan){
                if(hata){cevapOlustur(res,404,hata);}
                else{cevapOlustur(res,200,mekan);}
            });
        });};

const mekanSil = function(req,res){//request ve response alıyor
    var mekanid = req.params.mekanid;
    if(mekanid){
        Mekan.findByIdAndRemove(mekanid).exec(function (hata,gelenMekan){
            if(hata){
                cevapOlustur(res,404,hata);
                return;
            }
            cevapOlustur(res,200,{"durum":"Mekan Silindi!","Silinen Mekan":gelenMekan.ad});
        });
    } else {
        cevapOlustur(res,404,{"mesaj":"mekanid bulunamadı"
    });
    }
};
module.exports = {
    mekanlariListele,
    mekanEkle,
    mekanGetir,
    mekanGuncelle,
    mekanSil
}