const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path: configFile });
} else {
    console.log("Hello");
    dotEnv.config();
}

module.exports = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  CLIENTID: process.env.CLIENT_ID,
  CLIENTSECRET: process.env.CLIENT_SECRET,
  JWT_SECRET: process.env.JWT_SECRET
};
