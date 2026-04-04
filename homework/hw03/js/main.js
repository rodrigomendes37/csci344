// requires utilities.js to be loaded first:
// included in index.html

const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "rmaiamen"; // change to your username :)
let password = "password";

async function initializeScreen() {
  token = await getToken();
  showNav();
  // invoke all of the Part 1 functions here
  await showProfileHeader();
  await showSuggestions();
  await showStories();
  await showPosts();
}

async function getToken() {
  return await getAccessToken(rootURL, username, password);
}

function showNav() {
  document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:
async function showPosts() {
  const posts = await getPosts();
  const postHTML = posts.map((post) => makePostHTML(post)).join("");
  document.querySelector("#posts").innerHTML = postHTML;
  addLikeHandlers();
  addBookmarkHandlers();
  addCommentHandlers();
}

async function getPosts() {
  const endpoint = `${rootURL}/api/posts/?limit=10`;
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

async function reloadPost(postId){
  console.log("Reloading only post:", postId);
  const response = await fetch(`${rootURL}/api/posts/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const post = await response.json();
  const updatedPostHTML = makePostHTML(post);
  const postElement = document.querySelector(`#post-${postId}`);
  postElement.outerHTML = updatedPostHTML;

  addLikeHandlers();
  addBookmarkHandlers();
  addCommentHandlers();
}

function getComments(post){
  if(post.comments.length === 0){
    return "";
  }
  if(post.comments.length === 1){
    const comment = post.comments[0];
    return `
      <p class = "text-sm mb-2">
        <span class = "font-bold">${comment.user.username}</span>
        ${comment.text}
      </p>
    `;
  }
  const mostRecentComment = post.comments[post.comments.length - 1];

  return `
    <button class = "text-sm text-gray-500 mb-2">
      View all ${post.comments.length} comments
    </button>
    <p class = "text-sm mb-2">
      <span class = "font-bold">${mostRecentComment.user.username}</span>
      ${mostRecentComment.text}
    </p>
  `;
}

function getLikeButton(post){
  const isLiked = post.current_user_like_id ? true : false;
  const heartClass = isLiked ? "fa-solid text-red-500" : "fa-regular";
  const heartStyle = isLiked ? 'style = "color: red;"' : "";

  return `
    <button 
      class = "like-btn"
      aria-label = "${isLiked ? "Unlike post" : "Like post"}"
      data-post-id = "${post.id}"
      data-like-id = "${post.current_user_like_id || ""}">
      <i class = "${heartClass} fa-heart" ${heartStyle}></i>
    </button>
  `;
}

function getBookmarkButton(post){ 
  const isBookmarked = post.current_user_bookmark_id ? true : false;
  const bookmarkClass = isBookmarked ? "fa-solid" : "fa-regular";

  return `
    <button 
      class = "bookmark-btn"
      aria-label = "${isBookmarked ? "Remove bookmark" : "Add bookmark"}"
      data-post-id = "${post.id}"
      data-bookmark-id = "${post.current_user_bookmark_id || ""}">
      <i class = "${bookmarkClass} fa-bookmark"></i>
    </button>
  `;
}

function makePostHTML(post) {

  return `
        <section id = "post-${post.id}" class="bg-white border border-gray-300 mb-8 max-w-2xl mx-auto">
            <div class="flex items-center gap-3 p-4">
                <img 
                    src="${post.user.thumb_url}" 
                    alt="${post.user.username} profile photo" 
                    class="w-10 h-10 rounded-full"
                >
                <span class="font-bold text-sm">${post.user.username}</span>
            </div>

            <img 
                src="${post.image_url}" 
                alt="${post.caption}" 
                class="w-full"
            >

            <div class="p-4">
                <div class="flex justify-between text-xl mb-3">
                  <div class="flex gap-4">
                    ${getLikeButton(post)}
                    <button aria-label = "View comments">
                      <i class = "fa-regular fa-comment"></i>
                    </button>
                  </div>
                  ${getBookmarkButton(post)}
                </div>

                <p class="font-bold text-sm mb-2">${post.likes.length} likes</p>
                <p class="text-sm mb-2">
                    <span class="font-bold">${post.user.username}</span>
                    ${post.caption}
                </p>
                ${getComments(post)}
                <div class = "flex justify-between items-center p-3 border-t mt-3">
                  <div class = "flex items-center gap-3 min-w-[80%]">
                    <i class = "far fa-smile text-lg"></i>
                    <input
                      type = "text"
                      class = "min-w-[80%] focus:outline-none comment-input"
                      placeholder = "Add a comment ..."
                      data-post-id = "${post.id}"
                    >
                  </div>
                  <button
                    class = "text-blue-500 py-2 comment-submit-btn"
                    data-post-id = "${post.id}">
                    Post
                  </button>
                </div>
            </div>
        </section>
    `;
}

function addLikeHandlers(){
  const buttons = document.querySelectorAll(".like-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", handleLikeClick);
  });
}

async function handleLikeClick(ev){
  const postId = ev.currentTarget.dataset.postId;
  const likeId = ev.currentTarget.dataset.likeId;

  if(likeId){
    await deleteLike(likeId);
  }else{
    await createLike(postId);
  }

  await reloadPost(postId);
}

async function createLike(postId){
  const endpoint = `${rootURL}/api/likes/`;
  const postData = {
    post_id: Number(postId),
  };
  const response = await fetch(endpoint, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  return await response.json();
}

async function deleteLike(likeId){
  const endpoint = `${rootURL}/api/likes/${likeId}`;
  await fetch(endpoint, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
}


function addBookmarkHandlers() {
  const buttons = document.querySelectorAll(".bookmark-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", handleBookmarkClick);
  });
}

async function handleBookmarkClick(ev) {
  const postId = ev.currentTarget.dataset.postId;
  const bookmarkId = ev.currentTarget.dataset.bookmarkId;

  if (bookmarkId) {
    await deleteBookmark(bookmarkId);
  } else {
    await createBookmark(postId);
  }

  await reloadPost(postId);
}

async function createBookmark(postId) {
  const endpoint = `${rootURL}/api/bookmarks/`;
  const postData = {
    post_id: Number(postId),
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  return await response.json();
}

async function deleteBookmark(bookmarkId) {
  const endpoint = `${rootURL}/api/bookmarks/${bookmarkId}`;
  await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
}

function addCommentHandlers(){
  const buttons = document.querySelectorAll(".comment-submit-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", handleCommentSubmit);
  });
}

