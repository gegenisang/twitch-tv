var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function makeUrl(type, name) {
    return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + name + "?callback=?";
}

function getMessage() {

    channels.forEach(function(channel) {

        $.getJSON(makeUrl("streams", channel), function(data) {

            var status;
            if (data.stream === null) {
                status = "Offline";
            } else if (data.stream === undefined) {
                status = "Offline";
            } else {
                status = "Online";
            }
            console.log("status", status);

            $.getJSON(makeUrl("channels", channel), function(data2) {

                var logo;
                if (data2.logo !== null) {
                    logo = data2.logo;
                } else {
                    logo = "https://r1.ykimg.com/0130391F48525E47F1D28106C0E96936002EAE-AF85-F35A-C8A3-09E5F62623D0";
                }
                var name = data2.display_name != null ? data2.display_name : channel;
                var description;
                if (status === "Online") {
                    description = data2.status;
                    console.log("length", description.length);
                    if (description.length > 30) {
                        description = "<em class='description'>" + description.slice(0, 30) + "..." + "<em>";
                    } else {
                        description = "<em class='description'>" + description + "<em>";
                    }
                    icon = "<i class='fa fa-check' aria-hidden='true'></i>";

                } else {
                    description = "";
                    icon = "<i class='fa fa-exclamation' aria-hidden='true'></i>";
                }
                console.log("description", description, name);
                var url = data2.url;
                console.log("url", data2.url);
                console.log(logo);
                if (status === "Online") {
                    $("#list ul").prepend("<li><a href=" + url + " target='_blank'><img src=" + logo + "><span class='col-2'>" + name + description + "</span><span class='col-3'>" + icon + "<span></a></li>");
                } else {
                    $("#list ul").append("<li><a href=" + url + " target='_blank'><img src=" + logo + "><span class='col-2'>" + name + description + "</span><span class='col-3'>" + icon + "<span></a></li>");
                }


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



function getSearchList(status, searchValue) {
    if (status === "online") {
        $(".fa-check").parents("li").show();
        $(".fa-exclamation").parents("li").hide();
    } else if (status === "offline") {
        $(".fa-exclamation").parents("li").show();
        $(".fa-check").parents("li").hide();
    } else {
        $(".fa-exclamation").parents("li").show();
        $(".fa-check").parents("li").show();
    }
    if(searchValue){
        $("#myUl li:visible .col-2").each(function(){
            if ($(this).text().search(new RegExp(searchValue, "i")) > -1) {
                $(this).parents("li").show();
            } else {
                $(this).parents("li").hide();
            }
        });
    }
}

function getCurrentStatus(){
    var current = $('.condition').find(".current")[0];
    var id = current.getAttribute("id");
    return id;
}

function getSearchText(){
    var search = $(".search_text input").val();
    return search;
}
$(document).ready(function() {
    getMessage();

    $(".condition a").click(function() {

        $(".current").removeClass("current");
        $(this).addClass("current");
        
        var status = getCurrentStatus();
        var search = getSearchText();
        getSearchList(status,search);
    });



    $(".text").keyup(function() {
        var status = getCurrentStatus();
        var search = getSearchText();
        getSearchList(status,search);

    });







});
