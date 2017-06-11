var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function makeUrl(type,name){
  return "https://wind-bow.gomix.me/twitch-api/"+type+"/"+name+"?callback=?";
}
//test
function getMessage(){

  channels.forEach(function(channel) {

    $.getJSON(makeUrl("streams",channel),function(data){
        var status;
        if(data.stream===null){
          status = "Offline";
        }else if(data.stream === undefined){
          status = "Offline";
        }else{
          status = "Online";
        }
        console.log("status",status);  

        $.getJSON(makeUrl("channels",channel),function(data2){
            
            var logo;
            if(data2.logo!==null){
              logo = data2.logo;
            }else{
              logo = "https://r1.ykimg.com/0130391F48525E47F1D28106C0E96936002EAE-AF85-F35A-C8A3-09E5F62623D0";
            }
            console.log(logo);
            $("#list ul").append("<li><img src="+logo+"></li>");
           // var logo = data2.logo!==null? data2.logo:"https://r1.ykimg.com/0130391F48525E47F1D28106C0E96936002EAE-AF85-F35A-C8A3-09E5F62623D0";
           // $("#list ul").append("<li><img src="+logo+"><li>");
        });  
    });

  });
  // console.log(channels);
  //  for(var i = 0;i<channels.length;i++){
  //   (function(index) {
  //     console.log(index);

  //     $.getJSON(makeUrl("streams",channels[index]),function(data){
  //         var status;
  //         if(data.stream===null){
  //           status = "Offline";
  //         }else if(data.stream === undefined){
  //           status = "Offline";
  //         }else{
  //           status = "Online";
  //         }
  //         console.log("status",status);  

  //         $.getJSON(makeUrl("channels",channels[index]),function(data2){
  //             console.log(data2);
  //            // var logo = data2.logo!==null? data2.logo:"https://r1.ykimg.com/0130391F48525E47F1D28106C0E96936002EAE-AF85-F35A-C8A3-09E5F62623D0";
  //            // $("#list ul").append("<li><img src="+logo+"><li>");
  //         });  
  //     });
  //   })(i)


   // }
}
$(document).ready(function() {
    getMessage();
    $(".condition a").click(function() {
        $(".current").removeClass("current");
        $(this).addClass("current");

    });
});


