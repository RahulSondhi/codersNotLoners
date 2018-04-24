function loadProfile(name) {
  $.ajax({
    url: "api/index.php/getProfile/" + name
  }).done(function(data) {
    organizeProfile(JSON.parse(data));
    $.ajax({
      url: "api/index.php/getLikes/" + name
    }).done(function(data2) {
      organizeProfileLikes(JSON.parse(data2));
      $.ajax({
        url: "api/index.php/getDates/" + name
      }).done(function(data3) {
        organizeProfileDates(JSON.parse(data3));
        $("#contentPanelProfile").removeClass("hidden");
        if(name == "me"){
          $("#contentPanelProfile_Interactions").removeClass("hidden");
          $("#contentPanelProfile_InteractionsDate").addClass("NoUsable");
          $("#contentPanelProfile_InteractionsLike").addClass("NoUsable");
          $("#contentPanelProfile_InteractionsRefer").addClass("NoUsable");
        }else{
          $("#contentPanelProfile_Interactions").removeClass("hidden");
          $("#contentPanelProfile_InteractionsDate").removeClass("NoUsable");
          $("#contentPanelProfile_InteractionsLike").removeClass("NoUsable");
          $("#contentPanelProfile_InteractionsRefer").removeClass("NoUsable");
        }
      });
    });
  });
}

function organizeProfile(profData) {
  console.log(profData);
  if (profData.M_F == "Male") {
    $("#contentPanelProfile_ProfileSex").html("/M");
    $("#contentPanelProfile_ProfilePic").attr("src", "media/men.svg");
  } else {
    $("#contentPanelProfile_ProfileSex").html("/F");
    $("#contentPanelProfile_ProfilePic").attr("src", "media/women.svg");
  }

  $("#contentPanelProfile_ProfileName").html(profData.ProfileID);
  $("#contentPanelProfile_ProfileAge").html(profData.Age);
  var hobbies = profData.Hobbies.split(",")
  $("#contentPanelProfile_centerBoxHobbiesContent").html("");
  for(var i =0; i < hobbies.length;i++){
    $("#contentPanelProfile_centerBoxHobbiesContent").append(hobbies[i]+"<br>");
  }
  $("#contentPanelProfile_centerBoxCharacteristicsContent").html(
    "Height: " + profData.Height + " feet<br>Hair Color: " + profData.HairColor + "<br>Weight: " + profData.Weight + " lbs"
  );
}

function organizeProfileLikes(likeData) {
  $("#contentPanelProfile_RightBarLikesContent").html("");
  for(var i = 0;i < likeData.length;i++){
    var time = likeData[i].Date_Time.split(" ");
    var like = "<div class='likeContainer'><div class='likeContainer2'><div class='liker'>"+likeData[i].Liker+"</div><div class='likelike'> -> </div><div class='likee'>"+likeData[i].Likee+"</div></div><div class='likedate'>"+time[0]+" @ "+time[1]+"</div></div>"
    $("#contentPanelProfile_RightBarLikesContent").append(like);
  }
}

function organizeProfileDates(dateData){
  $("#contentPanelProfile_RightBarDatesPastContent").html("");
  $("#contentPanelProfile_RightBarDatesPendingContent").html("");
  var time = new Date();
  var prev = [];
  var future = [];
  for (var i = 0;i<dateData.length;i++){
    var datetime = dateData[i].Date_Time.split(" ");
    var date = "<div class='profdateContainer' onclick='{window.location.hash = "+'"'+"date-"+dateData[i].Profile1+"-"+dateData[i].Profile2+"-"+dateData[i].Date_Time+'"'+"; updateUrl();}'><div class='profdateContainer2'><div class='profdateprofile1'>"+dateData[i].Profile1+"</div><div class='profdatedates'> + </div><div class='profdateprofile2'>"+dateData[i].Profile2+"</div></div><div class='profdatedate'>"+datetime[0]+" @ "+datetime[1]+"</div></div>"

    if(Date.parse(time) > Date.parse(dateData[i].Date_Time)){
      $("#contentPanelProfile_RightBarDatesPastContent").append(date);
    }else{
      $("#contentPanelProfile_RightBarDatesPendingContent").append(date);
    }
  }
}
