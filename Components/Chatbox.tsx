export default function (props: { msg: string, pos: string }) {
    return (<>
        <pre style={{ alignSelf: props.pos }} className="bg-white center text-black center max-w-[70%] max-sm:max-w-[80%] p-[10px] h-fit rounded-[30px] text-pretty animate_comeFromDown">{props.msg}</pre>
    </>)
}

export function Loading() {
    return (<>
        <div className="bg-white text-black center w-[100px] animate_comeFromDown h-[30px] rounded-full">
            {[1, 2, 3].map((i) => {
                return (<span className="relative center size-[20px]">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" style={{ animationDelay: `${5*i}00ms`, animationDuration: `2s` }}></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>)
            })}
        </div>
    </>)
}