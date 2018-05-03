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
        $("#contentPanelProfile_centerBoxHobbies").removeClass("hidden");
        $("#contentPanelProfile_centerBoxCharacteristics").removeClass("hidden");
        $("#contentPanelProfile_centerBoxDateMake").addClass("hidden");
        if (name == "me") {
          $("#contentPanelProfile_Interactions").removeClass("hidden");
          $("#contentPanelProfile_InteractionsDate").addClass("NoUsable");
          $("#contentPanelProfile_InteractionsLike").addClass("NoUsable");
          $("#contentPanelProfile_InteractionsRefer").addClass("NoUsable");
        } else {
          $("#contentPanelProfile_Interactions").removeClass("hidden");
          $("#contentPanelProfile_InteractionsDate").removeClass("NoUsable");
          $("#contentPanelProfile_InteractionsLike").removeClass("NoUsable");
          $("#contentPanelProfile_InteractionsRefer").removeClass("NoUsable");
          setupProfileButtons(name);
        }
      });
    });
  });
}

function setupProfileButtons(name) {
  $("#contentPanelProfile_InteractionsLike").click(function() {
    likeProfile(name);
  });

  $("#contentPanelProfile_InteractionsDate").click(function() {
    makeDateProfile(name);
    $("#contentPanelProfile_centerBoxHobbies").addClass("hidden");
    $("#contentPanelProfile_centerBoxCharacteristics").addClass("hidden");
    $("#DateMakeCustRep").removeClass("hidden");
    $("#DateMakeLocation").removeClass("hidden");
    $("#DateMakeBookingFee").removeClass("hidden");
    $("#DateMakeButton").removeClass("hidden");
    $("#ReferMakeButton").addClass("hidden");
    $("#contentPanelProfile_centerBoxDateMake").removeClass("hidden");
  });

  $("#contentPanelProfile_InteractionsRefer").click(function() {
    makeDateProfile("");
    $("#contentPanelProfile_centerBoxHobbies").addClass("hidden");
    $("#contentPanelProfile_centerBoxCharacteristics").addClass("hidden");
    $("#DateMakeCustRep").addClass("hidden");
    $("#DateMakeLocation").addClass("hidden");
    $("#DateMakeBookingFee").addClass("hidden");
    $("#DateMakeButton").addClass("hidden");
    $("#ReferMakeButton").removeClass("hidden");
    $("#contentPanelProfile_centerBoxDateMake").removeClass("hidden");
  });

  $("#DateMakeButton").click(function() {
    var toSend = {}
    toSend.profile1 = $("#dateMakeProfile1").val();
    toSend.Location = $("#dateMakeLocation").val();
    toSend.BookingFee = $("#dateMakeBookingFee").val();
    toSend.customerRep = $("#dateMakeCustRep").val();

      $.ajax({
        type: "post",
        url: "api/index.php/makeDate",
        data: JSON.stringify(toSend),
        dataType: "json"
      }).done(function(banana) {
        console.log(banana)
        $("#contentPanelProfile_centerBoxHobbies").removeClass("hidden");
        $("#contentPanelProfile_centerBoxCharacteristics").removeClass("hidden");
        $("#contentPanelProfile_centerBoxDateMake").addClass("hidden");
      });
  });

  $("#ReferMakeButton").click(function() {
    var toSend = {}
    toSend.profile1 = $("#dateMakeProfile1").val();
    toSend.profile2 = $("#dateMakeProfile2").val();

      $.ajax({
        url: "api/index.php/makeRefer/"+toSend.profile1+"/"+toSend.profile2,
      }).done(function(banana) {
        console.log(banana)
        $("#contentPanelProfile_centerBoxHobbies").removeClass("hidden");
        $("#contentPanelProfile_centerBoxCharacteristics").removeClass("hidden");
        $("#contentPanelProfile_centerBoxDateMake").addClass("hidden");
      });
  });

  $.ajax({
    url: "api/index.php/loggedin"
  }).done(function(keydata) {
    var splitme = keydata.split(",")
    var data = splitme[0];
    var banana = splitme[1];
    if (banana == "Manager" || banana == "CustRep") {
      $("#contentPanelProfile_InteractionsSettings").removeClass("hidden");
      $("#contentPanelProfile_InteractionsSettings").click(function() {
        window.location.hash = 'setting-customer-' + name;
      });
    } else {
      $("#contentPanelProfile_InteractionsSettings").addClass("hidden");
    }
  });
}

