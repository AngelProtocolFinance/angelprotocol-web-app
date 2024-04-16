import React from 'react'
import CRUDButtons from './CRUDButtons'

const TestimonialCard = (props) => {
  return (
                             // md:w-[350px]
    <div className={`relative md:w-full  md:min-h-[450px] lg:w-full lg:min-h-[450px] w-full min-h-[430px] p-[12px] pt-[62px] borderLine rounded-3xl flex flex-col justify-between bg-white   DM_Sans  overflow ${props.className}`}>
      {props.role==="ADMIN" && <CRUDButtons handleDelete={props.handleDelete} id={props.id} />}
        {/* <img src={`${process.env.REACT_APP_API_HOST}/uploads/${props.reviewer_logo}`} alt="logo" className='h-[80px] w-[80px] absolute top-[-30px] left-[35px] rounded-xl object-cover object-center  bg-white  bg-slate-500'/> */}
        {/* <img src={props.reviewer_logo} alt="logo" className='h-[80px] w-[80px] absolute top-[-30px] left-[35px] rounded-xl object-cover object-center  bg-white  bg-slate-500'/> */}
        <div className=" w-[130px] h-[130px]   absolute top-[-10%] left-[20px] ">
        <img src={props.reviewer_logo} alt="logo" className='w-full h-full object-cover '/> 
        </div>
        <p className='lg:text-[18px] md:text-[18px] text-[17px] h-[270px] mt-8 text-ellipsis overflow-x-hidden font-normal w-full break-words  opacity-[.8]'>{props.review || "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level."}</p>
        <span>
            <p className='text-lg opacity-90 font-bold'>{props.reviewer || "Amber Olive"}</p>
            <p className='lg:text-lg md:text-lg text-[16px] font-medium opacity-75'>{props.reviewer_profession || "Associate director, Australia Aid"}</p>
        </span>
    </div>
  )
}

export default TestimonialCard

// //<div className={`relative md:w-full   lg:w-full lg:min-h-[450px] w-full min-h-[410px] p-[28px] pt-[62px] border border-solid rounded-[28px] flex flex-col justify-between bg-white   DM_Sans  overflow ${props.className}`}>
// {props.role==="ADMIN" && <CRUDButtons handleDelete={props.handleDelete} id={props.id} />}
// {/* <img src={`${process.env.REACT_APP_API_HOST}/uploads/${props.reviewer_logo}`} alt="logo" className='h-[80px] w-[80px] absolute top-[-30px] left-[35px] rounded-xl object-cover object-center  bg-white  bg-slate-500'/> */}
// {/* <img src={props.reviewer_logo} alt="logo" className='h-[80px] w-[80px] absolute top-[-30px] left-[35px] rounded-xl object-cover object-center  bg-white  bg-slate-500'/> */}
// <div className=" w-[108px] h-[108px]   absolute top-[-11%] left-[20px] ">
// <img src={props.reviewer_logo} alt="logo" className='w-full h-full object-fill object-center '/> 
// </div>
// <p className='lg:text-[20px] md:text-[18px] text-[16px] mt-3  overflow-x-hidden font-normal w-[250px] lg:w-[320px] md:w-[320px] bg-yellow-500  text-[#1D3C51]   opacity-[.8]'>{props.review || "We are in love with the easy process Better Giving has created to start an endowment. We always focused on recurring giving with donors. This takes it to the next level."}</p>
// <span >
//     <p className='text-lg text-[#0D283A]  font-bold'>{props.reviewer || "Amber Olive"}</p>
//     <p className='lg:text-lg md:text-lg text-[16px] text-[#1D3C51] font-medium opacity-[.8]'>{props.reviewer_profession || "Associate director, Australia Aid"}</p>
// </span>
// </div>