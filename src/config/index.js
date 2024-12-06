const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path: configFile });
} else {
    console.log("Hello");
    dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT
};
