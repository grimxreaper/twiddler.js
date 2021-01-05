$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

    //timeago
  jQuery("time.timeago").timeago();

  // Create an h1 element with the text "Twiddler"
  var $title = $('<h1>Twiddler</h1>');
  // Append the h1 element to the DOM, nested inside of the #app div
  $title.appendTo($app);
  $title.on('click', function(event) {
    console.log(event);
    // Set a click event listener on the h1 element
    alert('The title of this page is: ' + event.target.innerText);
  });

  let $button = $('<button id = "update-feed">Update Feed</button>');
  $button.appendTo($app);
  let $feed = $('<div id ="feed"></div>');
  $feed.appendTo($app);

  const renderFeed = function(username) { //added username
    //should I empty the feed here first? Or within the if block?
    var index;


    if(username) {
      console.log(username)
      index = streams.users[username.slice(1)].length - 1;
      var currentArr = streams.users[username.slice(1)]
      console.log(tweet)
    } else {
      index = streams.home.length - 1;
      var currentArr = streams.home
      // console.log(streams.home)
    }

        while(index >= 0){
          //we want to access the tweet object here
          //tweet (need a way to identify only the tweet object for individual arrays)
          //the current object in the array we are looking at,
          //('.tweet').hide(); //event.preventDefault()
          var tweet = currentArr[index];
          var $tweet = $('<div class="tweet"></div>');
          var $user = $(`<span class="username">@${tweet.user}</span>`);
          var $message = $(`<span class="message">${tweet.message}</span>`);
          var $profilepic = $(`<img src="./assets/img/${tweet.user}.png">`)
          var $timestamp = $(`<span class="timestamp">${jQuery.timeago(tweet.created_at)}</span>`);
          //icons are here
          var $retweet = $(`<i class="fas fa-retweet"></i>`);
          var $like = $(`<i class="fas fa-grin-hearts"></i>`);
          var $share = $(`<i class="fas fa-plus"></i>`);
          var $comment = $(`<i class="far fa-comment-dots"></i>`);
        //grouping all icons together
          var $icon = $($retweet).add($like).add($share).add($comment);
          /*----------------------
          Toggle Icon Color Change
          ------------------------*/
        $($icon).mouseover(function() {
          this.style.color = 'black';
        }).mouseout(function() {
          this.style.color = 'pink';
        })

          //add to feed
          $profilepic.appendTo($tweet);
          $user.appendTo($tweet);
          $message.appendTo($tweet);
          $retweet.appendTo($tweet);
          $like.appendTo($tweet);
          $share.appendTo($tweet);
          $comment.appendTo($tweet);
          $tweet.appendTo($feed);
          $timestamp.appendTo($tweet);

          index -= 1;
        }
  };


// Display tweets
renderFeed()
//using this variable to check if you are on the home feed (or not)
var isOnHomeFeed = true;

  /*----------------------
  Render New Tweets on Click of
  ------------------------*/
  $('#update-feed').on('click', function(event) {
    $("#feed").empty();
    //console.log('after empty', document.querySelector('#feed').childNodes.length)
   renderFeed()
  })

  /*----------------------
  Display Indv Feed On Username Click
  ------------------------*/
  //look at how you're naming feed
$('#feed').on('click', '.username', function(event){ //only gets run once //ev
  $("#feed").empty(); //just added*
  let itemClicked = $(this).text();
      renderFeed(itemClicked);
      console.log('inside on click event')
      //change variable assignment to indicate that we are on the indv feed
      console.log(isOnHomeFeed)
      isOnHomeFeed = false;
      console.log(isOnHomeFeed)

      $("#update-feed").text('back');
})


//create 'back' button to return to home feed when in individual feed
$('button').on('click', function() {
  renderFeed();
  if ($("#update-feed").text() === 'back') {
    $("#update-feed").text('update feed');
  }
 })

});

