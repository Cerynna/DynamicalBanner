module.exports = {
  // Crée un ID aléatoire
  makeID() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  },
  // Return un INT compri entre min et max
  randomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
  },
  Canvas: {
    Text: {
      write(ctx, data, banner) {
        // console.log(banner);
        let text = data.value ? data.value : "error";

        if (banner.twitter) {
          if (/\[(.*?)\]/.test(text)) {
            let shortcode = text.match(/\[(.*?)\]/)[1].split(".");
            // text = banner[shortcode[0]][shortcode[1]];
            text = banner.twitter[shortcode[1]];
          }
        }
        let font = `${data.style} ${data.size}pt ${data.family}`;

        ctx.font = font;

        data.textAlign
          ? (ctx.textAlign = data.textAlign)
          : (ctx.textAlign = "left");
        data.fillStyle
          ? (ctx.fillStyle = data.fillStyle)
          : (ctx.fillStyle = "#000000");
        ctx.fillText(text, data.x, data.y);
      },
    },
  },
};
