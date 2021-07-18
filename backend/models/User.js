const Keyv = require("keyv");
const { makeID } = require("../tools");
const UsersDB = new Keyv("sqlite://db/users.sqlite", {
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});

const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = {
  def: {
    id: { type: "number", length: "3", required: true },
    name: { type: "string", length: "3", required: true },
    password: { type: "string", length: "3", required: true },
    mail: {
      type: "string",
      length: "3",
      regex:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      required: false,
    },
    lastupdate: { type: "date", required: true, required: false },
    delete: { type: "booleen", default: false, required: false },
  },
  async verif(user, create = false) {
    let { name, password, passwordbis } = user;
    if (create) {
      if (password !== passwordbis)
        return {
          error: "Les password ne corresponde pas",
          inputs: ["password", "passwordbis"],
        };
      let verifName = await this.find("name", name);
      if (verifName) {
        return {
          error: "Ce login est déjà utilisé",
          inputs: ["name"],
        };
      }
      if (name.length <= 3) {
        return {
          error: "Login pas assez long",
          inputs: ["name"],
        };
      }
      if (password.length <= 3) {
        console.log(password.length);
        return {
          error: "Password pas assez long",
          inputs: ["password"],
        };
      }
    } else {
      let verifUser = await this.find("name", name);
      if (!verifUser) {
        return {
          error: "Ce login est n'existe pas",
          inputs: ["name"],
        };
      }
      if (!bcrypt.compareSync(user.password, verifUser.password)) {
        return {
          error: "Le password est faux",
          inputs: ["password"],
        };
      }
    }
    return true;
  },
  async get(userId) {
    return await UsersDB.get(userId);
  },
  async set(user) {
    user.password = bcrypt.hashSync(user.passwordbis, saltRounds);
    delete user.passwordbis;
    user.id = makeID();
    return await UsersDB.set(user.id, user);
  },
  async delete(user, force = false) {
    if (force) {
      return await UsersDB.delete(user.id);
    }
    user.delete = true;
    return await UsersDB.set(user.id, user);
  },
  async all() {
    let request = `SELECT * FROM keyv;`;
    let datas = await UsersDB.opts.store.query(request);
    datas = datas.map((data) => {
      return JSON.parse(data.value).value;
    });
    return datas.reverse();
  },
  async find(field = "name", value) {
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
    return await UsersDB.clear();
  },
};

module.exports = User;
