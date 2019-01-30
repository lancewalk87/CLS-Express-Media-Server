var Sequelize = require("sequelize");
var DataTypes = require("sequelize/lib/data-types");

// POST REPOSITORY
function postRepository(seq) {
  // Post Repos
  var Posts = seq.define('post', {
    OwnerId : {type : Sequelize.INTEGER},
    OwnerName : {type : Sequelize.STRING},
    OwnerImgURL : {type : Sequelize.STRING},
    postId :
        {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true},
    postDescription : {type : Sequelize.STRING},
    contentType : {type : Sequelize.STRING},
    contentPath : {type : Sequelize.STRING},
    streamIsLive : {type : Sequelize.BOOLEAN},
    postViews : {type : Sequelize.INTEGER, defaultValue : 0},
    postDuration : {type : Sequelize.INTEGER}
  });

  var postComments = seq.define('postComment', {
    CommentId : {type : Sequelize.INTEGER}, // postID
    OwnerId : {type : Sequelize.INTEGER},   // commenterID
    OwnerName : {type : Sequelize.STRING},
    OwnerImgURL : {type : Sequelize.STRING},
    CommentText : {type : Sequelize.STRING},
    CommentDataUrl : {type : Sequelize.STRING}
  });
  // End Post Repos

  // Post Repo Table Methods
  function createPost(postData) {
    return Posts
        .create({
          OwnerId : postData.userId,
          OwnerName : postData.OwnerName,
          OwnerImgURL : postData.OwnerImgURL,
          postDescription : postData.postDescription,
          contentType : postData.contentType,
          contentURL : postData.contentPath,
          streamIsLive : postData.streamIsLive,
          postDuration : postData.postDuration
        })
        .then(function(post) {
          return findPostsById(post.OwnerId).then(function(data) {
            return {
              sum : Object(data).length,
              streamIsLive : post.streamIsLive,
              postid : post.postId
            };
          });
        });
  }

  function updatePostData(postId, updateData) {
    var data = postData;
    return seq
        .transaction(function(j) {

        })
        .then(function(postData) { return postData; });
  }

  function deletePost(postId) {
    console.log('repos.postRepo.deletePost(' + postId + ')');
    return Posts.destroy({where : {id : postId}});
  }
  // End Post Repo Table Methods

  // Post Repo Query Methods
  function findPostsById(id) {
    console.log('repos.postRepo.findPostsById(' + id + ')');
    return Posts.findAll({where : {OwnerId : id}, attributes : [ 'postId' ]});
  }

  function findAllPostIds(connections) {
    console.log('repos.postRepo.findAllPostIds(' + connections + ')');
    var ids = connections;
    return seq
        .transaction(function(j) {
          var actions = [];
          for (var i in ids) {
            var searchPromise = Posts.findAll({
              where : {OwnerId : ids[i]},
              attributes : [ 'OwnerId', 'postId', 'updatedAt' ]
            },
                                              {transaction : j});
            actions.push(searchPromise);
          };
          return Promise.all(actions);
        })
        .then(function(posts) { return posts; })
        .catch(function(error) { return Promise.reject([ error ]); });
  }

  function findFeedItems(postBlocks, query) {
    console.log('repos.postRepo.findFeedItems(' + postBlocks + ', ' + query +
                ')');
    var index = postBlocks;
    return seq
        .transaction(function(j) {
          var actions = [];
          for (var i in index) {
            console.log('POSTID::: ' + index[i].OwnerId);
            var searchPromise = Posts.findOne({
              where : {OwnerId : index[i].OwnerId, postId : index[i].postId},
              attributes : [
                'OwnerId', 'OwnerName', 'OwnerImgURL', 'postId',
                'postDescription', 'contentType', 'contentURL', 'streamIsLive',
                'postViews', 'postDuration',
                [
                  seq.Sequelize.fn('date_format',
                                   seq.Sequelize.col('updatedAt'),
                                   '%Y-%m-%d %H:%i'),
                  'updatedAt'
                ]
              ]
            },
                                              {transaction : j});
            actions.push(searchPromise);
          };
          return Promise.all(actions);
        })
        .then(function(posts) {
          console.log('REPO.POSTS::: ' + posts);
          return posts;
        })
        .catch(function(error) { return Promise.reject([ error ]); });
  }

  function findPostsForOwner(id) {
    return Posts.findAll({
      where : {OwnerId : id},
      attributes : [
        'OwnerId', 'OwnerName', 'OwnerImgURL', 'postId', 'postDescription',
        'contentType', 'contentURL', 'streamIsLive', 'postViews',
        'postDuration',
        [
          seq.Sequelize.fn('date_format', seq.Sequelize.col('updatedAt'),
                           '%Y-%m-%d %H:%i'),
          'updatedAt'
        ]
      ]
    });
  }
  // End Post Query Methods

  // Post Comment Repo Table Methods
  function createPostComment(commentData) {
    console.log('repos.postRepo.createPostComment(' + commentData.commendId +
                ', ' + commentData.OwnerId + ', ' + commentData.OwnerName +
                ', ' + commentData.OwnerImgURL + ', ' +
                commentData.commentText + ', ' + commentData.commentDataUrl +
                ')');
    return postComments.create({
      CommentId : commentData.commendId,
      OwnerId : commentData.OwnerId,
      OwnerName : commentData.OwnerName,
      OwnerImgURL : commentData.OwnerImgURL,
      CommentText : commentData.commentText,
      CommentDataUrl : commentData.commentDataUrl
    });
  }

  function updatePostComment() {}

  function deletePostComment() {}
  // End Post Comment Repo Table Methods

  // Post Comment Repo Query Methods
  function findPostComments() {}
  // End Post Comment Repo Query Methods
  return {
    // Post Repo
    createPost : createPost,
    updatePostData : updatePostData,
    deletePost : deletePost,
    findPostsById : findPostsById,
    findAllPostIds : findAllPostIds,
    findFeedItems : findFeedItems,
    findPostsForOwner : findPostsForOwner,
    // Post Comment Repo
    createPostComment : createPostComment,
    updatePostComment : updatePostComment,
    deletePostComment : deletePostComment,
    findPostComments : findPostComments
  };
}
// END POST REPOSITORY
module.exports = postRepository;