async function handleCommentSubmit(ev){
  const postId = ev.currentTarget.dataset.postId;
  const input = document.querySelector(`.comment-input[data-post-id="${postId}"]`);
  const commentText = input.value.trim();

  if(!commentText){
    return;
  }
  
  await addComment(postId, commentText);
  await reloadPost(postId);
}

async function addComment(postId, commentText){
  const endpoint = `${rootURL}/api/comments`;
  const postData = {
    post_id: Number(postId),
    text: commentText,
  };

  const response = await fetch(endpoint, {
    method: "POST", 
    headers: {
      "Content-Type" : "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
  return await response.json();
}

async function showProfileHeader(){
  const endpoint = `${rootURL}/api/profile`;
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const profile = await response.json();

  document.querySelector("#profile-header").innerHTML = `
    <header class = "flex gap-4 items-center">
      <img
        src = "${profile.thumb_url}"
        alt = "${profile.username} profile photo"
        class = "rounded-full w-16 h-16"
      />
      <h2 class = "font-Comfortaa font-bold text-2xl">
        ${profile.username}
      </h2>
    </header>
  `;
}

async function showSuggestions(){
  const endpoint = `${rootURL}/api/suggestions`;
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }, 
  });
  const suggestions = await response.json();

  const suggestionsHTML = suggestions.map((user) => `
    <section class = "flex justify-between items-center mb-4 gap-2">
      <img
        src = "${user.thumb_url}"
        alt = "${user.username} profile photo"
        class = "rounded-full w-10 h-10"
      />
      <div class = "w-[180px]">
        <p class = "font-bold text-sm">${user.username}</p>
        <p class = "text-gray-500 text-xs">suggested for you</p>
      </div>
      <button class = "text-blue-500 text-sm py-2">follow</button>
    </section>
  `).join("");

  document.querySelector("#suggestions").innerHTML = `
    <p class = "text-base text-gray-400 font-bold mb-4">Suggestions for you</p>
    ${suggestionsHTML}
  `;
}

async function showStories() {
  const endpoint = `${rootURL}/api/stories`;
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }, 
  });
  const stories = await response.json();

  const storiesHTML = stories.map((story) => `
    <div class = "flex flex-col justify-center items-center">
      <img
        src = "${story.user.thumb_url}"
        alt = "${story.user.username} story"
        class = "rounded-full border-4 border-gray-300 w-[50px] h-[50px]"
      />
      <p class = "text-xs text-gray-500">${story.user.username}</p>
    </div>
  `).join("");

  document.querySelector("#stories").innerHTML = storiesHTML;
  
}

// after all of the functions are defined,
// invoke initialize at the bottom:
initializeScreen();
