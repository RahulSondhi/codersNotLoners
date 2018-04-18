$(function() {
  setSky();
  setNavbar();
  reloadUpdate();
});

function reloadUpdate(){
  if(window.location.hash == "" || window.location.hash == "#"){
    hideAllPages();
  }else{
    updateUrl()
  }
}

function hideAllPages(){
  $("#contentPanelProfile").removeClass("hidden");
  $("#contentPanelSettings").removeClass("hidden");
  $("#contentPanelSearch").removeClass("hidden");
  $("#contentPanelDate").removeClass("hidden");
  $("#contentPanelManage").removeClass("hidden");
  $("#contentPanelProfile").addClass("hidden");
  $("#contentPanelSettings").addClass("hidden");
  $("#contentPanelSearch").addClass("hidden");
  $("#contentPanelDate").addClass("hidden");
  $("#contentPanelManage").addClass("hidden");
}

function setNavbar(){
  $("#navbarManage").click(function(){
    window.location.hash = "manage";
    updateUrl();
  });
  $("#navbarSearch").click(function(){
    window.location.hash = "search";
    updateUrl();
  });
  $("#navbarProfile").click(function(){
    window.location.hash = "profile";
    updateUrl();
  });
  $("#navbarSetting").click(function(){
    window.location.hash = "setting";
    updateUrl();
  });
}

function updateUrl(){
  var hash = window.location.hash;
  var parse = hash.split("-");
  hideAllPages();
  switch(parse[0]){
    case "#manage":
      $("#contentPanelManage").removeClass("hidden");
      break;
    case "#search":
      $("#contentPanelSearch").removeClass("hidden");
      break;
    case "#date":
      $("#contentPanelDate").removeClass("hidden");
      break;
    case "#setting":
      $("#contentPanelSettings").removeClass("hidden")
      break;
    case "#profile":
      $("#contentPanelProfile").removeClass("hidden");
      break;
    default: break;
  }
}

function setSky() {
  $("#content").addClass("sky-gradient-"+new Date().getHours());
  window.setTimeout(function() {
      setSky();
  }, 6000);
}
