"use client"
import SocialProvider from '@/Components/SocialProvider'
import { providers } from '@/data'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function page() {
  const { data: session } = useSession();
  
  if (session && session.user) {
    const router = useRouter();
    router.push("/dashboard");
  }
  return (
    <div className='text-white my-5'>
        <h1 className='text-center text-3xl font-bold'>Login To get your fans to support you</h1>
        <div className='flex justify-center items-center my-[3rem] flex-col gap-3'>
            {
                providers.map(({id,Name,icon})=>{
                    return <div key={id}>
                      <SocialProvider provider={Name} icon={icon}/>
                    </div> 
                })
            }
        </div>
    </div>
  )
}

export default page
