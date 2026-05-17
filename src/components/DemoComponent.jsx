"use client"
import toastService from '@/services/ToastService'
import React from 'react'
import { Button } from './ui/button'

const DemoComponent = () => {
  return (
    <div>
        <Button onClick={()=>{
          toastService.sendToast({title:"Hi toast",description:"Hello from another world"})
        }}>Toast from another world</Button>
    </div>
  )
}

export default DemoComponent
