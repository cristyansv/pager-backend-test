/**
 * generate SQL insert string
 * @param table
 * @param data
 * @returns {Array}
 */
function generateInsertQuery(table, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const replaces = new Array(values.length).fill("?");

  return [
    `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${replaces.join(", ")})`,
    values
  ];
}

/**
 * generate update SQL string by column
 * @param {string} table
 * @param {string} column
 * @param {string} value
 * @param {object} data
 * @returns {[string, Array]}
 */
function generateUpdateQuery(table, column, value, data) {
  const pairs = Object.keys(data).map(name => {
    return `${name}=?`;
  });

  const values = Object.values(data);

  return [
    `UPDATE ${table} SET ${pairs.join(", ")} WHERE ${column}=${value}`,
    values
  ];
}

/**
 * generate SQL string to delete a row by column
 * @param {string} table
 * @param {string} column
 * @param {string} value
 * @returns {string} sql string
 */
function generateDeleteQuery(table, column, value) {
  return `DELETE FROM ${table} where ${column}=${value}`;
}

/**
 * generate SQL string to get a row by column
 * @param table
 * @param {Object} filters
 * @param {string} operator
 * @param select
 * @returns {(string|*[])[]}
 */
function generateGetByColumn(table, filters, operator = "AND", select) {
  const columns = Object.keys(filters).map(filter => {
    return `${filter}  = ?`;
  });

  const values = Object.values(filters);

  const where = columns.join(` ${operator} `);

  return [`SELECT ${select.join(", ")} FROM ${table} WHERE ${where}`, values];
}

/**
 * get all rows by table
 * @param {string} table
 * @param {Array} [select = ['*']] select
 * @returns {string} sql string
 */
function generateGetAll(table, select = ["*"]) {
  return `SELECT ${select.join(", ")} FROM ${table}`;
}

/**
 * receives an array of functions and arguments that will execute sequentially,
 * especially useful when one of the steps requires the previous one to be completed.
 * If any of the steps can be run in parallel, another array can be passed.
 * example: [ sequential, [ parallel, parallel ], sequential ]
 * @param {(Object | Array)[]} config
 * @returns {Promise<void>}
 */
const beforeReady = async config => {
  try {
    for (const func of config) {
      if (Array.isArray(func)) {
        await Promise.all(
          func.map(element => {
            return element.exc(...element.args);
          })
        );
      } else {
        await func.exc(...func.args);
      }
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  beforeReady,
  generateInsertQuery,
  generateUpdateQuery,
  generateDeleteQuery,
  generateGetByColumn,
  generateGetAll
};

function generateQuerySql(table) {}
