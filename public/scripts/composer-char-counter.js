$(document).ready(() => {
  const counterValue = $(".counter").val();
  $("textarea").on("keyup", function() {
    const length = $(this).val().length;
    const counter = $(".counter");
    $(".counter").val(counterValue - length);
    if (length <= 140) {
      counter.css("color", "#545149");
    } else if (length > 140) {
      counter.css("color", "#ff0000");
    }
  });
});
