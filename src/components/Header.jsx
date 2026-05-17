import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className="flex items-center border justify-between px-10 py-4 ">
          <Link href={'/'} className="text-4xl font-bold">React Machine Coding </Link>
        </div>
  )
}

export default Header
