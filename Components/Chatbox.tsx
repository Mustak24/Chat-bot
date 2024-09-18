import { useState } from "react";

export default function (props: { msg: string; pos: string }) {
  return (
    <>
      <pre
        style={{ alignSelf: props.pos }}
        className="bg-white center text-black center max-w-[70%] max-sm:max-w-[80%] p-[10px] h-fit rounded-[30px] text-pretty animate_comeFromDown"
      >
        {props.msg}
      </pre>
    </>
  );
}

export function Loading() {
  return (
    <>
      <div className="bg-white text-black center w-[100px] animate_comeFromDown h-[30px] rounded-full">
        {[1, 2, 3].map((i) => {
          return (
            <span className="relative center size-[20px]">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
                style={{
                  animationDelay: `${5 * i}00ms`,
                  animationDuration: `2s`,
                }}
              ></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          );
        })}
      </div>
    </>
  );
}

export function Card01(props: { title: string; dec: string }) {
  const [iscardHover, setcardHover] = useState(false);
  return (
    <>
      <div
        key={props.title}
        className="center overflow-hidden w-[200px] h-[100px] rounded-[12px] bg-[#18181b] after:border-2 after:border-sky-500 after:h-[85px] hover:after:left-[10px] after:left-[8px] after:duration-100 after:transition-all after:rounded-full before:size-[1px] before:bg-[rgb(225,225,225,.1)] before:rounded-full before:left-0 before:top-0 hover:before:shadow-[0_0_100px_50px_rgb(225,225,255,.3)] before:transition-all duration-[1s]"
        onMouseEnter={() => setcardHover(true)}
        onMouseLeave={() => setcardHover(false)}
      >
        <div className="flex flex-col w-full h-full gap-[5px] px-[20px] py-[10px]">
          <div
            className="text-sky-500 text-lg font-semibold transition-all duration-200"
            style={{ transform: `translateX(${iscardHover ? 2 : 0}px)` }}
          >
            {props.title}
          </div>
          <p
            className="text-gray-400 text-sm transition-all duration-300"
            style={{ transform: `translateX(${iscardHover ? 3 : 0}px)` }}
          >
            {props.dec.length<40?props.dec:props.dec.slice(0,40) + ' ...'}
          </p>
        </div>
      </div>
    </>
  );
}
