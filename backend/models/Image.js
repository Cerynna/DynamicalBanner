const ImageDB = new Keyv("sqlite://db/image.sqlite", {
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});
const { makeID } = require("../tools");

module.exports = {
  async set(base64) {
    return await ImageDB.set(makeID(), base64);
  },
  async get(id) {
    return await ImageDB.get(id);
  },
};
