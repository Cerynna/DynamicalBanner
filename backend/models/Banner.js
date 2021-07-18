const Keyv = require("keyv");
const { makeID } = require("../tools");
const BannerDB = new Keyv("sqlite://db/banner.sqlite", {
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});
const _ = require("lodash");
const { UserTwitter } = require("../services/twitter");

const Banner = {
  async get(id) {
    return await BannerDB.get(id);
  },
  async set(banner = false, user = false) {
    if (!banner && user) {
      banner = {
        id: makeID(),
        user,
        background: true,
        widgets: [
          {
            id: makeID(),
            type: "background",
            x: 0,
            y: 0,
            value: "",
          },
          {
            id: makeID(),
            type: "text",
            x: 0,
            y: 100,
            font: "bold 70pt Menlo",
            value: "TEXT",
            font: "",
            size: "",
            style: "",
          },
        ],
      };
    }
    banner.widgets = _.orderBy(banner.widgets, ["type"], ["asc"]);
    return await BannerDB.set(banner.id, banner);
  },
  async delete(banner) {
    return await BannerDB.delete(banner.id);
  },
  async all() {
    let request = `SELECT * FROM keyv;`;
    let datas = await BannerDB.opts.store.query(request);
    datas = datas.map((data) => {
      return JSON.parse(data.value).value;
    });
    return datas.reverse();
  },
  async find(field = "user", value) {
    let finder = await this.all();
    if (typeof value === "string") {
      finder = finder.find((user) => {
        return user[field] == value;
      });
    }
    if (typeof value === "object") {
      finder = finder.filter((user) => {
        return value.includes(user[field]);
      });
    }
    return finder;
  },
  async clear() {
    return await BannerDB.clear();
  },
  async updateTwitter(banner, user) {
    let user_twitter = await UserTwitter.info(user);
    banner.twitter = {
      followers_count: user_twitter.followers_count,
      friends_count: user_twitter.friends_count,
    };
    banner.lastUpdate = Date.now();
    await Banner.set(banner, false);
  },
};

module.exports = Banner;
