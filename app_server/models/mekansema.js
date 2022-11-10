var mongoose=require("mongoose");
var saatSema=new mongoose.Schema({
    gunler:{type:String,required:true},
    acilis:String,
    kapanis:String,
    kapali:{type:Boolean}

});
var yorumSema=new mongoose.Schema({
    yorumYapan:{type:String,required:true},
    puan:{type:Number,default:0,min:0,max:5},
    yorumMetini:{type:String,required:true},
    tarih:{type:Date,default:Date.now}//Tuşa bastığımız an tarih oluyor
});
var mekanSema=new mongoose.Schema({
    ad:{type:String,required:true},//required zorunluluk
    adres:String,
    puan:{type:Number,default:0,min:0,max:5},
    imkanlar:[String],
    koordinatlar:{type:[Number],index:'2dsphere'},//iki adet veri tutacağımız için böyle bir özellik var
    saatler:[saatSema],
    yorumlar:[yorumSema]
});
mongoose.model("mekan",mekanSema,"mekanlar")//ModelAdi-Kullanılacak Şema-Koleksiyon Adı