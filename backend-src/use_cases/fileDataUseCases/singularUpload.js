function singularUseCase(fs) {
  function uploadNew(path, data) { // upload new
    fs.writeFile(path, data, function(err) {
      if (err) {
        console.log("failed");
        return err;
      }
      return path;
    });
  }

  // UseCase Methods

  // End UseCase Methods
  return {uploadNew : uploadNew};
}
module.exports = singularUseCase;
