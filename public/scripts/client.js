/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1585033200000
    // Mar 24, 2020
  }
];

const renderTweets = function(tweets) {
  const $tweetsContainer = $('#tweets-container');
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.append($tweet);
  } 
};

const createTweetElement = function(tweet) {
  const $img = $('<img>').attr('src', tweet.user.avatars);
  const $profileImage = $('<div>').addClass('profile-image').append($img);
  const $profileName = $('<div>').addClass('profile-name').text(tweet.user.name);
  const $tweetProfile = $('<div>').addClass('tweet-profile').append($profileImage, $profileName);
  const $tweetUserName = $('<div>').addClass('user-name').text(tweet.user.handle);
  const $header = $('<header>').append($tweetProfile, $tweetUserName);
  const $tweetContent = $('<div>').addClass('tweet-content').text(tweet.content.text);
  const $firstIcon = $('<i>').addClass('fab fa-font-awesome-flag');
  const $firstList = $('<li>').append($firstIcon);
  const $secondIcon = $('<i>').addClass('fas fa-retweet');
  const $secondList = $('<li>').append($secondIcon);
  const $thirdIcon = $('<i>').addClass('fas fa-heart');
  const $thirdList = $('<li>').append($thirdIcon);
  const $ul = $('<ul>').append($firstList, $secondList, $thirdList)
  const $iconDiv = $('<div>').append($ul);
  let $createdAt = $('<div>').addClass('posted-date');
  let date = new Date();
  let currentDate = date.getTime();
  let dateDifference = Math.floor((currentDate - tweet.created_at)/1000/60/60/24);
  $createdAt.text(`${dateDifference} days ago`);
  const $footer = $('<footer>').append($createdAt, $iconDiv);
  const $article = $('<article>').append($header, $tweetContent, $footer);

  const $form = $('form');
  const $tweetButton = $('#submit-tweet');

  // $.ajax({
  //   type: 'GET',
  //   url: '/api/posts',
  //   success: (data) => { console.log(data) },
  //   error: () => { console.error('something bad happened') }
  // });

  $tweetButton.click(() => {
    $.getJSON('/tweet') 
      .then((data) => {
        console.log(data);
      })
  });

  // $.getJSON(`/${tweet.user.name}`)
  // .then((user) => {
  //   const $footer = $('<footer>').text(`${user.name} (${user.email})`);
  //   $article.append($header, $body, $footer);
  //   $postContainer.append($article);
  // });
  
  return $article;
  
}

renderTweets(data);

});