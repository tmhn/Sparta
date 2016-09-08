<form action="/<%= post.id %>" method="POST">
  <input type="text" name="title" placeholder="Enter a title" value="<%= post.title %>">
  <textarea name="body" class="materialize-textarea" placeholder="Post content"><%= post.body %></textarea>
  <input type="submit" value="Save Post" class="btn waves-effect waves-light">
  <% if(post.id != "") { %>
    <input type="hidden" name="_method" value="PUT">
  <% } %>
</form>
