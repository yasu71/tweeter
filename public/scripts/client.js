/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  
  $(".compose-toggle-button").on("click", () => {
    $(".new-tweet").slideToggle();
    $("#tweet-text").focus();
  });

  const renderTweets = (tweets) => {
    $('#tweets-container').empty();
    const $tweetsContainer = $("#tweets-container");
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  };

  const createTweetElement = (tweet) => {
    const $img = $("<img>").attr("src", tweet.user.avatars);
    const $profileImage = $("<div>").addClass("profile-image").append($img);
    const $profileName = $("<div>").addClass("profile-name").text(tweet.user.name);
    const $tweetProfile = $("<div>").addClass("tweet-profile").append($profileImage, $profileName);
    const $handle = $("<div>").addClass("handle").text(tweet.user.handle);
    const $header = $("<header>").append($tweetProfile, $handle);
    const $tweetContent = $("<div>").addClass("tweet-content").text(tweet.content.text);
    const $firstIcon = $("<i>").addClass("fab fa-font-awesome-flag");
    const $firstList = $("<li>").append($firstIcon);
    const $secondIcon = $("<i>").addClass("fas fa-retweet");
    const $secondList = $("<li>").append($secondIcon);
    const $thirdIcon = $("<i>").addClass("fas fa-heart");
    const $thirdList = $("<li>").append($thirdIcon);
    const $ul = $("<ul>").append($firstList, $secondList, $thirdList);
    const $iconDiv = $("<div>").append($ul);
    const $createdAt = $("<div>").addClass("posted-date");

    const date = new Date();
    const currentDate = date.getTime();
    const dateDifference = Math.floor((currentDate - tweet.created_at) / 1000 / 60 / 60 / 24);
    $createdAt.text(`${dateDifference} days ago`);

    const $footer = $("<footer>").append($createdAt, $iconDiv);
    const $article = $("<article>").append($header, $tweetContent, $footer);

    return $article;
  };

  const clearErrors = () => {
    $(".error-over-texts").hide();
    $(".error-no-tweet").hide();
  };

  const clearButtonFocus = () => {
    $("button").blur();
  };

  const $form = $("form");
  
  $form.on("submit", () => {
    event.preventDefault();
    clearErrors();
    const formData = $form.serialize();
    if (!$("#tweet-text").val()) {
      $(".error-no-tweet").slideDown();
      clearButtonFocus();
      return;
    }
    if ($("#tweet-text").val().length > 140) {
      $(".error-over-texts").slideDown();
      clearButtonFocus();
      return;
    }
    $.post("/tweets", formData)
      .then((res) => {
        $("#tweet-text").val("");
        $(".counter").val(140).css("color", "#545454");
        clearButtonFocus();

        loadtweets();
      });
  });

  const loadtweets = () => {
    $.get("/tweets")
      .then((data) => {
        renderTweets(data);
      });
  };

  loadtweets();

});