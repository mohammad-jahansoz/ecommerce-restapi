const redis = require("redis");
const client = redis.createClient();

client
  .connect()
  .then(async (res) => {
    console.log("connect redis successfully");
  })
  .catch((err) => {
    console.log("err happened" + err);
  });

module.exports = client;
