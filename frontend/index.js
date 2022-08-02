const postsContainer = document.querySelector("#posts-container");

const baseURL = `https://socialmedyadb.herokuapp.com`;

const postsCallback = (arr) => displayPosts(arr.data);
const errCallback = (err) => console.log(err);

const getAllPosts = () =>
  axios.get(`${baseURL}/posts`).then(postsCallback).catch(errCallback);
const createPost = (body) =>
  axios
    .post(`https://socialmedyadb.herokuapp.com/posts`, body)
    .then((res) => console.log(res.data))
    .catch(errCallback);
const deletePost = (id) =>
  axios.delete(`${baseURL}/posts/${id}`).then(postsCallback).catch(errCallback);
const updatePost = (id, postObj) =>
  axios
    .put(`${baseURL}/posts/${id}`, postObj)
    .then(postsCallback)
    .catch(errCallback);

function submitHandler(e) {
  e.preventDefault();
  let username = document.getElementById("username");
  let post = document.getElementById("post");

  let bodyObj = {
    username: username.value,
    post: post.value,
  };

  createPost(bodyObj);

  username.value = "";
  post.value = "";
  getAllPosts();
}

function toggleHide(id) {
  const idPost = document.getElementById(`${id}-post`);
  const idInput = document.getElementById(`${id}-input`);
  const idEdit = document.getElementById(`${id}-edit`);
  const idPostBtn = document.getElementById(`${id}-post-btn`);

  idPost.classList.toggle("hide");
  idInput.classList.toggle("hide");
  idEdit.classList.toggle("hide");
  idPostBtn.classList.toggle("hide");
}

function editPost(id) {
  const idInput = document.getElementById(`${id}-input`);

  let bodyObj = {
    post: idInput.value,
    post_id: id,
  };

  updatePost(id, bodyObj);
  getAllPosts();
}

function createPostCard(post) {
  const postCard = document.createElement("div");
  postCard.classList.add("post-card");

  postCard.innerHTML = `<p>${post.username}</p>
    <p id="${post.post_id}-post">${post.post}</p>
    <div><input id="${post.post_id}-input" class="hide" value="${post.post}" /></div>
    <button id="${post.post_id}-edit" onclick="toggleHide(${post.post_id})">Edit</button>
    <button id="${post.post_id}-post-btn" class="hide" onclick="editPost(${post.post_id})" >Post</button>
    <button onclick="deletePost(${post.post_id});getAllPosts();">Delete</button>
  `;

  postsContainer.appendChild(postCard);
}

function displayPosts(arr) {
  postsContainer.innerHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    createPostCard(arr[i]);
  }
}

getAllPosts();
