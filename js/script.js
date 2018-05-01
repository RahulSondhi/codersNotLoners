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
      toSend.password = $("#logInPassword").val();
      $.ajax({
        type: "post",
        url: "api/index.php/login",
        data: JSON.stringify(toSend),
        dataType: "json"
      }).done(function(banana) {
        if (banana == false) {
          console.log("Unvalid")
        } else {
          if (banana == "customer") {
            openProfileSelection();
          } else {
            unhideNav(true);
            window.location.hash = "manage";
            updateUrl();
          }
        }
      });
    }

  });

}

function redoLogin() {
  $("#logInTitle").html("Log In");
  $("#logInHolder").removeClass("hidden");
  $("#profileLogInHolder").addClass("hidden");
  $("#accountCreator").addClass("hidden");
  $("#profileCreator").addClass("hidden");
}

function openProfileSelection() {
  $("#profileLogInHolder").html(" ");
  $.ajax({
    url: "api/index.php/getProfiles"
  }).done(function(data) {
    $("#logInTitle").html("Profiles");
    $("#logInHolder").addClass("hidden");
    $("#profileCreator").addClass("hidden");
    $("#profileLogInHolder").removeClass("hidden");

    var profiles = JSON.parse(data);
    for (var i = 0; i < profiles.length; i++) {
      var photo = "";
      if (profiles[i].M_F == "Male") {
        photo = "media/men.svg";
      } else {
        photo = "media/women.svg";
      }
      var hi = profiles[i].ProfileID;
      var profile = "<div class='profileLogIn' onclick='{logInProfile(" + '"' + hi + '"' + ")}'><img src='" + photo + "' class='profileLogInPhoto'><div class='profileLogInName'>" + profiles[i].ProfileID + "</div></div>";
      $("#profileLogInHolder").append(profile);
    }
    $("#profileLogInHolder").append("<div class='profileLogIn' onclick='{createProfile();}'><img src='media/add.svg' class='profileLogInPhotoADD'><div class='profileLogInName'>" + "New Account" + "</div></div>");

  });
}


function createProfile() {
  console.log("CREATE ME")
  $("#profileLogInHolder").addClass("hidden");
  $("#logInTitle").html("Create Profile");

  $("#profileCreatorProfileID").val("");
  $("#profileCreatorAgeRangeStart").val("");
  $("#profileCreatorAgeRangeEnd").val("");
  $("#profileCreatorHobbies").val("");
  $("#profileCreatorAge").val("");
  $("#profileCreatorSex").val("");
  $("#profileCreatorGeorange").val("");
  $("#profileCreatorHeight").val("");
  $("#profileCreatorWeight").val("");
  $("#profileCreatorHairColor").val("");
  $("#profileCreatorCardnum").val("");
  $("#profileCreatorAcctnum").val("");

  $("#createProfileButton").click(function() {
    submitNewProfile();
  });

  $("#profileCreator").removeClass("hidden");
}

