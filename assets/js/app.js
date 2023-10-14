// DOM select
const form = document.querySelector('#form');
const tweetInput = document.querySelector('#tweet'); 
const tweetList = document.querySelector('#tweet-list');

// Load All EventListener
loadEventListener();

function loadEventListener() {
  // DOM content load
  document.addEventListener('DOMContentLoaded', localStorageOnLoad);

  // Add Tweet
  form.addEventListener('submit', addtweet);

  //  Remove
  tweetList.addEventListener('click', removeTweet);
}


function addtweet(e) {

  const tweet = tweetInput.value;
  if (tweet === '') {
   alert('Please add a tweet');
  }

  // Add A Tweet
  // create An UL Element 
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  // append to text node
  // li.textContent = tweetInput.value;
  li.appendChild(document.createTextNode(tweet));
  const link = document.createElement('a');
  link.className = 'collection-list remove-tweet';
  link.textContent = 'X';

  // Append a to li 
  li.appendChild(link);

// Append li to tweetList
   tweetList.appendChild(li);

  //  Store Ls
  storeTweetInLocalStorage(tweet);
  

  //  Clear input
  tweetInput.value = '';
  e.preventDefault();
};

// Remove From the DOM
function removeTweet(e) {
  if (e.target.classList.contains('collection-list')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.remove();

            // Remove from LS
      removeTweetFromLocalStorage(e.target.parentElement.textContent);
    }
  };
};

//Function store to LocalStorage
function storeTweetInLocalStorage(tweet) {
  
  const tweets = getTweetsFromStorage ();
   // Add the tweet into the array
  tweets.push(tweet);
  // Convert tweet array into String
  localStorage.setItem('tweets', JSON.stringify(tweets));
}


function getTweetsFromStorage() {
  let tweets;
  const tweetsLs = localStorage.getItem('tweets');
  if(tweetsLs === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(tweetsLs); 
  };

  return tweets;
  
};

function localStorageOnLoad() {
  const tweets = getTweetsFromStorage();
  
  tweets.forEach(function(tweet){  
    const li = document.createElement('li');
    // append to text node
    // li.textContent = 'tweet';
    li.appendChild(document.createTextNode(tweet));
    const link = document.createElement('a');
    link.className = 'collection-list remove-tweet';
    link.textContent = 'X';
  
    // Append a to li 
    li.appendChild(link);
  
    // Append li to tweetList
    tweetList.appendChild(li);
    });

}

// Remove from LS
function removeTweetFromLocalStorage(tweet) {
 const tweets = getTweetsFromStorage();

 const tweetDelete = tweet.substring( 0, tweet.length -1);

 tweets.forEach(function(tweetLs, index ) {
   if (tweetDelete === tweetLs) {
      tweets.splice(index, 1);
   }
 });

  localStorage.setItem('tweets', JSON.stringify(tweets));
 

}








