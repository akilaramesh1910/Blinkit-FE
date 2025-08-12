import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state => state?.user)
  return (
    <section className='bg-white'>
        <div className='container mx-auto p-3 grid md:grid-cols-[250px_1fr]'>
          {/* left */}
            <div className='py-4 sticky top-24 max-h-[calc(100vh - 100px)] overflow-y-auto border-r'>
              <UserMenu />
            </div>

            {/* right */}
            <div className='bg-white min-h-[80vh]'>
              <Outlet />
            </div>
        </div>
    </section>
  )
}

export default Dashboard