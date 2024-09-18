import Navbar from "@/Components/Navbar"
import { use, useEffect, useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { Card01 } from "@/Components/Chatbox"
import { Dustbin } from "@/Components/Img"

export default function Chats() {
    const [chats, setChats] = useState([])
    const [newChat, setChat] = useState('')

    function re(){
        fetch(`${window.location.origin}/api/chat/getallchat`)
            .then((chat) => chat.json())
            .then((chat) => setChats(chat))
    }

    useEffect(() => {
        re();
        console.log(chats)
    }, [])

    async function deleteChat(chatName){
        let res = await fetch(`${window.location.origin}/api/chat/delete`, {
            method: 'post',
            body: JSON.stringify({chatName}),
            headers: {'content-type': 'application/json'}
        })
        console.log(res);
        re();
    }

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
                            <div key={e} className="center w-fit overflow-hidden rounded-[15px]"> 
                                <Link href={`chats/${e}`}>
                                    <Card01 title={e} dec="about college bot, for software enggiring project file" /> 
                                </Link>
                                <button onClick={()=>deleteChat(e)} className="size-[20px] transition-all duration-50 active:scale-95 hover:scale-[1.1] absolute top-2 right-2 before:size-1 before:bg-red-500 before:opacity-30 before:right-[-10px] before:top-[-10px] before:rounded-full hover:before:shadow-[0_0_100px_30px_red]">
                                    <Dustbin color='E94F4F'/>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    </>)
}