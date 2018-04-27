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
        setManagementPages();
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
  }).done(function(data) {
    console.log(data);
    redoLogin();
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

function unhideNav(admin) {
  $("#contentPanel").removeClass("hidden");
  $("#navbar").removeClass("hidden");

  if(admin){
    $("#navbarProfile").addClass("hidden");
  }else{
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
        updateUrl();
    });
    $("#navbarSearch").click(function () {
        window.location.hash = "search";
        updateUrl();
    });
    $("#navbarProfile").click(function () {
        window.location.hash = "profile";
        updateUrl();
    });
    $("#navbarSetting").click(function () {
        window.location.hash = "setting";
        updateUrl();
    });
    $("#navbarLogOut").click(function () {
        logout();
    });
}

function setManagementPages() {
    $("#getSalesReportButton").click(function () {
        window.location.hash = "getSalesReport";
        updateUrl();
    });
    $("#listAllUsersButton").click(function () {
        window.location.hash = "listAllUsers";
        updateUrl();
    });
    $("#searchEmployeeButton").click(function () {
        window.location.hash = "searchEmployee";
        updateUrl();
    });
    $("#searchDateButton").click(function () {
        window.location.hash = "searchDate";
        updateUrl();
    });
    $("#searchRevenueGeneratedButton").click(function () {
        window.location.hash = "searchRevenueGenerated";
        updateUrl();
    });
    $("#employeeMostRevenueButton").click(function () {
        window.location.hash = "employeeMostRevenue";
        updateUrl();
    });
    $("#peopleWhoHaveGoneOutWithButton").click(function () {
        window.location.hash = "peopleWhoHaveGoneOutWith";
        updateUrl();
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
