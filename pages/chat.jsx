import Chatbox, { Loading } from "@/Components/Chatbox";
import Navbar from "@/Components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import GeminiApi from "@/Functions/GeminiApi";
import chatData from "@/Data/Chat.json";

export default function ChatBot() {
  const router = useRouter();

  const [name, setName] = useState(router.query.name);
  const [chat, setChat] = useState(chatData?.[name]?.data || []);

  async function saveChat(chats) {
    let res = await fetch(`${window.location.origin}/api/chat/saveChat`, {
      method: "post",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ name, chats }),
    });
    res = await res.json();
    setName(res.name);
  }

  async function callApi() {
    let msg = document.getElementById("msg").value;
    document.getElementById("msg").value = "";

    setChat([...chat, { msg, pos: "end" }]);

    if (!msg) {
      setChat([
        ...chat,
        { msg, pos: "end" },
        { msg: <Loading />, pos: "start" },
      ]);
      setTimeout(
        () =>
          setChat([
            ...chat,
            { msg, pos: "end" },
            { msg: "Please provide me some content !!! ", pos: "start" },
          ]),
        1000
      );
      return saveChat([
        ...chat,
        { msg, pos: "end" },
        { msg: "Please provide me some content !!! ", pos: "start" },
      ]);
    }

    let loading = setTimeout(() => {
      setChat([
        ...chat,
        { msg, pos: "end" },
        { msg: <Loading />, pos: "start" },
      ]);
    }, 500);

    let res = navigator.onLine
      ? await GeminiApi(msg)
      : "No Internet connection";

    clearTimeout(loading);
    setChat([...chat, { msg, pos: "end" }, { msg: res, pos: "start" }]);
    return saveChat([...chat, { msg, pos: "end" }, { msg: res, pos: "start" }]);
  }

  useEffect(() => {
    let msgBox = document.getElementById("chatBox");
    msgBox.scroll({ top: msgBox.scrollHeight, behavior: "smooth" });
  }, [chat]);

  return (
    <>
      <Head>
        <title>Chat-{router.query.name}</title>
      </Head>
      <div className="flex flex-col relative w-screen h-screen overflow-hidden">
        <Navbar />
        <main className="bg-black w-full h-full flex items-center flex-col gap-5">
          <div
            id="chatBox"
            className="w-[80%] max-sm:w-full max-h-[70%] min-h-[70%] flex flex-col gap-2 p-5 overflow-y-scroll overflow-x-hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {chat.map((e, i) => {
              return <Chatbox key={i} msg={e.msg} pos={e.pos} />;
            })}
          </div>
          <div className="flex w-[80%] relative overflow-hidden rounded-full h-[60px]">
            <textarea
              id="msg"
              className="resize-none w-4/5 bg-white h-full px-[30px] py-[18px] pb-[10px] overflow-scroll"
              placeholder="Enter text here"
              style={{ scrollbarWidth: "none" }}
              onKeyDown={(e) => (e.key == "shift" ? callApi() : "")}
            ></textarea>
            <button
              className="center text-white w-1/5 bg-sky-600"
              onClick={() => callApi()}
            >
              Send
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
