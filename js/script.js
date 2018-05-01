$(function () {
    startEmUp();

    $(window).on("unload", function (e) {
        updateUrl();
    });

    $(window).on('hashchange', function () {
        updateUrl();
    });
});

function startEmUp() {
    $.ajax({
        url: "api/index.php/startEmUp"
    }).done(function (data) {
        console.log(data);
        setSky();
        setNavbar();
        reloadUpdate();
        initLogIn();
    })
}

function initLogIn() {
  $("#logInButton").click(function() {

    if ($("#logInUsername").val()){
      var toSend = {};
      toSend.username = $("#logInUsername").val();
      toSend.password = $("#logInPassword").val();
      $.ajax({
        type: "post",
        url: "api/index.php/login",
        data: JSON.stringify(toSend),
        dataType: "json"
      }).done(function(banana) {
        if (banana == false){
          console.log("Unvalid")
        } else {
          if(banana == "customer"){
            openProfileSelection();
          }else{
            unhideNav(true);
            window.location.hash = "manage";
            updateUrl();
          }
        }
      });
    }

  });

}

function redoLogin(){
  $("#logInTitle").html("Log In");
  $("#logInHolder").removeClass("hidden");
  $("#profileLogInHolder").addClass("hidden");
}

function openProfileSelection(){
  $("#profileLogInHolder").html(" ");
  $.ajax({
    url: "api/index.php/getProfiles"
  }).done(function(data) {
      $("#logInTitle").html("Profiles");
      $("#logInHolder").addClass("hidden");
      $("#profileLogInHolder").removeClass("hidden");

      var profiles = JSON.parse(data);
      for(var i = 0; i < profiles.length; i++){
        var photo = "";
        if (profiles[i].M_F == "Male") {
          photo = "media/men.svg";
        } else {
          photo = "media/women.svg";
        }
        var hi = profiles[i].ProfileID;
        var profile = "<div class='profileLogIn' onclick='{logInProfile("+'"'+hi+'"'+")}'><img src='"+photo+"' class='profileLogInPhoto'><div class='profileLogInName'>"+profiles[i].ProfileID+"</div></div>";
        $("#profileLogInHolder").append(profile);
      }
      $("#profileLogInHolder").append("<div class='profileLogIn'><img src='media/add.svg' class='profileLogInPhotoADD'><div class='profileLogInName'>"+"New Account"+"</div></div>");

  });
}

function createAccount(){
  console.log("CREATE ME")
  $("#logInHolder").addClass("hidden");
  $("#logInTitle").html("Create Account");

  $("#profileCreatorSSN").html(" ");
  $("#profileCreatorPassword").html(" ");
  $("#profileCreatorFirstName").html(" ");
  $("#profileCreatorLastName").html(" ");
  $("#profileCreatorEmail").html(" ");
  $("#profileCreatorStreet").html(" ");
  $("#profileCreatorState").html(" ");
  $("#profileCreatorZip").html(" ");
  $("#profileCreatorTelephone").html(" ");

  $("#createAccountButton").click(function(){
    submitNewAccount();
  });
  $("#profileCreator").removeClass("hidden");
}

