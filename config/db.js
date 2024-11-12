const mongoose = require("mongoose");

const dbURI = process.env.DB_URI || "Please add your database uri here";
const dbName = process.env.DB_NAME || "Please add your database name";

const dbConfig = {
  connect: () => {
    mongoose
      .connect(dbURI, {
        dbName,
      })
      .then(() => {
        console.log("Connected to database: ", dbName);
      })
      .catch((error) => {
        console.error("Error connecting to database: ", error);
      });
  },
};

module.exports = dbConfig;
