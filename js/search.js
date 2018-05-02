$(function() {

  $("#SearchRequest").on("change", function(e) {
    setSearch()
  });

  $("#HeightRequest").on("change", function(e) {
    setSearch()
  });

  $("#HairRequest").on("change", function(e) {
    setSearch()
  });

  $("#HobbyRequest").on("change", function(e) {
    setSearch()
  });

  $("#ZipRequest").on("change", function(e) {
    setSearch()
  });

  $("#SearchRequestButton").on("click", function(e) {
    setSearch()
  });

  $('#EmployeeRequest').change(function() {
    var cb = $(this);
    cb.val(cb.prop('checked'));
    setSearch();
  });
});

function setSearch() {
  var search = $("#SearchRequest").val();
  var height = $("#HeightRequest").val();
  var hair = $("#HairRequest").val();
  var hobby = $("#HobbyRequest").val();
  var zip = $("#ZipRequest").val();

  if ($('#EmployeeRequest').val() == "true") {
    window.location.hash = "search-employee-search:" + search;
  } else {
    window.location.hash = "search-search:" + search + "-height:" + height + "-hair:" + hair + "-hobby:" + hobby + "-zip:" + zip;
  }
}

function initSearch(query) {
  $.ajax({
    url: "api/index.php/getPermission"
  }).done(function(permission) {
    var person = JSON.parse(permission);
    if (person == "Manager" || person == "CustRep") {
      $("#EmployeeRequest").removeClass("hidden");
      $("#EmployeeRequestTitle").removeClass("hidden");
      if (query[1] == "employee") {
        $('#EmployeeRequest').prop('checked', true);
        $('#EmployeeRequest').val($('#EmployeeRequest').prop('checked'));
        searchEmployee(query);
      } else {
        searchProf(query);
      }
    } else {
      $("#EmployeeRequest").addClass("hidden");
      $("#EmployeeRequestTitle").addClass("hidden");
      searchProf(query);
    }
  });
}

function searchEmployee(query) {
  if(query[2] != undefined){
    var search = "-1";
    var parse = query[2].split(":");
    if (parse[1].replace(/\s/g, '') != "") {
      search = parse[1];
    }

    $.ajax({
      url: "api/index.php/searchEmployee/" + search
    }).done(function(data) {
      printSearch(JSON.parse(data),true);
    })

    if (search != "-1") {
      $("#SearchRequest").val(search);
    }
  }
}

function searchProf(query) {
  var search = "-1";
  var height = "-1";
  var hair = "-1";
  var hobby = "-1";
  var zip = "-1";

  for (var i = 1; i < query.length; i++) {
    var parse = query[i].split(":");
    switch (parse[0]) {
      case "search":
        if (parse[1].replace(/\s/g, '') != "") {
          search = parse[1];
        }
        break;
      case "height":
        if (parse[1].replace(/\s/g, '') != "") {
          height = parse[1];
        }
        break;
      case "hair":
        if (parse[1].replace(/\s/g, '') != "") {
          hair = parse[1];
        }
        break;
      case "hobby":
        if (parse[1].replace(/\s/g, '') != "") {
          hobby = parse[1];
        }
        break;
      case "zip":
        if (parse[1].replace(/\s/g, '') != "") {
          zip = parse[1];
        }
        break;
    }

    $.ajax({
      url: "api/index.php/search/" + search + "/" + height + "/" + hair + "/" + hobby + "/" + zip
    }).done(function(data) {
      printSearch(JSON.parse(data),false);
    })

    if (search != "-1") {
      $("#SearchRequest").val(search);
    }
    if (height != "-1") {
      $("#HeightRequest").val(height);
    }
    if (hair != "-1") {
      $("#HairRequest").val(hair);
    }

    if (hobby != "-1") {
      $("#HobbyRequest").val(hobby);
    }

    if (zip != "-1") {
      $("#ZipRequest").val(zip);
    }
  }
}

function printSearch(data,employee) {
  if (data != "Unvalid") {
    $.ajax({
      url: "api/index.php/getPermission"
    }).done(function(permission) {
      var person = JSON.parse(permission);
      if (person == null) {
        $.ajax({
          url: "api/index.php/getProfile/me"
        }).done(function(keydata) {
          keydata = JSON.parse(keydata);
          $("#contentPanelSearchContent").html(" ");
          for (var i = 0; i < data.length; i++) {
            if (searchFits(keydata, data[i]) == true) {
              var pic = "";
              var sex = "";

              if (data[i].M_F == "Female") {
                pic = "<img src='media/women.svg' id='contentPanelProfile_ProfilePic'>";
                sex = "/F";
              } else {
                pic = "<img src='media/men.svg' id='contentPanelProfile_ProfilePic'>";
                sex = "/M"
              }
              var search = "<div class='searchContainer' onclick='{window.location.hash = " + '"' + "profile-" + data[i].ProfileID + '"' + "; updateUrl();}'><div class ='searchProfPic'>" + pic + "</div><div class ='searchProfName'>" + data[i].ProfileID + "</div><div class ='searchProfAge'>" + data[i].Age + sex + "</div></div>";
              $("#contentPanelSearchContent").append(search);
            }
          }
        });
      } else {
        if(employee != true){
        $("#contentPanelSearchContent").html(" ");
        for (var i = 0; i < data.length; i++) {
          var pic = "";
          var sex = "";

          if (data[i].M_F == "Female") {
            pic = "<img src='media/women.svg' id='contentPanelProfile_ProfilePic'>";
            sex = "/F";
          } else {
            pic = "<img src='media/men.svg' id='contentPanelProfile_ProfilePic'>";
            sex = "/M"
          }
          var search = "<div class='searchContainer' onclick='{window.location.hash = " + '"' + "profile-" + data[i].ProfileID + '"' + "; updateUrl();}'><div class ='searchProfPic'>" + pic + "</div><div class ='searchProfName'>" + data[i].ProfileID + "</div><div class ='searchProfAge'>" + data[i].Age + sex + "</div></div>";
          $("#contentPanelSearchContent").append(search);
        }

      }else{
        $("#contentPanelSearchContent").html(" ");
        for (var i = 0; i < data.length; i++) {
          var pic = "<img src='media/employee.svg' id='contentPanelProfile_ProfilePic'>";
          var type = "";
          if(data[i].Role == "Manager"){
            type = "Manage"
          }else if(data[i].Role == "CustRep"){
            type = "CusRep"
          }

          var search = "<div class='searchContainer' onclick='{window.location.hash = " + '"' + "setting-" + data[i].Role + "-"+data[i].SSN+'"' + "; updateUrl();}'><div class ='searchProfPic'>" + pic + "</div><div class ='searchProfName'>" + data[i].FirstName + " " + data[i].LastName + "</div><div class ='searchProfAge'>" + type + "</div></div>";
          $("#contentPanelSearchContent").append(search);
        }
      }
    }
    });
  }
}

function searchFits(current, search) {
  if (current.ProfileID == search.ProfileID) {
    return false;
  }

  if (search.Age < current.DatingAgeRangeStart) {
    return false;
  }

  if (search.Age > current.DatingAgeRangeEnd) {
    return false;
  }

  return true;
}
