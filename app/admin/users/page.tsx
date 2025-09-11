import React from 'react'
import RenderUserTable from './_components/RenderUserTable'

const page = () => {
  return (
    <section className='my-16 w-full h-screen'>
      <div className="cont">
        <h1 className='text-3xl font-bold font-mono'>Users List</h1>
        <RenderUserTable />
      </div>
    </section>
  )
}

export default page