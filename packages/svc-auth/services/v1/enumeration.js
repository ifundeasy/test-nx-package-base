const { Sql } = require('utils');

exports.getBy = async () => {
  const { repo } = Sql.getInstance();
  return repo.enumeration.getBy();
}