function submitNewAccount(){
  var profile = {};
  var submit = true;
  profile.SSN = $("#profileCreatorSSN").val();
  profile.Password = $("#profileCreatorPassword").val();
  profile.FirstName = $("#profileCreatorFirstName").val();
  profile.LastName = $("#profileCreatorLastName").val();
  profile.Email = $("#profileCreatorEmail").val();
  profile.Street = $("#profileCreatorStreet").val();
  profile.City = $("#profileCreatorCity").val();
  profile.State = $("#profileCreatorState").val();
  profile.Zip = $("#profileCreatorZip").val();
  profile.Telephone = $("#profileCreatorTelephone").val();

  if(profile.SSN == 0 || profile.SSN.replace(/\s/g, '') == ""){
    submit = false;
    $("#profileCreatorSSN").addClass("blink");
  }else{
    $("#profileCreatorSSN").removeClass("blink");
  }

  if(profile.Password.replace(/\s/g, '') == ""){
    submit = false;
    $("#profileCreatorPassword").addClass("blink");
  }else{
    $("#profileCreatorPassword").removeClass("blink");
  }

  if(profile.FirstName.replace(/\s/g, '') == ""){
    submit = false;
    $("#profileCreatorFirstName").addClass("blink");
  }else{
    $("#profileCreatorFirstName").removeClass("blink");
  }

  if(profile.LastName.replace(/\s/g, '') == ""){
    submit = false;
    $("#profileCreatorLastName").addClass("blink");
  }else{
    $("#profileCreatorLastName").removeClass("blink");
  }

  if(profile.Email.replace(/\s/g, '') == ""){
    submit = false;
    $("#profileCreatorEmail").addClass("blink");
  }else{
    $("#profileCreatorEmail").removeClass("blink");
  }

  if(profile.Street.replace(/\s/g, '') == ""){
    submit = false;
    $("#profileCreatorStreet").addClass("blink");
  }else{
    $("#profileCreatorStreet").removeClass("blink");
  }

  if(profile.City.replace(/\s/g, '') == ""){
    submit = false;
    $("#profileCreatorCity").addClass("blink");
  }else{
    $("#profileCreatorCity").removeClass("blink");
  }

  if(profile.State.replace(/\s/g, '') == ""){
    submit = false;
    $("#profileCreatorState").addClass("blink");
  }else{
    $("#profileCreatorState").removeClass("blink");
  }

  if(profile.Zip.replace(/\s/g, '') == ""){
    submit = false;
    $("#profileCreatorZip").addClass("blink");
  }else{
    $("#profileCreatorZip").removeClass("blink");
  }

  if(profile.Telephone.replace(/\s/g, '') == ""){
    submit = false;
    $("#profileCreatorTelephone").addClass("blink");
  }else{
    $("#profileCreatorTelephone").removeClass("blink");
  }

  if (submit) {
    $.ajax({
      type: "post",
      url: "api/index.php/makeAccount",
      data: JSON.stringify(profile),
      dataType: "json"
    }).done(function(banana) {
      console.log(banana);
    });
  }
}

function logInProfile(profile){
  var toSend = {};
  toSend.username = profile;
  $.ajax({
    type: "post",
    url: "api/index.php/loginProfile",
    data: JSON.stringify(toSend),
    dataType: "json"
  }).done(function(banana) {
    if (banana == false){
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
      if(banana == "customer"){
        openProfileSelection();
      }else{
        unhideNav(true);
        window.location.hash = "manage";
        updateUrl();
      }
    }else if (data == 2){
      unhideNav(false);
      if (window.location.hash == "" || window.location.hash == "#") {
        window.location.hash = "profile";
        updateUrl();
      } else {
        updateUrl()
      }
    }else {
      hideAllPages();
      window.location.hash = "";
    }
  })

}

function unhideNav(admin) {
  $("#contentPanel").removeClass("hidden");
  $("#navbar").removeClass("hidden");

  if(admin){
    $("#navbarProfile").addClass("hidden");
    $("#navbarManage").removeClass("hidden");
  }else{
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
    $("#navbarManage").click(function () {
        window.location.hash = "manage";
    });
    $("#navbarSearch").click(function () {
        window.location.hash = "search";
    });
    $("#navbarProfile").click(function () {
        window.location.hash = "profile";
    });
    $("#navbarSetting").click(function () {
        window.location.hash = "setting";
    });
    $("#navbarLogOut").click(function () {
        logout();
    });
}


function logout() {
    $.ajax({
        url: "api/index.php/logout"
    }).done(function (data) {
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
    window.setTimeout(function () {
        setSky();
    }, 6000);
}
