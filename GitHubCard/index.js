/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/taylorbcool')
  .then((response) => {
    createCard(response);
  })
  .catch((error) => {
    console.log('taylorbcool data was not returned; ' + error);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, create a new component and add it to the DOM as a child of .cards
*/


/* Step 5: Now that you have your own card getting added to       the DOM, either follow this link in your browser https://      api.github.com/users/<Your github name>/followers ,            manually find some other users' github handles, or use the     list found 
   at the bottom of the page. Get at least 5 different Github usernames and add them as
   Individual strings to the friendsArray below.

Using that array, iterate over it, requesting data for each user, creating a new card for each
user, and adding that card to the DOM.
*/

const followersArray = [];
axios.get('https://api.github.com/users/taylorbcool/followers')
  .then((response) => {
    response.data.forEach((item) => {
      followersArray.push(item.login);
    })
  })
  .catch((error) => {
    console.log('Followers data was not returned; ' + error)
  });
console.log(followersArray);
followersArray.forEach((item) => {
  axios.get(`https://api.github.com/users/${item}`)
    .then((response) => {
      createCard(response);
    })
    .catch((error) => {
      console.log('Could not get follower data; ' + error)
    })
})
/* Step 3: Create a function that accepts a single object.data as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createCard(object) {
  // creates all variables
  const 
    cards = document.querySelector('.cards'),
    card = document.createElement('div'),
    cardImage = document.createElement('img'),
    cardInfo = document.createElement('div')
    cardName = document.createElement('h3'), 
    cardUsername = document.createElement('p'),
    cardLocation = document.createElement('p'),
    cardProfile = document.createElement('p'),
    cardProfileURL = document.createElement('a'), 
    cardFollowers = document.createElement('p'),
    cardFollowing = document.createElement('p'),
    cardBio = document.createElement('p');

    // fills in card information
  cardImage.alt = 'A picture of the user';
  cardImage.src = object.data.avatar_url;
  cardName.textContent = object.data.name;
  cardUsername.textContent = object.data.login;
  cardLocation.textContent = object.data.location ? object.data.location : 'No location';
  cardProfile.textContent = `Profile: `;
  cardProfileURL.href = object.data.html_url;
  cardProfileURL.textContent = object.data.html_url;
  cardFollowers.innerHTML = `Followers: ${object.data.followers}`;
  cardFollowing.innerHTML = `Following: ${object.data.following}`;
  cardBio.textContent = object.data.bio ? object.data.bio : 'No bio';

  // appends variables to their parents
  cards.appendChild(card);
  card.appendChild(cardImage);
  card.appendChild(cardInfo);
  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardUsername);
  cardInfo.appendChild(cardLocation);
  cardInfo.appendChild(cardProfile);
  cardProfile.appendChild(cardProfileURL);
  cardInfo.appendChild(cardFollowers);
  cardInfo.appendChild(cardFollowing);
  cardInfo.appendChild(cardBio);

  // adds classes to elements
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  cardName.classList.add('name');
  cardUsername.classList.add('username');

  return card
};

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
