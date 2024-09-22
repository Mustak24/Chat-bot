import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function (msg) {
  const apiKey = "AIzaSyCLNIQrAIppHq_h0zbkUSQTcFLj0X_bDcM";
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const chatSession = model.startChat();

  try {
    let result = await chatSession.sendMessage(msg);
    return result.response.text();
  } catch (e) {
    console.log(e);
    return "Some Internal Problem Occured !!!";
  }
}
