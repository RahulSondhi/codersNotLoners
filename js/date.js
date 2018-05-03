function loadDate() {
  var hash = window.location.hash;
  var parse = hash.split("-");
  var infoNeeded = [];
  infoNeeded.push(parse[1]);
  infoNeeded.push(parse[2]);
  infoNeeded.push(parse[3] + "-" + parse[4] + "-" + parse[5].replace("%20", " "));

  $.ajax({
    url: "api/index.php/getDate/" + infoNeeded[0] + "/" + infoNeeded[1] + "/" + infoNeeded[2]
  }).done(function(data) {
    var dateInfo = JSON.parse(data);
    ogranizeDateInfo(dateInfo[0], infoNeeded);
  });
  
}

function ogranizeDateInfo(info, infoNeeded) {
  $("#DateProfile1").html("Person 1: " + info.Profile1);
  $("#DateProfile2").html("Person 2: " + info.Profile2);
  $("#DateCustRep").html("Customer Rep: " + info.CustRep);
  $("#DateLocation").html("Location: " + info.Location);
  $("#DateTiming").html("Time: " + info.Date_Time);
  $("#DateBookingFee").html("Fee: $" + info.BookingFee);
  addComments(info.Comments, infoNeeded);
  $("#DateRatingPerson1").html("Rating Person 1: " + info.User1Rating + "/5");
  $("#DateRatingPerson2").html("Rating Person 2: " + info.User2Rating + "/5");
}

function addComments(data, infoNeeded) {
  $("#DateCommentsContent").html(" ");
  var comments = data.split(";");
  for (var i = 0; i < comments.length; i++) {
    var comment = "<div class='comment'> >'" + comments[i] + "'</div>";
    $("#DateCommentsContent").append(comment);
  }
  $("#DateCommentsContent").scrollTop($("#DateCommentsContent")[0].scrollHeight);
  $("#DateCommentsComment").off();
  $("#DateCommentsComment").on("change", function(e) {
    $("#DateCommentsComment").off();
    submitComment(data, infoNeeded);
  });
}


function submitComment(data, infoNeeded) {
  var comment = data + ";" + $("#DateCommentsComment").val();
  comment = comment.replace("%20", " ");
  $.ajax({
    url: "api/index.php/addComment/" + infoNeeded[0] + "/" + infoNeeded[1] + "/" + infoNeeded[2] + "/" + comment
  }).done(function(data) {
    var dateInfo = JSON.parse(data);
    $("#DateCommentsComment").val("");
    ogranizeDateInfo(dateInfo[0], infoNeeded);
  });
}
