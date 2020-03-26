/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    const $tweetsContainer = $("#tweets-container");
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    } 
  };

  const createTweetElement = function(tweet) {
    const $img = $("<img>").attr("src", tweet.user.avatars);
    const $profileImage = $("<div>").addClass("profile-image").append($img);
    const $profileName = $("<div>").addClass("profile-name").text(tweet.user.name);
    const $tweetProfile = $("<div>").addClass("tweet-profile").append($profileImage, $profileName);
    const $tweetUserName = $("<div>").addClass("user-name").text(tweet.user.handle);
    const $header = $("<header>").append($tweetProfile, $tweetUserName);
    const $tweetContent = $("<div>").addClass("tweet-content").text(tweet.content.text);
    const $firstIcon = $("<i>").addClass("fab fa-font-awesome-flag");
    const $firstList = $("<li>").append($firstIcon);
    const $secondIcon = $("<i>").addClass("fas fa-retweet");
    const $secondList = $("<li>").append($secondIcon);
    const $thirdIcon = $("<i>").addClass("fas fa-heart");
    const $thirdList = $("<li>").append($thirdIcon);
    const $ul = $("<ul>").append($firstList, $secondList, $thirdList)
    const $iconDiv = $("<div>").append($ul);
    let $createdAt = $("<div>").addClass("posted-date");

    let date = new Date();
    let currentDate = date.getTime();
    let dateDifference = Math.floor((currentDate - tweet.created_at)/1000/60/60/24);
    $createdAt.text(`${dateDifference} days ago`);

    const $footer = $("<footer>").append($createdAt, $iconDiv);
    const $article = $("<article>").append($header, $tweetContent, $footer);

    return $article;
  };

  const clearErrors = function () {
    $(".error-over-texts").hide();
    $(".error-no-tweet").hide();
  };

  const $form = $("form");
  
  $form.on("submit", () => {
    event.preventDefault();
    clearErrors();
    const formData = $form.serialize();
    if (!$("#tweet-text").val()) {
      $(".error-no-tweet").slideDown();
      return;
    } 
    if ($("#tweet-text").val().length > 140){
      $(".error-over-texts").slideDown();
      return;
    } 
    $.post("/tweets", formData)
      .then((res) => {
        $("#tweet-text").val("");
        loadtweets();
      });
  });

  const loadtweets = () => {
    $.get("/tweets")
      .then((data) => {
        renderTweets(data);
      });;
  };

  loadtweets();

});