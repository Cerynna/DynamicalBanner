const { makeID } = require("../tools");
module.exports = {
  def: {
    text: {
      id: makeID(),
      x: 0,
      y: 100,
      font: "bold 50pt Menlo",
      textAlign: "left",
      fillStyle: "#000000",
      value: "TEXT",
    },
    twitter: {
      id: makeID(),
      x: 0,
      y: 0,
      value: "",
    },
    background: {
      id: makeID(),
      x: 0,
      y: 0,
      value: "",
    },
  },
  new(type = "text", data = false) {
    console.log("NEW", type, data);
    let widget = { ...this.def[type], type };
    if (data[type]) widget.value = data[type];
    return widget;
  },
};
