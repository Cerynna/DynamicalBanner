const Twitter = require("twitter");
const config = require("./config.json");
const client = new Twitter(config);

module.exports = {
  UserTwitter: {
    info: async (screen_name = "cerynna") => {
      return await client.get("users/show", { screen_name }).catch(() => {
        return false;
      });
    },
  },
};
