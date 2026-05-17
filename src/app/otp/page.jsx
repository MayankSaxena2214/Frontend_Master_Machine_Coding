import CodeViewer from '@/components/CodeViewer'
import Otp from '@/components/otp/Otp'
import OtpPractive from '@/components/otp/OtpPractive'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-8 p-4'>
        <div className='flex flex-col gap-4'>
            <div className='text-2xl font-semibold '>Requirements for Otp component</div>
            <ul className='text-lg flex gap-2 list-disc flex-col ml-3'>
                <li>Tab to switch the input</li>
                <li>Handle keys</li>
                <li>Handle backspacee</li>
                <li>Paste event</li>
                <li>Switch between input based on requiremt ( i.e. if 3,2, ,4 & we press tab from first position then we should move to the emptiest one)</li>
            </ul>

            <div className='flex flex-col gap-3'>
                <div className='text-2xl font-semibold'>Approach and general component</div>
                <div>1.Count will be given for the number of length of otp</div>
                <div>2.On otp complete functon will be given</div>
                <div>3. Ref list</div>
            </div>
        </div>

        {/* <OtpPractive/> */}

        <CodeViewer
            code={String.raw`"use client"
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
            `}
        />
        <Otp 
        count={4}
        
        />
    </div>
  )
}

export default page
