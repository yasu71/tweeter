$(document).ready(() => {
  let counterValue = $(".counter").val();
  $("textarea").on("keyup", function() {
    let length = $(this).val().length;
    let counter = $(".counter")
    $(".counter").val(counterValue - length);
    if (length < 140){
      counter.css("color", "#545149"); 
    } else if (length >= 140) {
      counter.css("color", "#ff0000"); 
    } 
  })
});
