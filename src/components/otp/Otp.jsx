"use client"
import React, { useRef, useState } from 'react'

const Otp = ({ count }) => {
    const [inputOtps, setInputOtps] = useState(new Array(count).fill(""));
    const refs = useRef([]);
    const handleKeyUp = (index) => {
        return (event) => {
            const key = event.key;
            console.log("Key is:", key);
          
            const oldOtps = [...inputOtps];
            if(key=="Backspace"){
                oldOtps[index]='';
                setInputOtps(oldOtps);
                //focus prev
                handleMoveFocusLeft(index,oldOtps);
                return;
            }
            if(key=="ArrowRight"){
                handleMoveFocusRight(index,oldOtps);
                return;
            }

            if(key=="ArrowLeft"){
                handleMoveFocusLeft(index,oldOtps);
                return;
            }
              if (isNaN(key)) {
                console.log("Returning");
                return;
            }

            oldOtps[index] = key;
            setInputOtps(oldOtps);

            //move focus to next
            handleMoveFocusRight(index,oldOtps);
        }
    }
    const handleMoveFocusRight=(index)=>{
        if(refs.current[index+1]){
            //focus to the next empty slot instad of just right
            refs.current[index+1]?.focus();
        }
    }
    const handleMoveFocusLeft=(index)=>{
        if(refs.current[index-1]){

           refs.current[index-1]?.focus();
        }
    }
    //reason for handleclick function
    //basially when we click on input in which already written 
    //i.e. - |3  ( default the pointer comes left)
    // but we want the pointer on right
    //i.e. - 3|
    const handleClick=(index)=>{
        return (event)=>{
            event.target.setSelectionRange(1,1);
        }
    }
    return (
        <div className='flex items-center gap-3'>
            {
                Array.from({ length: count }).map((_, index) => {
                    return <input
                        onKeyUp={handleKeyUp(index)}
                        value={inputOtps[index] ?? ""}
                        className='px-3 py-2 rounded-md border w-10'
                        type="text"
                        key={index}
                        onClick={handleClick(index)}
                        ref={(iRef)=>{refs.current[index]=iRef}}
                    />
                })
            }
        </div>
    )
}

export default Otp
