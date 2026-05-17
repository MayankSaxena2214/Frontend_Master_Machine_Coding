"use client"
import React, { useState } from 'react'
const LIST_HEIGHT=400;
const ROW_HEIGHT=52;
const OVERSCAN_COUNT=10;
const VirtualList = ({data,renderRow}) => {
    const [scrollTop,setScrollTop]=useState(0);
    
    const startIndex = Math.max(
  Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN_COUNT,
  0
);

const endIndex = Math.min(
  Math.floor((scrollTop + LIST_HEIGHT) / ROW_HEIGHT) + OVERSCAN_COUNT,
  data.length
);

    const listHeight=`${LIST_HEIGHT}px`;
    const rowHeight=`${ROW_HEIGHT}px`;
    const handleScroll=(e)=>{
        
        setScrollTop(e.target.scrollTop);
    }

    const renderableItems=data.slice(startIndex,endIndex);
    console.log("Renderable items are :",renderableItems);

  return (
    <div>
        <div onScroll={handleScroll} style={{height:listHeight}} className='relative overflow-y-auto overflow-x-hidden  border'>
            <div style={{
                height:`${data.length*ROW_HEIGHT}px`
            }}>

            {
                data.slice(startIndex,endIndex).map((item,index)=>{
                    return <div style={{height:rowHeight,
                        top:`${(startIndex+index)*ROW_HEIGHT}px`
                    }} className='absolute rounded-md ' key={index}>{renderRow(item)}</div>
                })
            }
            </div>
        </div>
        <div className="text-lg text-center font-bold">
            s {startIndex} e{endIndex}
        </div>
    </div>
  )
}

export default VirtualList
