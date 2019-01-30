var Sequelize = require("sequelize");

// SALEBLOCK REPOSITORY
function saleBlockRepository(seq) {
  // SaleBlock Repos
  var SaleBlock = seq.define('saleblock', {
    // main repo
    id : {type : Sequelize.INTEGER, primaryKey : true},
    title : {type : Sequelize.STRING},
    description : {type : Sequelize.TEXT},
    imgURL : {type : Sequelize.STRING},
    cat1 : {type : Sequelize.INTEGER},
    cat2 : {type : Sequelize.INTEGER},
    cat3 : {type : Sequelize.INTEGER},
    saleCap : {type : Sequelize.INTEGER},
    shouldDel : {type : Sequelize.BOOLEAN}
  });

  // id [SaleBlockCat1-SaleBlockCat3]=SaleBlock.id n
  var SaleBlockCat1 = seq.define('saleblockcat1', {
    // catergory 1
    id : {type : Sequelize.INTEGER, primaryKey : true},
    title : {type : Sequelize.STRING},
    select1 : {type : Sequelize.STRING},
    select2 : {type : Sequelize.STRING},
    select3 : {type : Sequelize.STRING},
    select4 : {type : Sequelize.STRING},
    select5 : {type : Sequelize.STRING}
  });

  var SaleBlockCat2 = seq.define('saleblockcat2', {
    // catergory 2
    id : {type : Sequelize.INTEGER, primaryKey : true},
    title : {type : Sequelize.STRING},
    select1 : {type : Sequelize.STRING},
    select2 : {type : Sequelize.STRING},
    select3 : {type : Sequelize.STRING},
    select4 : {type : Sequelize.STRING},
    select5 : {type : Sequelize.STRING}
  });

  var SaleBlockCat3 = seq.define('saleblockcat3', {
    // catergory 3
    id : {type : Sequelize.INTEGER, primaryKey : true},
    title : {type : Sequelize.STRING},
    select1 : {type : Sequelize.STRING},
    select2 : {type : Sequelize.STRING},
    select3 : {type : Sequelize.STRING},
    select4 : {type : Sequelize.STRING},
    select5 : {type : Sequelize.STRING}
  });
  // End SaleBlock Repos

  // Primary SaleBlock Repo Methods
  function createSaleBlock(blockData, cat1Data, cat2Data,
                           cat3Data) { // create sale block
    // blockData[0] = id{SaleBlock, cat1, cat2, cat3}
    var createSaleBlock = SaleBlock.create({
      id : blockData[0],
      title : blockData[1].title,
      description : blockData[2],
      imgURL : blockData[3],
      cat1 : blockData[0],
      cat2 : blockData[0],
      cat3 : blockData[0],
      saleCap : blockData[4],
      shouldDel : blockData[5]
    });

    var createCat1 = SaleBlockCat1.create({
      id : cat1Data[0],
      title : cat1Data[1],
      select1 : cat1Data[2],
      select2 : cat1Data[3],
      select3 : cat1Data[4],
      select4 : cat1Data[5],
      select5 : cat1Data[6]
    });

    var createCat2 = SaleBlockCat2.create({
      id : cat2Data[0],
      title : cat2Data[1],
      select1 : cat2Data[2],
      select2 : cat2Data[3],
      select3 : cat2Data[4],
      select4 : cat2Data[5],
      select5 : cat2Data[6]
    });

    var createCat3 = SaleBlockCat3.create({
      id : cat3Data[0],
      title : cat3Data[1],
      select1 : cat3Data[2],
      select2 : cat3Data[3],
      select3 : cat3Data[4],
      select4 : cat3Data[5],
      select5 : cat3Data[6]
    });

    return ({createSaleBlock, createCat1, createCat2, createCat3})
        .then(function() {
          console.log('createSaleBlock(' + blockData + ', ' + cat1Data + ', ' +
                      cat2Data + ', ' + cat3Data + ')');
        });
  }

  function updateSaleBlock(saleBlockId, data) { // update sale block
  }

  function findSaleBlocksById(userId) { // find sale block by id
    return SaleBlock.findAll({id : blockIds}).then(function(saleBlocks) {
      console.log('findSaleBlock(' + blockId + ') blocks: ' + saleBlocks + ')');
    });
  }

  function deleteSaleBlock(blockId) { // delete sale block by id
    SaleBlock.destroy({where : {id : blockId}}).then(function() {
      console.log('deldeleteSaleBlock(' + blockId + ')');
    });
  }
  // End Primary SaleBlock Repo Methods
  return {
    // SaleBlock Repo
    createSaleBlock : createSaleBlock,
    updateSaleBlock : updateSaleBlock,
    findSaleBlocksById : findSaleBlocksById,
    deleteSaleBlock : deleteSaleBlock
  };
}
// END SALEBLOCK REPOSITORY
module.exports = saleBlockRepository;
