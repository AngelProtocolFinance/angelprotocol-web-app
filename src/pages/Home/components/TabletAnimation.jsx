import React, { useEffect } from 'react'
import "../styles/TabletAnimation.css"
import StepsCard from './StepsCard'

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


const TabletAnimation = () => {

  // useEffect(() => {
  //   gsap.defaults({ ease: "none" });

  //   const tab = gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: "#svg5",
  //         scrub: 0.4,
  //         start: "top 40%",
  //         end: "bottom 40%",
  //       },
  //       duration: 20,
  //     })
  //     .from(".line1", { duration: 10 }, 0)
  //     .to(
  //       ".dot",
  //       {
  //         motionPath: {
  //           path: ".line1",
  //           align: ".line1",
  //           alignOrigin: [0.5, 0.5],
  //         },
  //         duration: 15,
  //       },
  //       0
  //     )

  // },[])
  
  const steps = [
    {
      "img_src": "/roadmap1_wb.webp",
      "title": "The Gift That Keeps On Giving",
      "description": "Donors can choose a portion of their donation to go into the Sustainability Fund, allowing it to grow and provide ongoing support to the nonprofit of their choice - forever."
    },
    {
      "img_src": "/roadmap2_wb.webp",
      "title": "Simple, Sustainable Growth",
      "description": "The Sustainability Fund is owned and managed by Better Giving and invested into a balanced portfolio to protect and grow over time - no admin work or liability for nonprofits."
    },
    {
      "img_src": "/roadmap3_wb.webp",
      "title": "Reliable Funding Stream",
      "description": "Sustainability Fund growth is paid out quarterly, providing nonprofits with a new source of recurring revenue - consistent funding that doesn’t rely on donation cycles."
    },
    {
      "img_src": "/roadmap4_wb.webp",
      "title": "Result:",
      "description": "Better Giving provides nonprofits with a simple path to financial stability while giving donors a way to amplify their impact, ensuring their gift continues to provide support - not just today, but every day."
    }
  ];

  return (

    <div className='hidden md:block lg:hidden tablet_animation relative'>
    {/* <h4 className=' md:text-[18px] font-bold mb-5  md:w-full   text-[#3c91cb] text-center md:mx-auto   Quicksand'>FUELING DREAMS, NURTURING HOPE</h4>
    <h2 className=' md:text-[40px] font-bold   md:max-w-[65%]   text-[#183244] text-center md:mx-auto leading-[60px]   Quicksand'>Better Giving's Path to Philanthropic Excellence</h2> */}
    
   
   <div className=" bg relative mt-5">

   <svg id='svg5'  xmlns="http://www.w3.org/2000/svg" width="360" height="1781" viewBox="0 0 387 1781" fill="none">

   
    

<path className="line1   opacity-[.8] " d="M338.463 45.3655C200.497 -20.9994 -14.9573 74.0563 -6.99955 225.5C0.958218 376.944 351 305.5 363 569.5C375 833.5 39.5 953 93 1221C146.5 1489 309.5 1459.5 303.5 1757.5" stroke="url(#paint0_linear_1039_8357)" strokeWidth="46"  strokeLinecap="round"/>
<defs>
  <linearGradient id="paint0_linear_1039_8357" x1="205" y1="-24" x2="112.358" y2="1754.58" gradientUnits="userSpaceOnUse">
    <stop stopColor="#FEFBFC"/>
    <stop offset="0.133358" stopColor="#F1ECFD"/>
    <stop offset="0.311758" stopColor="#FEFBFC"/>
    <stop offset="0.364207" stopColor="#ECF2FD"/>
    <stop offset="0.528306" stopColor="#ECF2FD"/>
    <stop offset="0.753451" stopColor="#ECFBFD"/>
    <stop offset="1" stopColor="#FEFBFC"/>
  </linearGradient>
</defs>



    </svg>
     {/* <div class="dot dot1">
     
     </div> */}
     <div className='absolute top-0 h-full flex flex-col   justify-between  px-[32px]'>
     <h4 className=' md:text-[18px] font-bold md:w-full      text-[#3c91cb] text-center md:mx-auto   Quicksand'>SIMPLE PATH TO FINANCIAL STABILITY</h4>
    <div className="bg-[#fbf8f9] md:w-[65%] h-[120px] absolute top-10 left-36 blur-[15px] -z-1"> </div>
      <h2 className=' md:text-[40px] font-bold   md:max-w-[70%] mt-2 mb-10  text-[#183244] text-center md:mx-auto leading-[60px]  z-20  Quicksand'>Make a Lasting Impact: Give Today, Give Forever</h2>
      {
        steps.map((step,idx)=>{
          return <StepsCard key={idx} step={step} />
        })
      }
      
        {/* <StepsCard />
        <StepsCard />
        <StepsCard />
        <StepsCard /> */}
      
     </div>

   </div>

  </div>


    //this is previous one 
    
  //   <div className='hidden md:block lg:hidden tablet_animation relative'>
  //     {/* <h4 className=' md:text-[18px] font-bold mb-5  md:w-full   text-[#3c91cb] text-center md:mx-auto   Quicksand'>FUELING DREAMS, NURTURING HOPE</h4>
  //     <h2 className=' md:text-[40px] font-bold   md:max-w-[65%]   text-[#183244] text-center md:mx-auto leading-[60px]   Quicksand'>Better Giving's Path to Philanthropic Excellence</h2> */}
      
     
  //    <div className=" bg relative mt-5">

  //    <svg id='svg5'  xmlns="http://www.w3.org/2000/svg" width="360" height="1781" viewBox="-10 -20 387 1781" fill="none">
  
     
			
  
  // <path className="line1   opacity-[.8] " d="M338.463 45.3655C200.497 -20.9994 -14.9573 74.0563 -6.99955 225.5C0.958218 376.944 351 305.5 363 569.5C375 833.5 39.5 953 93 1221C146.5 1489 309.5 1459.5 303.5 1757.5" stroke="url(#paint0_linear_1039_8357)" strokeWidth="46"  strokeLinecap="round"/>
  // <defs>
  //   <linearGradient id="paint0_linear_1039_8357" x1="205" y1="-24" x2="112.358" y2="1754.58" gradientUnits="userSpaceOnUse">
  //     <stop stopColor="#FEFBFC"/>
  //     <stop offset="0.133358" stopColor="#F1ECFD"/>
  //     <stop offset="0.311758" stopColor="#FEFBFC"/>
  //     <stop offset="0.364207" stopColor="#ECF2FD"/>
  //     <stop offset="0.528306" stopColor="#ECF2FD"/>
  //     <stop offset="0.753451" stopColor="#ECFBFD"/>
  //     <stop offset="1" stopColor="#FEFBFC"/>
  //   </linearGradient>
  // </defs>



  //     </svg>
  //      {/* <div class="dot dot1">
       
  //      </div> */}
  //      <div className='absolute top-0 h-full flex flex-col   justify-between  px-[38px]'>
  //      <h4 className=' md:text-[18px] font-bold md:w-full      text-[#3c91cb] text-center md:mx-auto   Quicksand'>FUELING DREAMS, NURTURING HOPE</h4>
  //     <div className="bg-[#fbf8f9] md:w-[65%] h-[120px] absolute top-10 left-36 blur-[15px] -z-1"> </div>
  //       <h2 className=' md:text-[40px] font-bold   md:max-w-[70%] -mt-10  text-[#183244] text-center md:mx-auto leading-[60px]  z-20  Quicksand'>Better Giving's Path to Philanthropic Excellence</h2>
  //       {
  //         steps.map((step,idx)=>{
  //           return <StepsCard key={idx} step={step} />
  //         })
  //       }
        
  //         {/* <StepsCard />
  //         <StepsCard />
  //         <StepsCard />
  //         <StepsCard /> */}
        
  //      </div>

  //    </div>

  //   </div>
  )
}

export default TabletAnimation