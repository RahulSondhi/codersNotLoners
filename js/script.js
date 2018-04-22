$(function() {
  startEmUp();

  $(window).on("unload", function(e) {
      updateUrl();
  });

  $(window).on('hashchange', function() {
  updateUrl();
});
});

function startEmUp() {
  $.ajax({
    url: "api/index.php/startEmUp"
  }).done(function(data) {
    console.log(data);
    setSky();
    setNavbar();
    reloadUpdate();
    initLogIn();
  })
}

function initLogIn() {
  $("#logInButton").click(function() {

    if ($("#logInUsername").val()) {

      var toSend = {};
      toSend.username = $("#logInUsername").val();

      $.ajax({
        type: "post",
        url: "api/index.php/login",
        data: JSON.stringify(toSend),
        dataType: "json"
      }).done(function(banana) {
        if (banana == true) {
          console.log("Valid");
          unhideNav();
          window.location.hash = "profile";
          updateUrl();
        } else {
          console.log("Unvalid")
        }
      });
    }
  });

}

function reloadUpdate() {

  $.ajax({
    url: "api/index.php/loggedin"
  }).done(function(data) {
    console.log(data);
    if (data == 1) {
      if (window.location.hash == "" || window.location.hash == "#") {
        hideAllPages();
      } else {
        updateUrl()
      }
      unhideNav();
    } else {
      hideAllPages();
      window.location.hash = "";
    }
  })
}

function unhideNav() {
  $("#contentPanel").removeClass("hidden");
  $("#navbar").removeClass("hidden");
  $("#logIn").addClass("hidden");
}

function hideNav() {
  $("#contentPanel").addClass("hidden");
  $("#navbar").addClass("hidden");
  $("#logIn").removeClass("hidden");
}

function hideAllPages() {
  $("#contentPanelProfile").removeClass("hidden");
  $("#contentPanelSettings").removeClass("hidden");
  $("#contentPanelSearch").removeClass("hidden");
  $("#contentPanelDate").removeClass("hidden");
  $("#contentPanelManage").removeClass("hidden");
  $("#contentPanelProfile").addClass("hidden");
  $("#contentPanelSettings").addClass("hidden");
  $("#contentPanelSearch").addClass("hidden");
  $("#contentPanelDate").addClass("hidden");
  $("#contentPanelManage").addClass("hidden");
}

function setNavbar() {
  $("#navbarManage").click(function() {
    window.location.hash = "manage";
    updateUrl();
  });
  $("#navbarSearch").click(function() {
    window.location.hash = "search";
    updateUrl();
  });
  $("#navbarProfile").click(function() {
    window.location.hash = "profile";
    updateUrl();
  });
  $("#navbarSetting").click(function() {
    window.location.hash = "setting";
    updateUrl();
  });
  $("#navbarLogOut").click(function() {
    logout();
  });
}

function logout() {
  $.ajax({
    url: "api/index.php/logout"
  }).done(function(data) {
    hideNav();
    reloadUpdate();
  })
}

function updateUrl() {
  var hash = window.location.hash;
  var parse = hash.split("-");
  hideAllPages();
  switch (parse[0]) {
    case "#manage":
      $("#contentPanelManage").removeClass("hidden");
      break;
    case "#search":
      $("#contentPanelSearch").removeClass("hidden");
      break;
    case "#date":
      $("#contentPanelDate").removeClass("hidden");
      break;
    case "#setting":
      $("#contentPanelSettings").removeClass("hidden")
      break;
    case "#profile":
      if (parse[1]) {
        loadProfile(parse[1])
      } else {
        loadProfile("me");
      }
      break;
    default:
      break;
  }
}

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
  for(var i =0; i < hobbies.length;i++){
    $("#contentPanelProfile_centerBoxHobbiesContent").append(hobbies[i]+"<br>");
  }
  $("#contentPanelProfile_centerBoxCharacteristicsContent").html(
    "Height: " + profData.Height + "feet<br>Hair Color: " + profData.HairColor + "<br>Weight: " + profData.Weight
  );
}

function organizeProfileLikes(likeData) {
  for(var i = 0;i < likeData.length;i++){
    var time = likeData[i].Date_Time.split(" ");
    var like = "<div class='likeContainer'><div class='likeContainer2'><div class='liker'>"+likeData[i].Liker+"</div><div class='likelike'> -> </div><div class='likee'>"+likeData[i].Likee+"</div></div><div class='likedate'>"+time[0]+" @ "+time[1]+"</div></div>"
    $("#contentPanelProfile_RightBarLikesContent").append(like);
  }
}

function organizeProfileDates(dateData){
  console.log(dateData);
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

function setSky() {
  $("#content").addClass("sky-gradient-" + new Date().getHours());
  window.setTimeout(function() {
    setSky();
  }, 6000);
}
