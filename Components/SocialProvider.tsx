import { signIn } from 'next-auth/react'
import React from 'react'

interface SocialProviderProps{
    provider: string
    icon : string
}
const SocialProvider:React.FC<SocialProviderProps> = ({provider,icon})=>{
  return (
    <button onClick={()=>{signIn("github")}} className='flex bg-white px-10 py-3 rounded-md gap-5 border-[.5px] border-gray-700 w-[25vw] cursor-pointer hover:bg-white hover:bg-opacity-70'>
      <img src={icon} alt="" width={25} />
      <span className='font-semibold text-gray-700'>Continue with {provider}</span>
    </button>
  )
}

export default SocialProvider
