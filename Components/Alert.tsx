"use client"
import React, { useState } from "react";

const Alert = ({ alertMsg, time }) => {
  const [display, setdisplay] = useState(time>0?true:false)
  if(display){
    setTimeout(() => {
      setdisplay(false)
    }, time);
  }
  return (
    <div className={display?"fixed text-white z-[5000]  top-20 right-10 rounded-md bg-green-400":"hidden"}>
      <div className="flex relative items-center justify-between min-w-[15vh] min-h-[3rem] px-5">
        <h5 className="mr-3">{alertMsg}</h5>
        <button className={`border-solid border-white border-[1px] px-2 h-max $`} onClick={()=>setdisplay(false)}>X</button>
      </div>
      <div className="min-h-1 mx-[1px] bg-white alert"></div>
    </div>
  );
};

export default Alert;
