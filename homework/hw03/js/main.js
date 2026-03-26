// requires utilities.js to be loaded first:
// included in index.html

const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "webdev"; // change to your username :)
let password = "password";

async function initializeScreen() {
  token = await getToken();
  showNav();
  // invoke all of the Part 1 functions here
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
  console.log(posts);
  const postHTML = posts.map((post) => makePostHTML(post)).join("");
  document.querySelector("#posts").innerHTML = postHTML;
  addBookmarkHandlers();
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

function makePostHTML(post) {
  const isBookmarked = post.current_user_bookmark_id ? true : false;
  const bookmarkClass = isBookmarked ? "fa-solid" : "fa-regular";

  return `
        <section class="bg-white border border-gray-300 mb-8 max-w-2xl mx-auto">
            <div class="flex items-center gap-3 p-4">
                <img 
                    src="${post.user.thumb_url}" 
                    alt="${post.user.username}" 
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
                        <i class="fa-regular fa-heart"></i>
                        <i class="fa-regular fa-comment"></i>
                    </div>
                    <i 
                        class="${bookmarkClass} fa-bookmark cursor-pointer bookmark-btn"
                        data-post-id="${post.id}"
                        data-bookmark-id="${post.current_user_bookmark_id || ""}">
                    </i>
                </div>

                <p class="font-bold text-sm mb-2">${post.likes.length} likes</p>
                <p class="text-sm">
                    <span class="font-bold">${post.user.username}</span>
                    ${post.caption}
                </p>
            </div>
        </section>
    `;
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

  console.log("postId:", postId);
  console.log("bookmarkId:", bookmarkId);

  if (bookmarkId) {
    await deleteBookmark(bookmarkId);
  } else {
    await createBookmark(postId);
  }

  await showPosts();
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

// after all of the functions are defined,
// invoke initialize at the bottom:
initializeScreen();
