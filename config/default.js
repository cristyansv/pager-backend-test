const organizationModule = require("../modules/Organization");

const mysql = require("mysql");

const client = {
  db: null,
  query: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      client.db.query(sql, params, (error, results, fields) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  }
};

function createClient() {
  return new Promise((resolve, reject) => {
    client.db = mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_PORT || "pager",
      password: process.env.DB_PASSWORD || "pager",
      database: process.env.DB_DATABASE || "pager"
    });

    client.db.connect(error => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

const organizationController = new organizationModule.OrganizationController(
  new organizationModule.OrganizationService(
    new organizationModule.OrganizationRepositorySQL(client)
  )
);

const modules = [organizationModule.routes(organizationController)];

function createTable() {
  const sql = `
CREATE TABLE IF NOT EXISTS organization
(
  name varchar(200),
  description varchar(5000),
  url varchar(2000),
  code varchar(200),
  type enum('employer', 'insurance', 'health system'),
  UNIQUE KEY(code)
);
`;
  return new Promise((resolve, reject) => {
    client.db.query(sql, errors => {
      if (errors) {
        return reject(errors);
      }

      resolve();
    });
  });
}

module.exports = {
  organizationModule: {
    controller: organizationController
  },
  beforeReady: [
    { exc: createClient.bind(this), args: [] },
    { exc: createTable.bind(this), args: [] }
  ],
  registerRoutes: server => {
    modules.forEach(module => {
      server.route(module);
    });
  }
};
