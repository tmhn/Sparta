var posts = [
  {
    id: 0,
    title: "Post 1",
    body: "This is a dummy post. It will be reset every time you restart your app"
  }
];


function allPosts() {

  return posts;

}

function findPost(index) {

  return posts[index];

}

function deletePost(index) {

  posts.splice(index, 1);

}

function createPost(post) {

  post.id = posts.length;

  posts.push(post);

}

function updatePost(index, post) {

  posts[index] = post;

}


module.exports = {
  all:    allPosts,
  find:   findPost,
  delete: deletePost,
  create: createPost,
  update: updatePost
}