$(document).ready(function () {
//Takes in the text from the form and passes it to a function without reloading the page
$(".new-tweet form").on('submit', function (e) {
  e.preventDefault()

  let tweetBody = $('#newTweet textarea[name="tweetText"]').val();
  if (!tweetBody) {
   alert("You cant tweet nothing!");
   return;
  }
  postNewTweet(tweetBody);
});

//slides new tweet bar into view
$("#nav-bar .compose").on('click', function (event) {
   $(".new-tweet").slideToggle("slow", () => {
     if($(".new-tweet").is(':visible')) {
       $(".new-tweet textarea").focus();
     }
  });
})

//stages the tweets to be rendered after clearing the
const loadTweets = function () {
  $.get("/tweets", renderTweets);
};

//adds tweetText to /tweets to be rendered by loadTweets function
const postNewTweet = function (tweetBody) {
  let tweetText = {
      text: tweetBody
  };
  $.post("/tweets", tweetText, loadTweets)

  //clear the form after submit
  $(".new-tweet form textarea").val("");
};

// RENDERS THE TWEET OBJECTS
const renderTweets = function (data) {
  var $tweetFeed = $(".tweetFeed").empty();
  for (let tweet of data) {
    let $tweetElement = createTweetElement(tweet);

      $tweetFeed.prepend($tweetElement);
  }
};

//ALL FUNCTIONS REGARDING BUILDING THE TWEET OBJECT

//creates the header element for the tweet
const createHeader = function (tweet){
  let $header = $('<header>').addClass('tweet-header');
  let $img = $('<img src=' + tweet.user.avatars.small + '>');
  let $h2 = $('<h2>' + tweet.user.name + '</h2>');
  let $p = $('<p>' + tweet.user.handle + '</p>');

  $header.append($img).append($h2).append($p)
  return $header;
};
//creates the footer element for the tweet
const createFooter = function (tweet){
  let timePosted = tweet.created_at / 1000;
  let $footer = $('<footer>').addClass('tweet-footer')
  let $p = $('<p data-livestamp=' + timePosted + '></p>')
  let $footerIcons = $('<div>').addClass("footer-icons ")
  $footerIcons.append('<i id="flag"class="material-icons">flag</i>')
              .append('<i id="sync"class="material-icons">sync</i>')
              .append('<i id="fav" class="material-icons">favorite</i>')

  $footer.append($p).append($footerIcons).append('<div class="clearfix">')
  return $footer;
};

$('#fav').on('click', function(){
  console.log(1);
})

//creates the main article elements for the tweet
const createTweetElement = function (tweet) {
  let $tweet = $("<article>");

  let $header = createHeader(tweet);
  $tweet.append($header).append("<div class='tweet-body clearfix'><p>" + tweet.content.text);

  let $footer = createFooter(tweet).appendTo($tweet);

  return $tweet;
};
loadTweets();
});
