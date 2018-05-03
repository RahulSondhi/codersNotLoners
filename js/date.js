function loadDate() {
  var hash = window.location.hash;
  var parse = hash.split("-");
  var infoNeeded = [];
  infoNeeded.push(parse[1]);
  infoNeeded.push(parse[2]);
  infoNeeded.push(parse[3] + "-" + parse[4] + "-" + parse[5].replace("%20", " "));

  $.ajax({
    url: "api/index.php/checkDate"
  }).done(function(keydata) {
    var splitme = keydata.split(",")
    var dataME = splitme[0];
    var banana = splitme[1];

    $.ajax({
      url: "api/index.php/getDate/" + infoNeeded[0] + "/" + infoNeeded[1] + "/" + infoNeeded[2]
    }).done(function(data) {
      var dateInfo = JSON.parse(data);
      var dateInfo1 = dateInfo[0];
      ogranizeDateInfo(dateInfo[0], infoNeeded);

      if(banana == "Manager"||banana == "CustRep"){
        $("#DateSaveButton").removeClass("NoUsable");
        $("#DateCancelButton").removeClass("NoUsable");
        $("#DateReceiptButton").removeClass("NoUsable");

        $("#dateLocation").prop("readonly", false);
        $("#dateBookingFee").prop("readonly", false);
        $("#dateCustRep").prop("readonly", true);
        $("#dateRatingPerson1").prop("readonly", false);
        $("#dateRatingPerson2").prop("readonly", false);
      }else{
        if(dataME==dateInfo1.Profile1 || dataME==dateInfo1.Profile1 ){
          $("#DateSaveButton").removeClass("NoUsable");
          $("#DateCancelButton").removeClass("NoUsable");
          $("#DateReceiptButton").addClass("NoUsable");

          $("#dateLocation").prop("readonly", false);
          $("#dateBookingFee").prop("readonly", false);
          $("#dateCustRep").prop("readonly", true);
          if(dataME==dateInfo1.Profile1){
            $("#dateRatingPerson1").prop("readonly", false);
            $("#dateRatingPerson2").prop("readonly", true);
          }else{
            $("#dateRatingPerson1").prop("readonly", true);
            $("#dateRatingPerson2").prop("readonly", false);
          }

        }else{
          $("#DateSaveButton").addClass("NoUsable");
          $("#DateCancelButton").addClass("NoUsable");
          $("#DateReceiptButton").addClass("NoUsable");

          $("#dateLocation").prop("readonly", true);
          $("#dateBookingFee").prop("readonly", true);
          $("#dateCustRep").prop("readonly", true);
          $("#dateRatingPerson1").prop("readonly", true);
          $("#dateRatingPerson2").prop("readonly", true);
        }
      }

      $("#DateCancelButton").click(function(){
        DateCancel(infoNeeded);
      });

      $("#DateSaveButton").click(function(){
        DateSave(infoNeeded);
      });

      $("#DateReceiptButton").click(function(){
        DateReceipt(infoNeeded);
      });

    });
  });
}

function DateCancel(infoNeeded){
  $.ajax({
    url: "api/index.php/removeDate/" + infoNeeded[0] + "/" + infoNeeded[1] + "/" + infoNeeded[2]
  }).done(function(data) {
    if(data=='"Valid"'){
      window.location.hash = "search";
    }
  });
}

function DateSave(infoNeeded){
  var toSend = {};
  toSend.Location = $("#dateLocation").val();
  toSend.BookingFee = $("#dateBookingFee").val();
  // toSend.CustRep = $("#dateCustRep").val();
  toSend.dateRatingPerson1 = $("#dateRatingPerson1").val();
  toSend.dateRatingPerson2 = $("#dateRatingPerson2").val();
  $.ajax({
    type: "post",
    data: JSON.stringify(toSend),
    dataType: "json",
    url: "api/index.php/saveDate/" + infoNeeded[0] + "/" + infoNeeded[1] + "/" + infoNeeded[2]
  }).done(function(data) {
    loadDate();
  });
}

function DateReceipt(infoNeeded){
  $.ajax({
    url: "api/index.php/getDate/" + infoNeeded[0] + "/" + infoNeeded[1] + "/" + infoNeeded[2]
  }).done(function(data) {
    var dateInfo = JSON.parse(data);
    var dateInfo1 = dateInfo[0];
    console.log(dateInfo1);
    $.ajax({
      url: "api/index.php/checkDate"
    }).done(function(keydata) {
      var splitme = keydata.split(",")
      var dataME = splitme[0];
      var banana = splitme[1];

      if(banana == "Manager"){
        window.location.hash = "manage";
        $("#contentPanelManageListHolderText").val("Profile1|Profile2|Location|Time|CustRep|BookingFee,"+dateInfo1.Profile1+"|"+dateInfo1.Profile2+"|"+dateInfo1.Location+"|"+dateInfo1.Date_Time+"|"+dateInfo1.CustRep+"|"+dateInfo1.BookingFee);
      }
    });
  });
}

function ogranizeDateInfo(info, infoNeeded) {
  $("#dateProfile1").val(info.Profile1);
  $("#dateProfile2").val(info.Profile2);
  $("#dateCustRep").val(info.CustRep);
  $("#dateLocation").val(info.Location);
  $("#dateTiming").val(info.Date_Time);
  $("#dateBookingFee").val(info.BookingFee);
  addComments(info.Comments, infoNeeded);
  $("#dateRatingPerson1").val(info.User1Rating);
  $("#dateRatingPerson2").val(info.User2Rating);
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
