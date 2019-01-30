
function getUserFeedUseCase(userRepo, postRepo) {
  function getUserFeed(userId) {
    return postRepo.listPosts(userId).then(function(posts) {
      return userRepo.findByIds(posts.map(function(p) { return p.userId; }))
          .then(function(users) {
            return posts.map(function(post) {
              var author =
                  users.find(function(u) { return u.id === post.userId; });
              return {
                id : post.id,
                type : post.type,
                content : post.content,
                authorName :
                    [ author.firstName, author.lastName ].join(' ').trim(),
                createdAt : new Date(post.createdAt).getTime(),
                updatedAt : new Date(post.updatedAt).getTime()
              };
            });
          })
    });
  }

  return {getUserFeed : getUserFeed};
}

module.exports = getUserFeedUseCase;
