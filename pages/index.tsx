import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className="center flex-col justify-center gap-5 w-screen h-screen text-white bg-black">
        <div>BUILD BY MUSTAK KHAN</div>
        <Link
          href={"/chats"}
          className="flex items-center justify-center z-[1] text-white hover:text-black transition-all duration-500 hover:bg-white border-2 px-20 text-5xl py-3 overflow-hidden after:rounded-full rounded-full relative after:w-[50%] hover:after:w-full after:h-full after:bg-white after:z-[-1] after:translate-y-full hover:after:translate-y-0 after:transition-all after:duration-500"
        >
          Start
        </Link>
      </main>
    </>
  );
}
