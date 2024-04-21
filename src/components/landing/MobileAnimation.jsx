import React, { useEffect } from 'react'
import "../../styles/landing/MobileAnimation.css"
import StepsCard from './StepsCard'
import roadmap1 from "../../assets/landing/roadmap1_wb.webp";
import roadmap2 from "../../assets/landing/roadmap2_wb.webp";
import roadmap3 from "../../assets/landing/roadmap3_wb.webp";
import roadmap4 from "../../assets/landing/roadmap4_wb.webp";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const MobileAnimation = () => {


  const steps = [
    {
      "img_src": roadmap1,
      "title": "The Gift That Keeps On Giving",
      "description": "Donors can choose a portion of their donation to go into the Sustainability Fund, allowing it to grow and provide ongoing support to the nonprofit of their choice - forever."
    },
    {
      "img_src": roadmap2,
      "title": "Simple, Sustainable Growth",
      "description": "The Sustainability Fund is owned and managed by Better Giving and invested into a balanced portfolio to protect and grow over time - no admin work or liability for nonprofits."
    },
    {
      "img_src": roadmap3,
      "title": "Reliable Funding Stream",
      "description": "Sustainability Fund growth is paid out quarterly, providing nonprofits with a new source of recurring revenue - consistent funding that doesn’t rely on donation cycles."
    },
    {
      "img_src": roadmap4,
      "title": "Result:",
      "description": "Better Giving provides nonprofits with a simple path to financial stability while giving donors a way to amplify their impact, ensuring their gift continues to provide support - not just today, but every day."
    }
  ];
  return (

    <div className='md:hidden mobile_animation  h-full w-full  relative overflow-visible'>
 
<div className="  w-full h-full relative mt-5 ">


   <div className='relative   top-0 h-full flex flex-col   justify-between px-[15px]'>
   
   <svg width="360" className=' opacity-[.8] absolute top-0 left-0 object-fill object-center ' height="1990" viewBox="0 0 360 1990" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M161.498 1947C238.403 1623.72 551.514 1994.07 522.051 1629.42C492.587 1264.78 69.1127 1506.29 3.19453 1152.1C-62.7237 797.919 391.712 786.51 379.727 535.49C367.742 284.47 98.0809 417.111 -2.79612 226.945C-103.673 36.7785 47.6725 28.2255 153.309 23" stroke="url(#paint0_linear_1054_18924)" strokeWidth="46" strokeLinecap="round"/>
<defs>
<linearGradient id="paint0_linear_1054_18924" x1="42.1468" y1="42.008" x2="83.7127" y2="1924.94" gradientUnits="userSpaceOnUse">
<stop stop-color="#FEFBFC"/>
<stop offset="0.0747417" stop-color="#F1ECFD"/>
<stop offset="0.195424" stop-color="#FEFBFC"/>
<stop offset="0.324275" stop-color="#ECF2FD"/>
<stop offset="0.508205" stop-color="#FEFBFC"/>
<stop offset="0.626472" stop-color="#ECFBFD"/>
<stop offset="0.754949" stop-color="#ECF2FD"/>
<stop offset="0.896279" stop-color="#ECF2FD"/>
<stop offset="1" stop-color="#FEFBFC"/>
</linearGradient>
</defs>
</svg>

   <h4 className=' text-[14px] z-[33] font-bold z w-full mx-auto text-[#3c91cb] text-center mb-[65px]   font-heading'>SIMPLE PATH TO FINANCIAL STABILITY</h4>
  <div className="bg-[#fbf8f9]   w-full h-[120px] absolute top-10 blur-[15px] -z-1"> </div>
    <h2 className=' text-[32px] font-bold z-[88] -mt-10  w-[95%] mb-14  text-[#183244] text-center mx-auto    z-20  font-heading'>Make a Lasting Impact: Give Today, Give Forever</h2>
    
    {
      steps.map((step,idx)=>{
        return <StepsCard key={idx} step={step} />
      })
    }
    </div>
    

    </div>

</div>
  )
}

export default MobileAnimation