// import Image from "next/image";

export function Dustbin(props) {
  return (
    <>
      <img src={"https://img.icons8.com/?size=100&id=104401&format=png&color="+props.color} style={{objectFit: 'contain', width: '100%', height: '100%'}}/>
    </>
  );
}
