
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1519786374084
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1519586397000
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];



let renderTweets = function (data) {
    for (let tweet of data) {
        let $tweetElement = createTweetElement(tweet);
        $(".container").append($tweetElement);
    }
}

let createHeader = function (tweet){
  let $header = $('<header>').addClass('tweet-header')

  let $img = $('<img src=' + tweet.user.avatars.small + '>')
  let $h2 = $('<h2>' + tweet.user.name + '</h2>')
  let $p = $('<p>' + tweet.user.handle + '</p>')

  $header.append($img)
  $header.append($h2)
  $header.append($p)
  return $header
}

let createFooter = function (tweet){
  let timePosted = tweet.created_at / 1000;
  console.log(timePosted)
  let $footer = $('<footer>').addClass('tweet-footer');
  let $p = $('<p data-livestamp=' + timePosted + '></p>')
  let $footerIcons = $('<div>').attr("class", "footer-icons")
  $footerIcons.append('<i class="material-icons">flag</i>')
  $footerIcons.append('<i class="material-icons">sync</i>')
  $footerIcons.append('<i class="material-icons">favorite</i>')

  $footer.append($p)
  $footer.append($footerIcons)
  return $footer
}

let createTweetElement = function (tweet) {
    let $tweetArticle = $(`<section class='tweets'>`);
    let $innerArticle = $("<article>");

    let $header = createHeader(tweet);
    $innerArticle.append($header);
    $innerArticle.append("<div class='tweet-body clearfix'><p>" + tweet.content.text);

    let $footer = createFooter(tweet);
    $innerArticle.append($footer);
    $tweetArticle.append($innerArticle);

    return $tweetArticle;
}

renderTweets(data);
