import React from 'react'

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="text-white flex justify-center items-center flex-col my-[7rem] gap-4">
        <h1 className="font-bold text-5xl">Buy Me a Drink</h1>
        <p>
          A crowdfunding platform for creators. Get funded by your fans and
          followers.
        </p>
        <div className="flex gap-x-5">
          <button className="btn-blue w-max">Start Now</button>
          <button className="btn-lime w-max">Read More</button>
        </div>
      </div>
      <div className="h-1 bg-white opacity-15"></div>
      <div className="mt-[3.5rem]">
        <h2 className="text-white text-center font-inter font-bold text-2xl">
          Your Fans Can Buy a Drink
        </h2>
        <div className="text-white flex justify-evenly gap-x-5 my-5">
          <div className="flex flex-col justify-center items-center w-[25vw] glass p-7">
            <img src="fund.png" alt="" width={80} />
            <h5 className="my-3 text-white font-semibold tracking-wide">Grow Financially</h5>
            <p className="text-gray-400">
              Start Growing Financilly is the first in the list of success of the people who have completed their lives.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-[25vw] glass p-7">
            <img src="mutual-fund.png" alt="" width={80} />
            <h5 className="my-3 text-white font-semibold tracking-wide">Fans Want To Help</h5>
            <p className="text-gray-400">
              Your fans want to help you to grow and you can do that by getting started here.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-[25vw] glass p-7">
            <img src="saving.png" alt="" width={80} />
            <h5 className="my-3 text-white font-semibold tracking-wide">Fund Yourself</h5>
            <p className="text-gray-400">
              You start a small service here so that you can get funds and fund yourself. Good Luck
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
