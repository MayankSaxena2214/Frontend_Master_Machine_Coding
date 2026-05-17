import Link from 'next/link'
import React from 'react'

const page = () => {
  const items=[
    {
      name:"Toast",
      url:"/toast"
    },
    {
      name:"Popover Component",
      url:"/toast"
    },
    {
      name:"Otp",
      url:"/otp"
    },
    {
      name:"Virtual List",
      url:"/virtual-list"
    }
  ]
  return (
    <div className='flex flex-col gap-5 px-6 py-4'>
      <div className="flex justify-between items-center">
        <div className='text-2xl font-semibold'>Machine Coding</div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {
          items.map((item,index)=>{
            return <div key={index} className='border rounded'>
              <div className="h-50 bg-gray-200 flex justify-center items-center font-medium text-3xl">
                {item.name}
              </div>
              <div className='p-3 flex justify-center text-blue-500 items-center font-medium'>
                <Link href={item.url}>View</Link>
                
              </div>
            </div>
          })
        }
      </div>
      
    </div>
  )
}

export default page
