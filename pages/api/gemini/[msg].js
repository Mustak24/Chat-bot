
import { GoogleGenerativeAI } from "@google/generative-ai"

export default async function (req, res) {
  console.log(req.query)
  const apiKey = 'AIzaSyCLNIQrAIppHq_h0zbkUSQTcFLj0X_bDcM';
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  const chatSession = model.startChat();
  let result = await chatSession.sendMessage(req.query.msg);
  res.send({ res: result.response.text() })
}