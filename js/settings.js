function createProfile() {
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
  } else if ($("#profileCreatorSex").val() == "f" || $("#profileCreatorSex").val() == "F") {
    profile.Sex = "Female";
  } else {
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
    if (profile.Age >= 18) {
      $("#profileCreatorAge").removeClass("blink");
    } else {
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

  if (profile.Sex == "None") {
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
  $("#accountCreatorCity").val("");
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

function loadSettings() {
  var info = (window.location.hash).split("-");
  var who = {};
  who.customer = "me";
  who.profile = "me";

  if (info.length > 3) {
    if (info[1].replace(/\s/g, '') != "" && info[2].replace(/\s/g, '') != "" && info[3].replace(/\s/g, '') != "" && info[4].replace(/\s/g, '') != "") {
      who.customer = info[1];
      who.profile = info[2]+"-"+info[3]+"-"+info[4];
    }
  }else if (info.length > 2){
    if (info[1].replace(/\s/g, '') != "" && info[2].replace(/\s/g, '') != "") {
      who.customer = info[1];
      who.profile = info[2];
    }
  }

  $.ajax({
    url: "api/index.php/getSettings/" + who.customer + "/" + who.profile
  }).done(function(data) {
    var keydata = JSON.parse(data);
    var helpme = window.location.hash;
    var killme = helpme.split("-");
    if(killme[1] == undefined){
      switch(keydata[0]){
        case "1": killme[1] = "customer"; break;
        case "2": killme[1] = "CustRep"; break;
        case "3": killme[1] = "Manager"; break;
      }
    }
    switch (keydata[0]) {
      case "0":
        window.location.hash = 'setting';
        break;
      case "1":
        $("#saveSettingsButton").removeClass("NoUsable");
        $("#deleteAccountButton").removeClass("NoUsable");
        $("#deleteProfileButton").removeClass("NoUsable");
        $("#contentPanelSettingsProfile").removeClass("hidden");
        $("#contentPanelSettingsEmployee").addClass("hidden");
        organizeSettings(killme[1], (keydata[3])[0], keydata[2]);
        break;
      case "2":
        $("#deleteProfileButton").addClass("NoUsable");
        $("#contentPanelSettingsEmployee").removeClass("hidden");
        $("#contentPanelSettingsProfile").addClass("hidden");
        if ((keydata[1] == 'CustRep' && keydata[2] == true) || keydata[1] == 'Manager') {
          $("#saveSettingsButton").removeClass("NoUsable");
          $("#deleteAccountButton").removeClass("NoUsable");
        } else {
          $("#saveSettingsButton").addClass("NoUsable");
          $("#deleteAccountButton").addClass("NoUsable");
        }
        organizeSettings(killme[1], (keydata[3])[0], keydata[2]);
        break;
      case "3":
        $("#contentPanelSettingsProfile").addClass("hidden");
        $("#contentPanelSettingsEmployee").removeClass("hidden");
        $("#deleteProfileButton").addClass("NoUsable");
        $("#deleteAccountButton").addClass("NoUsable");
        if (keydata[1] == 'Manager') {
          $("#saveSettingsButton").removeClass("NoUsable");
          $("#deleteAccountButton").removeClass("NoUsable");
        } else {
          $("#saveSettingsButton").addClass("NoUsable");
          $("#deleteAccountButton").addClass("NoUsable");
        }
        organizeSettings(killme[1], (keydata[3])[0], keydata[2]);
        break;
    }
    $("#contentPanelSettingsContainer").animate({
      scrollTop: 0
    }, "fast");
  });
}

function organizeSettings(level, data, me) {
  $("#SettingsSSN").val(data.SSN);
  $("#SettingsPassword").val(data.Password);
  $("#SettingsFirstName").val(data.FirstName);
  $("#SettingsLastName").val(data.LastName);
  $("#SettingsEmail").val(data.Email);
  $("#SettingsStreet").val(data.Street);
  $("#SettingsCity").val(data.City);
  $("#SettingsState").val(data.State);
  $("#SettingsZip").val(parseInt(data.Zipcode));
  $("#SettingsTelephone").val(data.Telephone);
  console.log(level)
  switch (level) {
    case "customer":
      $("#SettingsProfileID").val(data.ProfileID);
      $("#SettingsAgeRangeStart").val(parseInt(data.DatingAgeRangeStart));
      $("#SettingsAgeRangeEnd").val(parseInt(data.DatingAgeRangeEnd));
      $("#SettingsHobbies").val(data.Hobbies);
      $("#SettingsAge").val(parseInt(data.Age));
      $("#SettingsSex").val(data.M_F);
      $("#SettingsGeorange").val(parseInt(data.DatinGeoRange));
      $("#SettingsHeight").val(parseInt(data.Height));
      $("#SettingsWeight").val(parseInt(data.Weight));
      $("#SettingsHairColor").val(data.HairColor);
      $("#SettingsCardnum").val(parseInt(data.CardNumber));
      $("#SettingsAcctnum").val(parseInt(data.AcctNum));
      $("#SettingsPPP option[value='" + data.PPP + "']").prop('selected', true);
      $("#deleteProfileButton").off();
      ////////////////////////////////////////////
      $("#deleteProfileButton").click(function(){
        $.ajax({
          url: "api/index.php/deleteProfile/"+data.ProfileID+"/"+data.SSN
        }).done(function(keydata) {
          var logout = JSON.parse(keydata);
          if (logout){
            $("#navbarLogOut").click();
          }else{
            window.location.hash = 'search';
          }
        });
      });
      ///////////////////////////////////////////
      $("#deleteAccountButton").click(function(){
        $.ajax({
          url: "api/index.php/getProfiles"
        }).done(function(datas) {
          var profiles = JSON.parse(datas);

          for (var i = 0; i < profiles.length; i++){
            $.ajax({
              url: "api/index.php/deleteProfile/"+profiles[i].ProfileID+"/"+data.SSN
            }).done(function(keydata) {
              var logout = JSON.parse(keydata);
              console.log(logout);
            });
          }

          $.ajax({
            url: "api/index.php/deleteAccount/"+data.SSN
          }).done(function(keydata) {
            var logout = JSON.parse(keydata);
            if (logout){
              // $("#navbarLogOut").click();
            }else{
              window.location.hash = 'search';
            }
          });
        });
      });
      ////////////////////////////////////////////
      $("#saveSettingsButton").click(function(){
        var toSend = {};
        toSend.admin="no";
        toSend.SSN = $("#SettingsSSN").val();
        toSend.Password = $("#SettingsPassword").val();
        toSend.Email = $("#SettingsEmail").val();
        toSend.Street = $("#SettingsStreet").val();
        toSend.City = $("#SettingsCity").val();
        toSend.State = $("#SettingsState").val();
        toSend.Zipcode = $("#SettingsZip").val();
        toSend.Telephone = $("#SettingsTelephone").val();

        toSend.ProfileID = $("#SettingsProfileID").val();
        toSend.DatingAgeRangeStart = $("#SettingsAgeRangeStart").val();
        toSend.DatingAgeRangeEnd = $("#SettingsAgeRangeEnd").val();
        toSend.Hobbies = $("#SettingsHobbies").val();
        toSend.Age = $("#SettingsAge").val();
        toSend.DatinGeoRange = $("#SettingsGeorange").val();
        toSend.Height = $("#SettingsHeight").val();
        toSend.Weight = $("#SettingsWeight").val();
        toSend.HairColor = $("#SettingsHairColor").val();
        toSend.PPP = $("#SettingsPPP").val();

        $.ajax({
          type: "post",
          url: "api/index.php/saveSettings",
          data: JSON.stringify(toSend),
          dataType: "json"
        }).done(function(banana) {
          console.log(banana);
        });
      });
      break;
    case "CustRep":
      $("#SettingsStartDate").val(data.StartDate);
      $("#SettingsHourlyRate").val(data.HourlyRate);
      $("#SettingsHourlyRate").prop("readonly", true);
      $("#SettingsRole option[value='" + data.Role + "']").prop('selected', true);
      $("#SettingsRole").attr("disabled", true);
      $("#deleteAccountButton").click(function(){});
      $("#saveSettingsButton").click(function(){
        var toSend = {};
        toSend.admin="yes";
        toSend.SSN = $("#SettingsSSN").val();
        toSend.Password = $("#SettingsPassword").val();
        toSend.Email = $("#SettingsEmail").val();
        toSend.Street = $("#SettingsStreet").val();
        toSend.City = $("#SettingsCity").val();
        toSend.State = $("#SettingsState").val();
        toSend.Zipcode = $("#SettingsZip").val();
        toSend.Telephone = $("#SettingsTelephone").val();

        toSend.StartDate = $("#SettingsStartDate").val();
        toSend.HourlyRate = $("#SettingsHourlyRate").val();

        $.ajax({
          type: "post",
          url: "api/index.php/saveSettings",
          data: JSON.stringify(toSend),
          dataType: "json"
        }).done(function(banana) {
          console.log(banana);
        });
      });
      break;
    case "Manager":
      $("#SettingsStartDate").val(data.StartDate);
      $("#SettingsHourlyRate").val(data.HourlyRate);
      $("#SettingsHourlyRate").prop("readonly", false);
      $("#SettingsRole option[value='" + data.Role + "']").prop('selected', true);
      $("#SettingsRole").attr("disabled", false);
      $("#saveSettingsButton").click(function(){
        var toSend = {};
        toSend.admin="yes";
        toSend.SSN = $("#SettingsSSN").val();
        toSend.Password = $("#SettingsPassword").val();
        toSend.Email = $("#SettingsEmail").val();
        toSend.Street = $("#SettingsStreet").val();
        toSend.City = $("#SettingsCity").val();
        toSend.State = $("#SettingsState").val();
        toSend.Zipcode = $("#SettingsZip").val();
        toSend.Telephone = $("#SettingsTelephone").val();

        toSend.StartDate = $("#SettingsStartDate").val();
        toSend.HourlyRate = $("#SettingsHourlyRate").val();

        $.ajax({
          type: "post",
          url: "api/index.php/saveSettings",
          data: JSON.stringify(toSend),
          dataType: "json"
        }).done(function(banana) {
          console.log(banana);
        });
      });
      break;
  }
}
