import Navbar from "@/Components/Navbar"
import { use, useEffect, useState } from "react"
import Link from "next/link"
import Head from "next/head"

export default function Chats() {
    const [chats, setChats] = useState([])
    const [newChat, setChat] = useState('')

    useEffect(() => {
        fetch(`http://${window.location.host}/api/chat/getallchat`)
            .then((chat) => chat.json())
            .then((chat) => setChats(chat))
        console.log(chats)
    }, [])


    return (<>
        <Head>
            <title>Chats</title>
        </Head>
        <div className="flex flex-col w-screen h-screen overflow-hidden">
            <Navbar />
            <main className="w-screen h-full bg-black flex flex-col items-center gap-5 p-10">
                <div className="center w-[60%] max-sm:w-[90%] flex-col gap-5 " >
                    <input className="w-full h-[40px] rounded-full px-[15px]" type="text" placeholder="Enter your Chat Name" id="newchat" onChange={(e) => setChat(e.target.value)} required />
                    <Link href={'chats/' + newChat} className="w-full h-[40px] border-2 rounded-full text-white center hover:bg-sky-600">Open New Chat</Link>

                </div>

                <div className="w-full relative h-full max-sm:flex-col flex flex-wrap gap-[20px] p-10">
                    {chats.map((e) => {
                        return (
                            <Link key={e} href={`chats/${e}`} className="border-2 w-[250px] h-[80px] rounded-full center text-white">{e}</Link>
                        )
                    })}
                </div>
            </main>
        </div>
    </>)
}