function makeDateProfile(name) {
  if (name == "") {
    //Testing Portion
    $("#dateMakeProfile1").val("DesiraeBerg");
    $("#dateMakeProfile2").val("Brenna_Berlin");
    $("#dateMakeLocation").val("Jasmine");
    $("#dateMakeBookingFee").val(69);
    $("#dateMakeCustRep").val("222-22-2222");
    $("#DateMakeProfile2").removeClass("hidden");
    //////////////////
  } else {
    //Testing Portion
    $("#dateMakeProfile1").val(name);
    $("#dateMakeProfile2").val("ME");
    $("#dateMakeLocation").val("Jasmine");
    $("#dateMakeBookingFee").val(69);
    $("#dateMakeCustRep").val("222-22-2222");
    $("#DateMakeProfile2").addClass("hidden");
    //////////////////
  }

  $("#contentPanelProfile_centerBoxHobbies").removeClass("hidden");
  $("#contentPanelProfile_centerBoxCharacteristics").removeClass("hidden");
  $("#contentPanelProfile_centerBoxDateMake").addClass("hidden");
}

function likeProfile(name) {
  $.ajax({
    url: "api/index.php/likeProfile/" + name
  }).done(function(data) {
    if (data == "Like") {
      $.ajax({
        url: "api/index.php/getLikes/" + name
      }).done(function(data2) {
        organizeProfileLikes(JSON.parse(data2));
        $("#contentPanelProfile_InteractionsLike").addClass("heart");
        $("#contentPanelProfile_InteractionsLike").off();
        $("#contentPanelProfile_InteractionsLike").html("Liked");
        setTimeout(function() {
          $("#contentPanelProfile_InteractionsLike").html("Like");
          $("#contentPanelProfile_InteractionsLike").removeClass("heart");
          setupProfileButtons(name);
        }, 5000);
      });
    }
  });
}

function organizeProfile(profData) {
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
  for (var i = 0; i < hobbies.length; i++) {
    $("#contentPanelProfile_centerBoxHobbiesContent").append(hobbies[i] + "<br>");
  }
  $("#contentPanelProfile_centerBoxCharacteristicsContent").html(
    "Height: " + profData.Height + " feet<br>Hair Color: " + profData.HairColor + "<br>Weight: " + profData.Weight + " lbs"
  );
}

function organizeProfileLikes(likeData) {
  $("#contentPanelProfile_RightBarLikesContent").html("");
  for (var i = 0; i < likeData.length; i++) {
    var time = likeData[i].Date_Time.split(" ");
    var like = "<div class='likeContainer'><div class='likeContainer2'><div class='liker'>" + likeData[i].Liker + "</div><div class='likelike'> -> </div><div class='likee'>" + likeData[i].Likee + "</div></div><div class='likedate'>" + time[0] + " @ " + time[1] + "</div></div>"
    $("#contentPanelProfile_RightBarLikesContent").append(like);
  }
}

function organizeProfileDates(dateData) {
  $("#contentPanelProfile_RightBarDatesPastContent").html("");
  $("#contentPanelProfile_RightBarDatesPendingContent").html("");
  var time = new Date();
  var prev = [];
  var future = [];
  for (var i = 0; i < dateData.length; i++) {
    var datetime = dateData[i].Date_Time.split(" ");
    var date = "<div class='profdateContainer' onclick='{window.location.hash = " + '"' + "date-" + dateData[i].Profile1 + "-" + dateData[i].Profile2 + "-" + dateData[i].Date_Time + '"' + "; updateUrl();}'><div class='profdateContainer2'><div class='profdateprofile1'>" + dateData[i].Profile1 + "</div><div class='profdatedates'> + </div><div class='profdateprofile2'>" + dateData[i].Profile2 + "</div></div><div class='profdatedate'>" + datetime[0] + " @ " + datetime[1] + "</div></div>"

    if (Date.parse(time) > Date.parse(dateData[i].Date_Time)) {
      $("#contentPanelProfile_RightBarDatesPastContent").append(date);
    } else {
      $("#contentPanelProfile_RightBarDatesPendingContent").append(date);
    }
  }
}
