//Takes in the text from the form and passes it to a function without reloading the page
$(".new-tweet form").on('submit', function (event) {
  event.preventDefault();

   let tweetBody = $('#newTweet textarea[name="tweetText"]').val();
   if (!tweetBody) {
     alert("You cant tweet nothing!");
     return;
   }
   console.log("posting new tweet")
   postNewTweet(tweetBody);
});


let loadTweets = function () {
    $.get("/tweets", function (data) {
      $(".tweets").remove()
        console.log("got tweets to render")
        renderTweets(data);
    })
};

//adds tweetText to /tweets to be rendered by loadTweets function
let postNewTweet = function (tweetBody) {
  let tweetText = {
      text: tweetBody
  };
  $.post("/tweets", tweetText, function (data) {
      console.log('posted tweet, now time to render page');
       $(".tweets").remove()
       loadTweets();
  })
  //clear the form after we tweet
  $(".new-tweet form textarea").val("");
};

// RENDERS THE TWEET OBJECTS
let renderTweets = function (data) {
    for (let tweet of data) {
        let $tweetElement = createTweetElement(tweet);
        $(".container").append($tweetElement);
    }
}
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
loadTweets()
