import MyProfile from '@/components/accountPage/myProfile/MyProfile'
import React from 'react'

const page = async() => {
  return (
    <div className='px-body sm:px-[10%] w-full'>
        <MyProfile />
    </div>
  )
}

export default page