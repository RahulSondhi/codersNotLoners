$(function() {

  $("#SearchRequest").on("change", function(e) {
      searchProf($("#SearchRequest").val());
  });

  $("#SearchRequestButton").on("click", function(e) {
      searchProf($("#SearchRequest").val());
  });
});


function searchProf(e){
  console.log(e);
  $("#contentPanelSearchContent").html("");

  $.ajax({
    url: "api/index.php/search/"+e
  }).done(function(data) {
    console.log(data);
  })
}
