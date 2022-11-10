var mongoose=require("mongoose");
require("./mekansema")//mekansemayi göstermemizi saglar
var dbURI = "mongodb://localhost/mekanbul";
mongoose.connect(dbURI);
function kapat(msg,callback){
    mongoose.connection.close(function(){
        console.log(msg);
        callback();
    }
    );
}
process.on("SIGINT",function(){
    kapat("Uygulama Kapatıldı",function(){
        process.exit(0);
    }
    );
} 
);//sigint sinyali geldiğinde kapat fonksiyonu ile eşleştirir çağrılır
mongoose.connection.on("connected",function(){
    console.log(dbURI+" adresindeki veritabanına bağlandı")
}
);//java scriptte metod içinde metod çalıştırılabilir
mongoose.connection.on("disconnected",function(){
    console.log(dbURI+" adresindeki veritabanı bağlantısı koptu")
}
);
mongoose.connection.on("error",function(){
    console.log("Bağlantı hatası");
}
);