import React, { useState } from 'react'

const LIST_HEIGHT=400;
const ROW_HEIGHT=52;

const VirtualListPractice = ({data,renderRow}) => {
    const [scrollTop,setScrollTop]=useState(0);
    const startIndex=Math.max(Math.floor(scrollTop/ROW_HEIGHT),0);
    const endIndex=Math.min(Math.floor((scrollTop+LIST_HEIGHT)/ROW_HEIGHT),data.length);

    const handleScroll=(e)=>{
        setScrollTop(e.target.scrollTop)
        
    }
    const listHeight=`${LIST_HEIGHT}px`;
    const rowHeight= `${ROW_HEIGHT}px`;
  return (
   <div className='flex flex-col gap-8'>
     <div style={{
        height:listHeight
    }} onScroll={handleScroll} className='relative overflow-y-auto border'>
        <div style={{
            height:`${ROW_HEIGHT*data.length}px`
        }}>
        {
            data.slice(startIndex,endIndex).map((item,index)=>{
                return <div key={index} style={{
                    height:rowHeight,
                    top:(startIndex+index)*ROW_HEIGHT
                }} className='absolute border w-full'>
                    {renderRow(item)}
                </div>
            })
        }
        </div>
    </div>
    <div className="text-center text-xl font-bold">
        s {startIndex} e{endIndex}
    </div>
   </div>
  )
}

export default VirtualListPractice
