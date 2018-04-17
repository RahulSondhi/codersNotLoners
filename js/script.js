$(function() {

  setSky();

});

function setSky() {
  $("#content").addClass("sky-gradient-"+new Date().getHours());
  window.setTimeout(function() {
      setSky();
  }, 6000);
}
