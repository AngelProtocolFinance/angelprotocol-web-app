import React from 'react'

const StepsCard = ({ step }) => {
  return (
    <div className='steps_card flex     flex-col md:flex-row gap-[20px]  md:gap-[48px]  justify-between items-center  z-[399] pb-[68px]' >
      <div className="md:w-[299px] md:h-[299px] w-[209px] h-[209px] relative rounded-full bg-white overflow-hidden shadow-lg shadow-slate-200"><img src={step.img_src} alt="step1" className='h-full w-full   object-cover object-center '/></div>
        {/* <img src={step.img_src} alt="step1" className='h-[340px] w-[340px] scale-[.9] bg-white border-2  border-white z-50 rounded-full object-cover object-center '/> */}
        <span className='md:w-[50%] w-[100%]'>
        <h4 className='text-[#183244] text-center md:text-left text-[24px] md:text-[32px] leading-[40px] font-bold Quicksand'>{step.title}</h4>
        <p className='text-[16px] md:text-[20px] text-center md:text-left opacity-[1]  text-[#1D3C51] w-full  font-normal md:text-balance DM_Sans mt-4'>{step.description}</p>
        </span>
    </div>
  )
}

export default StepsCard
