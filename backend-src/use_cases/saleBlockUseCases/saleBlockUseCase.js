function saleBlockUseCase(userRepo, saleBlockRepo) {
  // Table Methods
  function createSaleBlock() {
    saleBlockRepo.createSaleBlock()
        .then(function() {

        })
        .catch(function(error) { return Promise.reject([ error ]); });
  }
  // End Table Methods
  return { createSaleBlock: createSaleBlock }
}
module.exports = saleBlockUseCase;
