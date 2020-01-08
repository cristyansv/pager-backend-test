const {
  generateInsertQuery,
  generateGetAll,
  generateUpdateQuery,
  generateDeleteQuery,
  generateGetByColumn
} = require("../../utils/utils");

const OrganizationInterface = require("./OrgnizationRepositoryInterface");

/**
 * Organization SQL repository implementation
 * @implements OrganizationInterface
 * @class
 */
class OrganizationRepositorySQL extends OrganizationInterface {
  /**
   *
   * @param {object} client - mysql db client
   */
  constructor(client) {
    super();
    this.client = client;
    this.table = "organization";
  }

  list(select = ["*"]) {
    return this.client.query(generateGetAll(this.table, select));
  }

  add(data) {
    return this.client.query(...generateInsertQuery(this.table, data));
  }

  updateByCode(code, data) {
    return this.client.query(
      ...generateUpdateQuery(this.table, "code", code, data)
    );
  }

  deleteByCode(code) {
    return this.client.query(generateDeleteQuery(this.table, "code", code));
  }

  filterByColumn(pairs, operator = "and", select = ["*"]) {
    return this.client.query(
      ...generateGetByColumn(this.table, pairs, operator, select)
    );
  }
}

module.exports = OrganizationRepositorySQL;
