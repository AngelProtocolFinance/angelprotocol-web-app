import React from 'react'
import brand1 from "../../../../assets/landing/brand_1.svg"
import brand2 from "../../../../assets/landing/brand_2.svg"
import brand3 from "../../../../assets/landing/brand_3.svg"
import brand4 from "../../../../assets/landing/brand_4.svg"
import brand5 from "../../../../assets/landing/brand_5.svg"
import brand6 from "../../../../assets/landing/brand_6.svg"
import brand7 from "../../../../assets/landing/brand_7.svg"
const Brands = () => {
  return (
    <section className='flex items-center relative  mt-10  flex-col gap-[56px] py-[1.5rem]  md:py-[64px] mb-16  md:pt-0 md:pb-[110px] '>
       <h2 className='text-[32px] md:text-[42px] font-bold lg:w-[100%] w-[324px]  mx-auto px-1 md:w-[516px]  text-[#183244] text-center md:mx-auto   font-heading'>Trusted by impactful <br className='hidden lg:flex' /> nonprofits worldwide</h2>
      

        <div className=' absolute bg-[#ffff] h-[50%] w-[35%] z-[8] top-[56%] translate-y-[-50%] left-[-15%] blur-[70px]   rounded-full'></div>

        <div className='brands_container  whitespace-nowrap overflow-x-auto '>
           
            <div className='inline-block md:scale-[0]   whitespace-nowrap brands'>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand1} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand2} className='w-full h-full object-cover object-center' alt="{brand2}" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand3} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand4} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand5} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand6} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand7} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
        </div>

        <div className='inline-block md:scale-[0]  whitespace-nowrap brands'>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2 lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand1} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2 lg:h-28 md:h-24 md:w-28 w-24 h-20 md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand2} className='w-full h-full object-cover object-center' alt="{brand2}" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2 lg:h-28 md:h-24 md:w-28 w-24 h-20 md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand3} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2 lg:h-28 md:h-24 md:w-28 w-24 h-20 md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand4} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2 lg:h-28 md:h-24 md:w-28 w-24 h-20 md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand5} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2 lg:h-28 md:h-24 md:w-28 w-24 h-20 md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand6} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2 lg:h-28 md:h-24 md:w-28 w-24 h-20 md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand7} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
        </div>
       
        <div className='inline-block md:scale-[0]  whitespace-nowrap brands'>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2 lg:h-28 md:h-24 md:w-28 w-24 h-20 md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand1} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2 lg:h-28 md:h-24 md:w-28 w-24 h-20 md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand2} className='w-full h-full object-cover object-center' alt="{brand2}" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2 lg:h-28 md:h-24 md:w-28 w-24 h-20 md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand3} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2 lg:h-28 md:h-24 md:w-28 w-24 h-20 md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand4} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2 lg:h-28 md:h-24 md:w-28 w-24 h-20 md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand5} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2 lg:h-28 md:h-24 md:w-28 w-24 h-20 md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand6} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2 lg:h-28 md:h-24 md:w-28 w-24 h-20 md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand7} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
        </div>

        <div className='inline-block md:scale-[0]   whitespace-nowrap brands'>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand1} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand2} className='w-full h-full object-cover object-center' alt="{brand2}" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand3} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand4} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand5} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand6} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand7} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
        </div>

        <div className='inline-block md:scale-[0]   whitespace-nowrap brands'>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand1} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand2} className='w-full h-full object-cover object-center' alt="{brand2}" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand3} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand4} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand5} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand6} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
                <div className="brand-img-box lg:w-32 lg:ml-8 md:ml-3 ml-2  lg:h-28 md:h-24 md:w-28 w-24 h-20  md:scale-[0.8] lg:scale-[1] scale-[.85]  inline-block"><img src={brand7} className='w-full h-full object-cover object-center' alt="brand_1" /></div>
        </div>

       
          
   
        </div>

        <div className=' absolute bg-[#ffff] h-[50%] w-[35%] z-[8] top-[56%] translate-y-[-50%] right-[-15%] blur-[70px]   rounded-full'></div>

    </section>
  )
}

export default Brands