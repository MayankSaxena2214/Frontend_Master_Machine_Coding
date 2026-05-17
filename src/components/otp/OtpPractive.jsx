"use client"
import React, { useRef, useState } from 'react'

const OtpPractive = ({count=4}) => {
    const [inputOtps,setInputOtps]=useState([]);
    const refs=useRef([]);
    const handleKeyUp=(index)=>{
        return (e)=>{
            const key=e.key;
            console.log("Key is:",key);
            
            const oldOtps=[...inputOtps];
            if(key=="Backspace"){
                oldOtps[index]='';
                setInputOtps(oldOtps);
                //focus backward
                handleMoveBackward(index);
                return;
            }

            if(key=="ArrowRight"){
                handleMoveForward(index);
                return;
            }
            if(key=="ArrowLeft"){
                handleMoveBackward(index);
                return;
            }
            if(isNaN(key)){
                return;
            }
            oldOtps[index]=key;
            setInputOtps(oldOtps);

            //move forward
            handleMoveForward(index);
        }
    }
    const handleMoveForward=(index)=>{
        if(refs.current[index+1]){
                refs.current[index+1]?.focus();
            }
    }
    const handleMoveBackward=(index)=>{
        if(refs.current[index-1]){
                    refs.current[index-1]?.focus();
                }
    }
    const handleClick=(index)=>{
        return (e)=>{
            e.target.setSelectionRange(1,1);
        }
    }
  return (
    <div className='flex items-stretch gap-4'>
      {
        Array.from({length:count}).map((_,index)=>{
            return <input
            onClick={handleClick(index)}
                onKeyUp={handleKeyUp(index)}
                key={index}
                className='w-10 border px-3 py-2 rounded-xl'
                value={inputOtps[index] ?? ""}
                ref={(iRef)=>refs.current[index]=iRef}
            />
        })
      }
    </div>
  )
}

export default OtpPractive
