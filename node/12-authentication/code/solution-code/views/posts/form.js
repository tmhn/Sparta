<form action="/<%= post.id %>" method="POST">
  <input type="text" name="title" placeholder="Enter a title" value="<%= post.title %>">
  <textarea name="body"><%= post.body %></textarea>
  <input type="number" name="rating" value="<%=post.rating %>" min="0" max="10">

  <input type="submit" value="Save Post">
  <% if(post.id != "") { %>
  <input type="hidden" name="_method" value="PUT">
  <% } %>
</form>
