$(function() {

  $("#SearchRequest").on("change", function(e) {
    setSearch()
  });

  $("#SearchRequestButton").on("click", function(e) {
    setSearch()
  });
});

function setSearch(){
  var search = $("#SearchRequest").val();
  var height = $("#HeightRequest").val();
  var hair = $("#HairRequest").val();
  var hobby = $("#HobbyRequest").val();
  var zip = $("#ZipRequest").val();

  window.location.hash = "search-search:" + search + "-height:" + height + "-hair:" + hair + "-hobby:" + hobby + "-zip:" + zip;
}

function searchProf(query) {
  var search = "";
  var height = "";
  var hair = "";
  var hobby = "";
  var zip = "";

  for(var i = 1; i < query.length; i++){
    var parse = query[i].split(":");
    switch(parse[0]){
      case "search":
        search = parse[1];
        break;
      case "height":
        height = parse[1];
        break;
      case "hair":
        hair = parse[1];
        break;
      case "hobby":
        hobby = parse[1];
        break;
      case "zip":
        zip = parse[1];
        break;
    }
  }

  if (search.replace(/\s/g, '') == "") {
    $.ajax({
      url: "api/index.php/searchAll"
    }).done(function(data) {
      printSearch(JSON.parse(data));
    })
  } else {
    $.ajax({
      url: "api/index.php/search/" + search
    }).done(function(data) {
      printSearch(JSON.parse(data));
    })
  }

  $("#SearchRequest").val(search);
  $("#HeightRequest").val(height);
  $("#HairRequest").val(hair);
  $("#HobbyRequest").val(hobby);
  $("#ZipRequest").val(zip);
}

function printSearch(data) {
  $("#contentPanelSearchContent").html("");
  console.log(data)
  if (data != "Unvalid") {
    $.ajax({
      url: "api/index.php/getProfile/me"
    }).done(function(keydata) {
      keydata = JSON.parse(keydata);
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
