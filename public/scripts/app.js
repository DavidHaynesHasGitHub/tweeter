

//Takes in the text from the form and passes it to a function without reloading the page
$(".new-tweet form").on('submit', function (e) {
  e.preventDefault()

  let tweetBody = $('#newTweet textarea[name="tweetText"]').val();

  if (!tweetBody) {
   alert("You cant tweet nothing!");
   return;
  };
  postNewTweet(escape(tweetBody));
});

//prevents malicious code from being inserted with the user tweet
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//stages the tweets to be rendered after clearing the
let loadTweets = function () {
  $.get("/tweets", function (data) {
    $("tweetFeed").remove();
      renderTweets(data);
  });
};

//adds tweetText to /tweets to be rendered by loadTweets function
let postNewTweet = function (tweetBody) {
  let tweetText = {
      text: tweetBody
  };

  $.post("/tweets", tweetText, function (data) {
    loadTweets();
  });

  //clear the form after submit
  $(".new-tweet form textarea").val("");
};

// RENDERS THE TWEET OBJECTS
let renderTweets = function (data) {
  for (let tweet of data) {
    let $tweetElement = createTweetElement(tweet);
    $(".tweetFeed").prepend($tweetElement);
  }
};
//ALL FUNCTIONS REGARDING BUILDING THE TWEET OBJECT

//creates the header element for the tweet
let createHeader = function (tweet){
  let $header = $('<header>').addClass('tweet-header');
  let $img = $('<img src=' + tweet.user.avatars.small + '>');
  let $h2 = $('<h2>' + tweet.user.name + '</h2>');
  let $p = $('<p>' + tweet.user.handle + '</p>');

  $header.append($img).append($h2).append($p)
  return $header;
};
//creates the footer element for the tweet
let createFooter = function (tweet){
  let timePosted = tweet.created_at / 1000;
  let $footer = $('<footer>').addClass('tweet-footer')
  let $p = $('<p data-livestamp=' + timePosted + '></p>')
  let $footerIcons = $('<div>').attr("class", "footer-icons")
  $footerIcons.append('<i class="material-icons">flag</i>')
              .append('<i class="material-icons">sync</i>')
              .append('<i class="material-icons">favorite</i>')

  $footer.append($p).append($footerIcons)
  return $footer;
};
//creates the main article elements for the tweet
let createTweetElement = function (tweet) {
  let $tweetArticle = $(`<section class='tweets'>`);
  let $innerArticle = $("<article>");

  let $header = createHeader(tweet);
  $innerArticle.append($header).append("<div class='tweet-body clearfix'><p>" + tweet.content.text);

  let $footer = createFooter(tweet);
  $innerArticle.append($footer);
  $tweetArticle.append($innerArticle);

  return $tweetArticle;
};
loadTweets();
