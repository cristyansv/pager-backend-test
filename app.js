const Hapi = require("@hapi/hapi");

const utils = require("./utils/utils");
const config = require("./config/default");

const init = async () => {
  const server = Hapi.server({
    port: process.env.APP_PORT || 3000,
    host: "0.0.0.0"
  });

  await utils.beforeReady(config.beforeReady);
  config.registerRoutes(server);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
