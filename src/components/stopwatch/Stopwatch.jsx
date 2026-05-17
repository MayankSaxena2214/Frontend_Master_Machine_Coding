"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'

const Stopwatch = () => {
    const  [time,setTime]=useState(0);
    //becasue we need to identify whent the timer is started
    const stopWatchRef=useRef(null);

    //
    const intervalRef=useRef(null);

    
    const handlePause=()=>{
        clearInterval(intervalRef.current);
    }
    const handleReset=()=>{
        clearInterval(intervalRef.current);
        
        setTime(0);
    }
    const formatTime=()=>{
        //calcualtion for ms
        //98454ms => after removing the hour and min and second, 
        // the ms will be -> %1000 => 98454%1000 -> 454 ms 
        // but in ui we want to show upto two places only => 454/10=> 45 ms
        const ms = Math.floor((time % 1000) / 10)
  .toString()
  .padStart(2, "0");

const second = Math.floor(time / 1000 % 60)
  .toString()
  .padStart(2, "0");

const minute = Math.floor(time / (1000 * 60) % 60)
  .toString()
  .padStart(2, "0");

const hours = Math.floor(time / (1000 * 60 * 60))
  .toString()
  .padStart(2, "0");
        return `${hours}:${minute}:${second}:${ms}`;

    }
    const handleStart=()=>{
        //when started , store that time in the stopwatchref
        stopWatchRef.current=Date.now()-time;

        //interval ka reference 
        intervalRef.current=setInterval(()=>{
            setTime(Date.now()-stopWatchRef.current);
        },10);
    }

    const handleBlur=()=>{
        handlePause();
    }
    const handleFocus=()=>{
        handleStart();
    }
    useEffect(()=>{
        if(typeof window!='undefined'){
            window.addEventListener('blur',handleBlur);
            window.addEventListener('focus',handleFocus);
        }
        return ()=>{
            if(typeof window!='undefined'){
            window.removeEventListener('blur',handleBlur);
            window.removeEventListener('focus',handleFocus);
        }   
        }
    },[time]);
    
  return (
    <div className='flex flex-col gap-8 justify-center items-center'>
        <div className='text-6xl font-bold'>{formatTime()}</div>

        <div className="flex items-center gap-3">
            <Button onClick={handleStart}>Start</Button>
            <Button onClick={handlePause} variant={'outline'}>Pause</Button>
            <Button onClick={handleReset} variant={'destructive'}>Reset</Button>
        </div>
      
    </div>
  )
}

export default Stopwatch