function submitNewProfile() {
  var profile = {};
  var submit = true;

  profile.ProfileID = $("#profileCreatorProfileID").val();
  profile.AgeRangeStart = $("#profileCreatorAgeRangeStart").val();
  profile.AgeRangeEnd = $("#profileCreatorAgeRangeEnd").val();
  profile.Hobbies = $("#profileCreatorHobbies").val();
  profile.Age = $("#profileCreatorAge").val();
  if ($("#profileCreatorSex").val() == "m" || $("#profileCreatorSex").val() == "M") {
    profile.Sex = "Male";
  } else if ($("#profileCreatorSex").val() == "f" || $("#profileCreatorSex").val() == "F"){
    profile.Sex = "Female";
  }else{
    profile.Sex = "None"
  }
  profile.Georange = $("#profileCreatorGeorange").val();
  profile.Height = $("#profileCreatorHeight").val();
  profile.Weight = $("#profileCreatorWeight").val();
  profile.HairColor = $("#profileCreatorHairColor").val();
  profile.Cardnum = $("#profileCreatorCardnum").val();
  profile.Acctnum = $("#profileCreatorAcctnum").val();

  if (profile.ProfileID.replace(/\s/g, '') == "") {
    submit = false;
    $("#profileCreatorProfileID").addClass("blink");
  } else {
    $("#profileCreatorProfileID").removeClass("blink");
  }

  if (profile.AgeRangeStart.replace(/\s/g, '') == "" && profile.AgeRangeStart >= 18 && profile.AgeRangeEnd.replace(/\s/g, '') == "" && profile.AgeRangeEnd >= 18) {
    submit = false;
    $("#profileCreatorAgeRangeStart").addClass("blink");
    $("#profileCreatorAgeRangeEnd").addClass("blink");
  } else {
    if (profile.AgeRangeStart >= 18 && profile.AgeRangeEnd >= 18 && profile.AgeRangeStart <= profile.AgeRangeEnd) {
      $("#profileCreatorAgeRangeEnd").removeClass("blink");
      $("#profileCreatorAgeRangeStart").removeClass("blink");
    } else {
      submit = false;
      $("#profileCreatorAgeRangeStart").addClass("blink");
      $("#profileCreatorAgeRangeEnd").addClass("blink");
    }
  }

  if (profile.Hobbies.replace(/\s/g, '') == "") {
    submit = false;
    $("#profileCreatorHobbies").addClass("blink");
  } else {
    $("#profileCreatorHobbies").removeClass("blink");
  }

  if (profile.Age.replace(/\s/g, '') == "") {
    submit = false;
    $("#profileCreatorAge").addClass("blink");
  } else {
    if(profile.Age >= 18){
      $("#profileCreatorAge").removeClass("blink");
    }else{
      submit = false;
      $("#profileCreatorAge").addClass("blink");
    }
  }

  if (profile.Georange.replace(/\s/g, '') == "") {
    submit = false;
    $("#profileCreatorGeorange").addClass("blink");
  } else {
    $("#profileCreatorGeorange").removeClass("blink");
  }

  if (profile.Height.replace(/\s/g, '') == "") {
    submit = false;
    $("#profileCreatorHeight").addClass("blink");
  } else {
    $("#profileCreatorHeight").removeClass("blink");
  }

  if (profile.Weight.replace(/\s/g, '') == "") {
    submit = false;
    $("#profileCreatorWeight").addClass("blink");
  } else {
    $("#profileCreatorWeight").removeClass("blink");
  }

  if (profile.HairColor.replace(/\s/g, '') == "") {
    submit = false;
    $("#profileCreatorHairColor").addClass("blink");
  } else {
    $("#profileCreatorHairColor").removeClass("blink");
  }

  if (profile.Sex == "None"){
    submit = false;
    $("#profileCreatorSex").addClass("blink");
  } else {
    $("#profileCreatorSex").removeClass("blink");
  }

  if (profile.Cardnum.replace(/\s/g, '') == "") {
    submit = false;
    $("#profileCreatorCardnum").addClass("blink");
  } else {
    $("#profileCreatorCardnum").removeClass("blink");
  }

  if (profile.Acctnum.replace(/\s/g, '') == "") {
    submit = false;
    $("#profileCreatorAcctnum").addClass("blink");
  } else {
    $("#profileCreatorAcctnum").removeClass("blink");
  }

  if (submit) {
    $.ajax({
      type: "post",
      url: "api/index.php/makeProfile",
      data: JSON.stringify(profile),
      dataType: "json"
    }).done(function(banana) {
      if (banana.includes("PRIMARY") == false && banana.includes("New") == true) {
        openProfileSelection();
      } else {
        $("#profileCreator").animate({
          scrollTop: 0
        }, "fast");
        $("#profileCreatorProfileID").addClass("blink");
        $("#profileCreatorAcctnum").addClass("blink");
      }
    });
  } else {
    $("#profileCreator").animate({
      scrollTop: 0
    }, "fast");
  }
}

function createAccount() {
  $("#logInHolder").addClass("hidden");
  $("#logInTitle").html("Create Account");

  $("#accountCreatorSSN").val("");
  $("#accountCreatorPassword").val("");
  $("#accountCreatorFirstName").val("");
  $("#accountCreatorLastName").val("");
  $("#accountCreatorEmail").val("");
  $("#accountCreatorStreet").val("");
  $("#accountCreatorState").val("");
  $("#accountCreatorZip").val("");
  $("#accountCreatorTelephone").val("");

  $("#createAccountButton").click(function() {
    submitNewAccount();
  });
  $("#accountCreator").removeClass("hidden");
}

