"use client"
import NotificationCard from '@/components/NotificationCard'
import { Button } from '@/components/ui/button'
import { useNotification } from '@/ToastContext/ToastProvider'
import React, { useState } from 'react'

const page = () => {
  const addNotification=useNotification();
  const showToast=()=>{
    addNotification({
      title:"Hi There",
      description:"How are you ?"
    })
  }
  return (
    <div className='flex flex-col items-start p-10'>
     
      <Button onClick={showToast}>Show Toast</Button>
    </div>
  )
}

export default page
