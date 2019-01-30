function userResponseUseCase(userRepo) {
  function handler(queryType, queryData) {
    console.log('userUseCases.userResponseUseCase.handler(' + queryType + ', ' +
                queryData + ')');
    switch (queryType) {
    case 'date':
      return byData(queryData);
      break;
    case 'name':
      return byAuthor(queryData);
      break;
    case 'group':
      return byGroup(queryData);
      break;
    default:
      break;
    }
  }

  // Query Methods
  function byDate(query) {}

  function byName(query) {}

  function byGroup(query) {}
  // End Query Methods
  return {
    handler : handler,
    byDate : byDate,
    byName : byName,
    byGroup : byGroup
  };
}
module.exports = userResponseUseCase;