function submitNewAccount() {
  var profile = {};
  var submit = true;
  profile.SSN = $("#accountCreatorSSN").val();
  profile.Password = $("#accountCreatorPassword").val();
  profile.FirstName = $("#accountCreatorFirstName").val();
  profile.LastName = $("#accountCreatorLastName").val();
  profile.Email = $("#accountCreatorEmail").val();
  profile.Street = $("#accountCreatorStreet").val();
  profile.City = $("#accountCreatorCity").val();
  profile.State = $("#accountCreatorState").val();
  profile.Zip = $("#accountCreatorZip").val();
  profile.Telephone = $("#accountCreatorTelephone").val();

  if (profile.SSN == 0 || profile.SSN.replace(/\s/g, '') == "") {
    submit = false;
    $("#accountCreatorSSN").addClass("blink");
  } else {
    $("#accountCreatorSSN").removeClass("blink");
  }

  if (profile.Password.replace(/\s/g, '') == "") {
    submit = false;
    $("#accountCreatorPassword").addClass("blink");
  } else {
    $("#accountCreatorPassword").removeClass("blink");
  }

  if (profile.FirstName.replace(/\s/g, '') == "") {
    submit = false;
    $("#accountCreatorFirstName").addClass("blink");
  } else {
    $("#accountCreatorFirstName").removeClass("blink");
  }

  if (profile.LastName.replace(/\s/g, '') == "") {
    submit = false;
    $("#accountCreatorLastName").addClass("blink");
  } else {
    $("#accountCreatorLastName").removeClass("blink");
  }

  if (profile.Email.replace(/\s/g, '') == "") {
    submit = false;
    $("#accountCreatorEmail").addClass("blink");
  } else {
    $("#accountCreatorEmail").removeClass("blink");
  }

  if (profile.Street.replace(/\s/g, '') == "") {
    submit = false;
    $("#accountCreatorStreet").addClass("blink");
  } else {
    $("#accountCreatorStreet").removeClass("blink");
  }

  if (profile.City.replace(/\s/g, '') == "") {
    submit = false;
    $("#accountCreatorCity").addClass("blink");
  } else {
    $("#accountCreatorCity").removeClass("blink");
  }

  if (profile.State.replace(/\s/g, '') == "") {
    submit = false;
    $("#accountCreatorState").addClass("blink");
  } else {
    $("#accountCreatorState").removeClass("blink");
  }

  if (profile.Zip.replace(/\s/g, '') == "") {
    submit = false;
    $("#accountCreatorZip").addClass("blink");
  } else {
    $("#accountCreatorZip").removeClass("blink");
  }

  if (profile.Telephone.replace(/\s/g, '') == "") {
    submit = false;
    $("#accountCreatorTelephone").addClass("blink");
  } else {
    $("#accountCreatorTelephone").removeClass("blink");
  }

  if (submit) {
    $.ajax({
      type: "post",
      url: "api/index.php/makeAccount",
      data: JSON.stringify(profile),
      dataType: "json"
    }).done(function(banana) {
      if (banana.includes("PRIMARY") == false && banana.includes("New") == true) {
        redoLogin();
      } else {
        $("#accountCreator").animate({
          scrollTop: 0
        }, "fast");
        $("#accountCreatorSSN").addClass("blink");
      }
    });
  } else {
    $("#accountCreator").animate({
      scrollTop: 0
    }, "fast");
  }
}

function logInProfile(profile) {
  var toSend = {};
  toSend.username = profile;
  $.ajax({
    type: "post",
    url: "api/index.php/loginProfile",
    data: JSON.stringify(toSend),
    dataType: "json"
  }).done(function(banana) {
    if (banana == false) {
      console.log("Unvalid")
    } else {
      unhideNav(false);
      window.location.hash = "profile";
      updateUrl();
    }
  });
}

function reloadUpdate() {

  $.ajax({
    url: "api/index.php/loggedin"
  }).done(function(keydata) {
    var splitme = keydata.split(",")
    var data = splitme[0];
    var banana = splitme[1];
    redoLogin();
    if (data == 1) {
      if (banana == "customer") {
        openProfileSelection();
      } else {
        unhideNav(true);
        window.location.hash = "manage";
        updateUrl();
      }
    } else if (data == 2) {
      unhideNav(false);
      if (window.location.hash == "" || window.location.hash == "#") {
        window.location.hash = "profile";
        updateUrl();
      } else {
        updateUrl()
      }
    } else {
      hideAllPages();
      window.location.hash = "";
    }
  })

}

function unhideNav(admin) {
  $("#contentPanel").removeClass("hidden");
  $("#navbar").removeClass("hidden");

  if (admin) {
    $("#navbarProfile").addClass("hidden");
    $("#navbarManage").removeClass("hidden");
  } else {
    $("#navbarProfile").removeClass("hidden");
    $("#navbarManage").addClass("hidden");
  }

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
  $("#editEmployeePage").removeClass("hidden");

  $("#contentPanelProfile").addClass("hidden");
  $("#contentPanelSettings").addClass("hidden");
  $("#contentPanelSearch").addClass("hidden");
  $("#contentPanelDate").addClass("hidden");
  $("#contentPanelManage").addClass("hidden");
  $("#editEmployeePage").addClass("hidden");
}

function setNavbar() {
  $("#navbarManage").click(function() {
    window.location.hash = "manage";
  });
  $("#navbarSearch").click(function() {
    window.location.hash = "search";
  });
  $("#navbarProfile").click(function() {
    window.location.hash = "profile";
  });
  $("#navbarSetting").click(function() {
    window.location.hash = "setting";
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
      searchProf(parse);
      $("#contentPanelSearch").removeClass("hidden");
      break;
    case "#date":
      loadDate();
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

function setSky() {
  $("#content").addClass("sky-gradient-" + new Date().getHours());
  window.setTimeout(function() {
    setSky();
  }, 6000);
}
