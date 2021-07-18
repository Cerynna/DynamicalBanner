const { createCanvas, Image } = require("canvas");

const fs = require("fs");
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const { UserTwitter } = require("./services/twitter");
const { Canvas } = require("./tools");

const User = require("./models/User");
const Banner = require("./models/Banner");
const Widget = require("./models/Widget");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend/public")));
app.use("/banner", express.static(path.join(__dirname, "../banner")));

app.post("/twitter/find", async (req, res) => {
  //   console.log(req.body);
  let { screen_name } = req.body;
  let user_twitter = await UserTwitter.info(screen_name);
  if (user_twitter) {
    return res.json(user_twitter);
  }

  return res.json(false);
});

app.post("/user/signon", async (req, res) => {
  let verif = await User.verif(req.body, true);
  if (!verif.error) {
    let user = await User.set(req.body);
    return res.json(user);
  } else {
    return res.json(verif);
  }
});

app.post("/user/login", async (req, res) => {
  let verif = await User.verif(req.body);
  if (!verif.error) {
    return res.json(await User.find("name", req.body.name));
  } else {
    return res.json(verif);
  }
});

app.get("/img/:userId", async (req, res) => {
  let { userId } = req.params;
  let banner = await Banner.find("user", userId);

  // console.log(result.widgets)

  const width = 1500;
  const height = 500;

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.fillStyle = "#00ffff";
  context.fillRect(0, 0, width, height);
  // console.log(banner.background)
  if (banner.background) {
    if (typeof banner.background === "boolean") {
      const img = new Image();
      img.onload = () => context.drawImage(img, 0, 0);
      img.onerror = (err) => {
        throw err;
      };
      img.src = "../banner/D-jnKUPU4AE3hVR.jpeg";
    }
    if (typeof banner.background === "string") {
      const img = new Image();
      img.onload = () => context.drawImage(img, 0, 0);
      img.onerror = (err) => {
        throw err;
      };
      img.src = `../banner/${banner.background}`;
    }
  }

  if (banner) {
    banner.widgets.forEach(async (widget) => {
      switch (widget.type) {
        case "text":
          Canvas.Text.write(context, widget, banner);
          break;
        case "twitter":
          if (banner.lastUpdate + 1000 * 30 <= Date.now() || !banner.twitter) {
            Banner.updateTwitter(banner, widget.value);
          }
          break;
        case "background":
          if (!banner.background) {
            banner.background = true;
            await Banner.set(banner, false);
            // Banner.updateTwitter(banner, widget.value);
          }
          break;
        default:
          break;
      }
    });
  }

  const buffer = canvas.toBuffer("image/png");
  res.contentType("image/jpeg");
  res.end(buffer, "binary");
});

app.post("/banner/new", async (req, res) => {
  let { user } = req.body;
  let verif = await Banner.find("user", user);
  if (!verif) {
    res.json(await Banner.set(false, user));
  } else {
    res.json(false);
  }
});

app.get("/banner/:userId", async (req, res) => {
  let { userId } = req.params;
  let result = await Banner.find("user", userId);
  res.json(result ? result : false);
});

app.post("/banner/:userId", async (req, res) => {
  let { userId } = req.params;
  let banner = req.body;
  let result = await Banner.find("user", userId);
  if (result) {
    Banner.set(banner);
    res.json(true);
  } else {
    res.json(false);
  }
});
app.get("/background/list", async (req, res) => {
  fs.readdir("../banner", (err, files) => {
    res.json(files);
  });
});

app.post("/widget/add", async (req, res) => {
  let { user, type, ...data } = req.body;
  let banner = await Banner.find("user", user);
  console.log(banner);
  if (banner) {
    let widget = Widget.new(type, data);
    console.log(widget);
    banner.widgets.push(widget);
    Banner.set(banner, false);
    res.json(banner);
  } else {
    res.json(false);
  }
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
