import Chatbox, { Loading } from "@/Components/Chatbox";
import Navbar from "@/Components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Head from "next/head";


export default function ChatBot() {
    const [chat, setChat] = useState([])
    const name = useRouter().query.slug 

    useEffect(() => {
        fetch(`${window.location.origin}/api/chat/getchat`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name })
        }).then((chat) => chat.json()).then((chat) => setChat(chat))
    }, []);

    async function saveChat(chats) {
        let res = await fetch(`${window.location.origin}/api/chat/saveChat`, {
            method: 'post',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({ name, chats })
        });
        console.log(await res.json())
    }

    const callApi = async () => {
        let msg = document.getElementById('msg').value
        setChat([...chat, { msg, pos: 'end' }])
        if (!msg) {   
            setChat([...chat, { msg, pos: 'end' }, { msg: <Loading />, pos: 'start' }])
            setTimeout(()=>setChat([...chat, { msg, pos: 'end' }, { msg: 'Please provide me some content !!! ', pos: 'start' }]),1000)
            return saveChat([...chat, { msg, pos: 'end' }, { msg: 'Please provide me some content !!! ', pos: 'start' }]);
        }

        let loading = setTimeout(() => {
            setChat([...chat, { msg, pos: 'end' }, { msg: <Loading />, pos: 'start' }])
        }, 500);

        let res = await fetch(`${window.location.origin}/api/gemini/${msg}`)
        res = await res.json()

        clearTimeout(loading);
        setChat([...chat, { msg, pos: 'end' }, { msg: res.res, pos: 'start' }])
        return saveChat([...chat, { msg, pos: 'end' }, { msg: res.res, pos: 'start' }]);
    }

    useEffect(() => {
        let msgBox = document.getElementById('chatBox')
        msgBox.scroll({ top: msgBox.scrollHeight, behavior: 'smooth' })
    }, [chat]);

    

    return (<>
        <Head>
            <title>Chat-{name}</title>
        </Head>
        <div className="flex flex-col relative w-screen h-screen overflow-hidden">
            <Navbar />
            <main className="bg-black w-full h-full flex items-center flex-col gap-5">
                <div id="chatBox" className="w-[80%] max-sm:w-full max-h-[70%] min-h-[70%] flex flex-col gap-2 p-5 overflow-y-scroll overflow-x-hidden" style={{ scrollbarWidth: 'none' }}>
                    {chat.map((e, i) => {
                        return (
                            <Chatbox key={i} msg={e.msg} pos={e.pos} />
                        )
                    })}
                </div>
                <div className="flex w-[80%] relative overflow-hidden rounded-full h-[60px]">
                    <textarea id="msg" className="resize-none w-4/5 bg-white h-full px-[30px] py-[18px] overflow-scroll" placeholder="Enter text here" style={{ scrollbarWidth: 'none' }}></textarea>
                    <button className="center text-white w-1/5 bg-sky-600" onClick={() => callApi()}>Send</button>
                </div>
            </main>
        </div>
    </>)
}