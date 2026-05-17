import Otp from '@/components/otp/Otp'
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
        <Otp 
        count={4}
        
        />
    </div>
  )
}

export default page
