$(document).ready(() => {
  $("textarea").on("keyup", function() {
    let maxLength = 140;
    // let length = 1;
    let length = $(this).val().length;
    length = maxLength - length;
    let remainNumber = $(".button-counter-container > output");
    if (length < 0) {
      remainNumber.text(length);
      remainNumber.css("color", "#ff0000"); 
    } else if (length >= 0){
      remainNumber.text(length); 
      remainNumber.css("color", "#545149"); 
    }
  })
});