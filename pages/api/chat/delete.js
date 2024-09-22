const fs = require("fs");

export default function (req, res) {
  let data = require("@/Data/Chat.json");
  delete data[req.body.chatName];
  fs.writeFile("./Data/Chat.json", JSON.stringify(data), (e) => {
    if (!e) return res.send({ res: `${req.body.chatName} file was deleted` });
    console.log(e);
    return res.status(500).send({ res: "Internal server problem comes !!! " });
  });
}
