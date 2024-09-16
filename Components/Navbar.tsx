import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
    return (<>
        <nav className="w-screen min-h-[80px] text-white bg-gray-900 center" style={{padding: '0 2vw'}}>
            <Link href={'/'} className="absolute left-[10px]">Must_ak_khan</Link>
            <div className="flex gap-[50px]">
                {['Chats'].map(e=>{
                    return(
                        <Link key={e} href={'/'+e.toLocaleLowerCase()} className="flex items-center justify-center px-[10px] relative hover:after:w-full after:w-[90%] active:after:w-[80%] after:border-2 after:rounded-full after:transition-all after:duration-400 after:border-white after:bottom-0 before:border-2 hover:before:w-[80%] before:w-[50%] before:transition-all before:duration-400 active:before:w-[60%] before:bottom-[-6px] before:rounded-full ">{e}</Link>
                    )
                })}
            </div>
            <div className="absolute right-[10px] size-[50px] rounded-full bg-white overflow-hidden cursor-pointer">
                <img src={'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg'} width={50} height={50}/>
            </div>
        </nav>
    </>)
}