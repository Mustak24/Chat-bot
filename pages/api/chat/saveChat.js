const fs = require("fs");
import GeminiApi from "@/Functions/GeminiApi.js";

export default async function (req, res) {
  let { name, chats } = req.body;
  let chatData = require("@/Data/Chat.json");
  if (!chats.length) return res.send({ res: "File have no data for save." });
  if (name == "New Chat") {
    name = await GeminiApi(
      `Give one name in sort don't explain only give name in normal font of this chat Data ${JSON.stringify(
        chats.slice(0, 5)
      )}`
    );
    name = name.split(" ");
    name = name.length > 2 ? name.slice(0, 2).join(" ") : name[0];
    let dec = await GeminiApi(
      `Give summery in sort in normal font of this chat Data ${JSON.stringify(
        chats.slice(0, 5)
      )}`
    );
    chatData[name] = { data: chats, dec };
  } else {
    chatData[name].data = chats;
  }
  fs.writeFile("./Data/Chat.json", JSON.stringify(chatData), (e) => {
    if (!e) return res.send({ res: `${name} chat saved.`, name });
    console.log("Error : ", e);
    return res.send({
      res: `${name} fail to save due to Internal servar error !!!`,
    });
  });
}
