import Navbar from "@/Components/Navbar";
import Link from "next/link";
import Head from "next/head";
import { Card01 } from "@/Components/Chatbox";
import chatData from "@/Data/Chat.json";

export default function Chats() {
  async function deleteChat(chatName) {
    let res = await fetch(`${window.location.origin}/api/chat/delete`, {
      method: "post",
      body: JSON.stringify({ chatName }),
      headers: { "content-type": "application/json" },
    });
    console.log(await res.json());
  }

  return (
    <>
      <Head>
        <title>Chats</title>
      </Head>
      <div className="flex flex-col w-screen h-screen overflow-hidden">
        <Navbar />
        <main className="w-screen h-full bg-black flex flex-col items-center gap-5 p-10">
          <div className="w-full relative h-full max-sm:flex-col flex flex-wrap gap-[20px] p-10">
            <Link
              href={{
                pathname: `chat`,
                query: { name: "New Chat", chat: JSON.stringify([]) },
              }}
            >
              <Card01
                title="New Chat"
                dec="Click for start new chat with chat-bot."
              />
            </Link>
            {Object.keys(chatData).map((e) => {
              return (
                <div
                  key={e}
                  className="center w-fit h-fit overflow-hidden rounded-[15px]"
                >
                  <Link href={{ pathname: "/chat", query: { name: e } }}>
                    <Card01 title={e} dec={chatData[e].dec} />
                  </Link>
                  <button
                    onClick={() => deleteChat(e)}
                    className="size-[20px] transition-all duration-50 active:scale-95 hover:scale-[1.1] absolute top-2 right-2 before:size-1 before:bg-red-500 before:opacity-30 before:right-[-10px] before:top-[-10px] before:rounded-full hover:before:shadow-[0_0_100px_30px_red]"
                  >
                    <img
                      src="Delete icon.png"
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
