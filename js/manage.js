function initManage(){
  cleanManage();

  $("#mailingListButton").click(function(){
     getMailingList()
  });

  $("#salesReportButton").click(function(){
    getSalesReport();
  });

  $("#dateDaysButton").click(function(){
    getDateDayRanking();
  });

  $("#revenueSummaryUserButton").click(function(){
    getRevenueSummary(true);
  });

  $("#revenueSummaryDateButton").click(function(){
    getRevenueSummary(false);
  });
}

function cleanManage(){
  $.ajax({
    url: "api/index.php/loggedin"
  }).done(function(keydata) {
    var splitme = keydata.split(",")
    var data = splitme[0];
    var banana = splitme[1];
    console.log(banana)

    if(banana == "Manager"){
      $("#contentPanelManageButtonHolder").removeClass("hidden");
      $("#contentPanelManageManager").removeClass("hidden");
    }else if(banana == "CustRep"){
      $("#contentPanelManageButtonHolder").removeClass("hidden");
      $("#contentPanelManageManager").addClass("hidden");
    }else{
      $("#contentPanelManageButtonHolder").addClass("hidden");
    }

    $("#manageSalesReport").val("");
    $("#manageDateSuggestions").val("");
    $("#manageRevenueSummaryUser").val("");
    $("#manageRevenueSummaryDate").val("");
  });
}

function getMailingList(){
  $.ajax({
    url: "api/index.php/getMailList"
  }).done(function(data) {
    var email = JSON.parse(data);
    var send = "Email,";

    for(var i = 0;i<email.length;i++){
      var obj = email[i];
      if(i < email.length-1){
        send += (obj.Email+",");
      }else{
        send += (obj.Email);
      }
    }
    printManageOut(send);
  });
}

function getSalesReport(){
  console.log($("#manageSalesReport").val())
  if($("#manageSalesReport").val() != ""){
    var value = $("#manageSalesReport").val();
    var parse = value.split("-");
    $.ajax({
      url: "api/index.php/getSalesReport/"+parse[1]+"/"+parse[0]
    }).done(function(data) {
      var sales = JSON.parse(data);
      var send = "Profile1|Profile2|Date|Price,";

      for(var i = 0;i<sales.length;i++){
        var obj = sales[i];
        if(i < sales.length-1){
          send += (obj.Profile1+"|"+obj.Profile2+"|"+obj.Date_Time+"|"+obj.BookingFee+",");
        }else{
          send += (obj.Profile1+"|"+obj.Profile2+"|"+obj.Date_Time+"|"+obj.BookingFee);
        }
      }
      printManageOut(send);
    });
  }else{
    $("#manageSalesReport").addClass("blink");
  }
}

function getDateDayRanking(){
  $.ajax({
    url: "api/index.php/getDateDayRanking"
  }).done(function(data) {
    var day = JSON.parse(data);
    var send = "Date:Frequency,";

    for(var i = 0;i<day.length;i++){
      var obj = day[i];
      if(i < day.length-1){
        send += (obj["Date(Date_Time)"]+":"+obj.frequency+",");
      }else{
        send += (obj["Date(Date_Time)"]+":"+obj.frequency);
      }
    }
    printManageOut(send);
  });
}

function getRevenueSummary(user){
  var person = $("#manageRevenueSummaryUser").val();
  var date = $("#manageRevenueSummaryDate").val();
  if(user){
    $.ajax({
      url: "api/index.php/getRevenueSummary/person/"+person
    }).done(function(data) {
      var sales = JSON.parse(data);
      var send = "Profile1|Profile2|Date|Place|Price,";

      for(var i = 0;i<sales.length;i++){
        var obj = sales[i];
        if(i < sales.length-1){
          send += (obj.Profile1+"|"+obj.Profile2+"|"+obj.Date_Time+"|"+obj.Location+"|"+obj.BookingFee+",");
        }else{
          send += (obj.Profile1+"|"+obj.Profile2+"|"+obj.Date_Time+"|"+obj.Location+"|"+obj.BookingFee);
        }
      }
      printManageOut(send);
    });
  }else{
    $.ajax({
      url: "api/index.php/getRevenueSummary/date/"+date
    }).done(function(data) {
      var sales = JSON.parse(data);
      var send = "Profile1|Profile2|Date|Place|Price,";

      for(var i = 0;i<sales.length;i++){
        var obj = sales[i];
        if(i < sales.length-1){
          send += (obj.Profile1+"|"+obj.Profile2+"|"+obj.Date_Time+"|"+obj.Location+"|"+obj.BookingFee+",");
        }else{
          send += (obj.Profile1+"|"+obj.Profile2+"|"+obj.Date_Time+"|"+obj.Location+"|"+obj.BookingFee);
        }
      }
      printManageOut(send);
    });
  }
}

function printManageOut(printME){
  $("#contentPanelManageListHolderText").val(" ");
  $("#contentPanelManageListHolderText").val(printME);
}
