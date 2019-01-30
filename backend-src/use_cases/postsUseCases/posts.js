function postsUseCase(postRepo, userRepo) {
  function createPost(id, postData) {
    return postRepo.createPost(postData)
        .then(function(post) {
          if (post.streamIsLive) {
            userRepo.updateUserLiveState({id : id, isLive : true});
          }
          return post;
        })
        .catch(function(error) { return Promise.reject([ error ]); });
  }

  function updatePost(id, postData) {
    return postRepo.updatePostData(postData.id, postData).then(function() {
      if (postData.liveState) {
        userRepo.updateUserLiveState({id : id, isLive : post.liveState});
      }
      return post.postId;
    });
  }
  return {createPost : createPost, updatePost : updatePost};
}
module.exports = postsUseCase;
