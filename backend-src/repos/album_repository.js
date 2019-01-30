var Sequelize = require("sequelize");

function albumRepository(seq) {
  // Album Repos:
  var Albums = seq.define('album', {
    AlbumID :
        {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true},
    OwnerId : {type : Sequelize.INTEGER},
    AlbumName : {type : Sequelize.STRING},
    AlbumImgURL : {type : Sequelize.STRING},
    TempURL : {type : Sequelize.STRING},
    // Album Stats
    AlbumItems : {type : Sequelize.INTEGER},
    AlbumAssesURLS : {type : Sequelize.STRING}
  });

  var ItemAsset = seq.define('albumAsset', {
    HostAlbum : {type : Sequelize.INTEGER},
    AssetId : {type : Sequelize.INTEGER},
    // Assets Specs
    AssetAttr1Type : {type : Sequelize.STRING},
    AssetAttr1Val : {type : Sequelize.STRING},
    // --------------------------------------------------
    AssetAttr2Type : {type : Sequelize.STRING},
    AssetAttr2Val : {type : Sequelize.STRING},
    // --------------------------------------------------
    AssetAttr3Type : {type : Sequelize.STRING},
    AssetAttr3Val : {type : Sequelize.STRING},
    // --------------------------------------------------
    doesConformToTemp : {type : Sequelize.BOOLEAN}
  });

  var Templates = seq.define('template', {
    TempId : {type : Sequelize.INTEGER}, // AlbumID
    // Temp Specs
    TempAttr1Type : {type : Sequelize.STRING},
    TempAttr1Val : {type : Sequelize.STRING},
    // --------------------------------------------------
    TempAttr2Type : {type : Sequelize.STRING},
    TempAttr2Val : {type : Sequelize.STRING},
    // --------------------------------------------------
    TempAttr3Type : {type : Sequelize.STRING},
    TempAttr3Val : {type : Sequelize.STRING}
  });

  // Album Repo Table Methods
  function createAlbum(data) {
    return Albums
        .create({

        })
        .then(function(album) {

        });
  }

  function updateAlbum(albumId, data) {}

  function findAlbums(ownerId) {}

  function findAlbumByName(albumName) {}

  function deleteAlbum(albumId) {}
  return {
    createAlbum : createAlbum,
    updateAlbum : updateAlbum,
    findAlbums : findAlbums,
    findAlbumByName : findAlbumByName,
    deleteAlbum : deleteAlbum
  };
}
module.exports = albumRepository;
