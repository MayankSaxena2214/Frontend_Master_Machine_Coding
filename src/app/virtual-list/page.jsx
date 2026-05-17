"use client"
import CodeViewer from '@/components/CodeViewer';
import VirtualList from '@/components/virtuallist/VirtualList'
import Image from 'next/image';
import React from 'react'

const data=Array.from({length:100000}).map((_,index)=>index);
const page = () => {
  return (
    <div className='flex flex-col gap-8 p-4'>
        <div className='flex flex-col gap-4'>
            <div className='text-2xl font-semibold '>Requirements for Virtual List</div>
            <ul className='text-lg flex gap-2 list-disc flex-col ml-3'>
                The Problem. - Demo

                <li>1. Create a component which renders items only visible in the visible area. And when user scrolls the page/section update the list.</li>
                <li>2. Terminologies: ScrollTop, ClientHeight, ScrollHeight</li>
                <li>3. User should be able to pass his own JSX for each row.</li>

                
            </ul>

            <div className='flex flex-col gap-3'>
                <div className='text-2xl font-semibold'>Understanding Basic Terms</div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center text-lg gap-2">
                        <div className="font-medium">1. Client Height :</div>
                        <div>It is the fixeed height of hte scrollable container</div>
                    </div>
                    <div className="flex items-center text-lg gap-2">
                        <div className="font-medium">2. Scroll Height :</div>
                        <div>It is the total scrollable height of hte container containg the lot of content</div>
                    </div>
                    <div className="flex items-center text-lg gap-2">
                        <div className="font-medium">3. Scroll Top :</div>
                        <div>How much we have scrolled from the top</div>
                    </div>
                    <div className="flex items-center text-lg gap-2">
                        <div className="font-medium">4. Remaining Scroll : </div>
                        <div>Remainng height of hte content which is ready to scroll. ie. ScrollHeight-(scrolltop + clientHeight)</div>
                    </div>

                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <div className='text-2xl font-semibold'>Virtual List Challenges</div>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <div>1. How to find Start Index ?</div>
                        <div>With the help of scrollTop  we can do it.</div>
                    </div>

                    <div className="flex flex-col gap-2">
                         <div>
2. If we have fixed container, how will we
make it scrollable ?</div>
                        <div></div>
                    </div>
                   
                </div>
            </div>

            
            <div className="flex flex-wrap items-stretch gap-3">
                <Image className='h-150 w-120 ' src={'/virtuallist.png'} alt='' width={300} height={800}/>
                <Image className='h-150 w-120 ' src={'/vl2.png'} alt='' width={300} height={800}/>
            </div>

            <div className='flex flex-col gap-3'>
                <div className='text-2xl font-semibold'>Solution 1</div>
                <ul className="flex flex-col gap-2 list-disc ml-5">

<li className="text-lg">Make virtual-list of fixed size and row-height of fixed size. (const LIST_HEIGHT=400;
const ROW_HEIGHT=52;)</li>

<li className="text-lg">Attach scroll event to virtual-list (div onScroll=handleScroll)</li>

<li className="text-lg">Using scrollTop find the startIndex and endIndex {JSON.stringify(`const handleScroll=(e)=>{
        
        setScrollTop(e.target.scrollTop);
    }  const startIndex=Math.max(Math.floor(scrollTop/ROW_HEIGHT),0); // it could be negative also and could be in decimal
    const endIndex=Math.min(Math.floor((scrollTop+LIST_HEIGHT)/ROW_HEIGHT),data.length); // it could be negative also and could be in decimal
`)}</li>

<li className="text-lg">Use the startIndex and endIndex to show the data ( data.slice(startIndex,endIndex).map((item,in)</li>

<li className="text-lg">Use CSS to maintain positioning (parent relative and child as absolute )</li>

<li className="text-lg">Use startIndex and index to find right position</li>
<li className="text-lg">Make virtual-list scrollable without adding any content.</li>
<li className="text-lg">Implement overscanning for smoother scrolling</li>
                </ul>
            </div>



        </div>
        <div className='flex flex-col gap-5'>
            <div className='text-2xl font-semibold'>Working code but no extra added items up and bottom ( lack of smoothness in scroll)</div>

<CodeViewer
  code={String.raw`"use client"
import React, { useState } from 'react'

const LIST_HEIGHT = 400;
const ROW_HEIGHT = 52;

const VirtualList = ({ data, renderRow }) => {
    const [scrollTop, setScrollTop] = useState(0);

    const startIndex = Math.max(
        Math.floor(scrollTop / ROW_HEIGHT),
        0
    );

    const endIndex = Math.min(
        Math.floor((scrollTop + LIST_HEIGHT) / ROW_HEIGHT),
        data.length
    );

    const listHeight = \${LIST_HEIGHT}px\;
    const rowHeight = \${ROW_HEIGHT}px\`;

    const handleScroll = (e) => {
        setScrollTop(e.target.scrollTop);
    };

    const renderableItems = data.slice(startIndex, endIndex);

    console.log("Renderable items are :", renderableItems);

    return (
        <div>
            <div
                onScroll={handleScroll}
                style={{ height: listHeight }}
                className='relative overflow-y-auto overflow-x-hidden border'
            >
                <div
                    style={{
                        height: \${data.length * ROW_HEIGHT}px\`
                    }}
                >
                    {
                        data.slice(startIndex, endIndex).map((item, index) => {
                            return (
                                <div
                                    style={{
                                        height: rowHeight,
                                        top: \${(startIndex + index) * ROW_HEIGHT}px\`
                                    }}
                                    className='absolute rounded-md'
                                    key={index}
                                >
                                    {renderRow(item)}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default VirtualList;
`}
/>
        </div>

         <div className='flex flex-col gap-5'>
            <div className='text-2xl font-semibold'>OVERSCAN LOGIC TO MAKE THE STARTINDEX AND ENDINDEX LOOSE TO REMOVE FLICKERING AND BRING SMOOTHER SCROLL</div>

<CodeViewer
  code={String.raw`"use client"
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
  
      const listHeight=\`LIST_HEIGHT}px
      const rowHeight=\`ROW_HEIGHT}px;
      const handleScroll=(e)=>{
          
          setScrollTop(e.target.scrollTop);
      }
  
      const renderableItems=data.slice(startIndex,endIndex);
      console.log("Renderable items are :",renderableItems);
  
    return (
      <div>
          <div onScroll={handleScroll} style={{height:listHeight}} className='relative overflow-y-auto overflow-x-hidden  border'>
              <div style={{
                  height:data.length*ROW_HEIGHT}px
              }}>
  
              {
                  data.slice(startIndex,endIndex).map((item,index)=>{
                      return <div style={{height:rowHeight,
                          top:(startIndex+index)*ROW_HEIGHT}px
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
  `}
/>
        </div>
        <VirtualList renderRow={(item)=>{
            return item;
        }} data={data}/>
    </div>
  )
}

export default page
