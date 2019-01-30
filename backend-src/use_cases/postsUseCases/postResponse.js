function postResponseUseCase(postRepo, userRepo, connectionRepo) {
  // Block Type Methods
  function postBlocks(id, query) {
    var parse = JSON.parse(query.posts);
    return postRepo.findPostsForOwner(id, parse)
        .then(function(posts) { return generateJSON(posts); })
        .catch(function(error) { return Promise.reject(error); });
  }

  function feedBlocks(id, query) {
    var parse = JSON.parse(query.feedItems);
    return postRepo.findFeedItems(parse)
        .then(function(posts) { return generateJSON(posts); })
        .catch(function(error) { return Promise.reject(error); });
  }
  // End Block Type Methods

  // UseCase Methods
  function generateJSON(postData) {
    var Json = {"postBlocks" : {}};
    console.log('POSTDATA::: ' + postData.length);
    for (var i in postData) {
      var relPost = postData[i];
      console.log('relPost::: ' + JSON.stringify(relPost));
      var blockData = {
        "id" : relPost.postId,
        "name" : relPost.OwnerName,
        "profileImgURL" : relPost.OwnerImgURL,
        "postDescription" : relPost.postDescription,
        "contentType" : relPost.contentType,
        "contentUrl" : relPost.contentURL,
        "postViews" : relPost.postViews,
        "postDuration" : relPost.postDuration,
        "createdAt" : relPost.createdAt,
        "updatedAt" : relPost.updatedAt
      };
      Json.postBlocks['block' + i] = JSON.stringify(blockData);
    }
    console.log('generateJSON(' + JSON.stringify(Json.postBlocks) + ')');
    return Json.postBlocks;
  }
  // End UseCase Methods
  return {postBlocks : postBlocks, feedBlocks : feedBlocks};
}
module.exports = postResponseUseCase;
