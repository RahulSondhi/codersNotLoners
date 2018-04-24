$(function() {

  $("#SearchRequest").on("change", function(e) {
    searchProf($("#SearchRequest").val());
  });

  $("#SearchRequestButton").on("click", function(e) {
    searchProf($("#SearchRequest").val());
  });
});


function searchProf(e) {
  $("#contentPanelSearchContent").html("");
  if (e.replace(/\s/g, '') == "") {
    $.ajax({
      url: "api/index.php/searchAll"
    }).done(function(data) {
      printSearch(JSON.parse(data));
    })
  } else {
    $.ajax({
      url: "api/index.php/search/" + e
    }).done(function(data) {
      printSearch(JSON.parse(data));
    })
  }
}

function printSearch(data){
  for(var i = 0; i < data.length; i++){

    var pic = "";
    var sex = "";

    if(data[i].M_F == "Female"){
      pic = "<img src='media/women.svg' id='contentPanelProfile_ProfilePic'>";
      sex = "/F";
    }else{
      pic = "<img src='media/men.svg' id='contentPanelProfile_ProfilePic'>";
      sex = "/M"
    }
    console.log(data[i])
    var search = "<div class='searchContainer'><div class ='searchProfPic'>"+pic+"</div><div class ='searchProfName'>"+data[i].ProfileID+"</div><div class ='searchProfAge'>"+data[i].Age+sex+"</div></div>";
    $("#contentPanelSearchContent").append(search);
  }
}
