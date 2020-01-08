/**
 * @interface
 */
class OrganizationInterface {
  constructor() {
    if (this.list === undefined) {
      throw new Error("Must override .list() method");
    }

    if (this.add === undefined) {
      throw new Error("Must override .add() method");
    }

    if (this.updateByCode === undefined) {
      throw new Error("Must override .update() method");
    }

    if (this.deleteByCode === undefined) {
      throw new Error("Must override .delete() method");
    }
  }

  /**
   * list all organizations
   * @param {string[]} [select = ['*']] sql select columns
   * @returns {Promise<Organization[]>}
   */
  list(select = ["*"]) {}

  /**
   * add new organization
   * @param {object} data - organization data
   * @returns {Promise}
   */
  add(data) {}

  /**
   * update organization data by code
   * @param {string} code - organization code
   * @param {object} data - organization data
   * @returns {Promise}
   */
  updateByCode(code, data) {}

  /**
   * delete organization by code
   * @param {string} code
   * @returns {Promise}
   */
  deleteByCode(code) {}

  /**
   * filter rows by column value and select by array
   * @param {string} column
   * @param {string} value
   * @param {string[]} [select = ["*"]] select
   */
  filterByColumn(column, value, select = ["*"]) {}
}

module.exports = OrganizationInterface;
