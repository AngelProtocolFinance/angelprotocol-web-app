import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";

const Button = (props) => {
  return (
    <button className='px-8 py-3.5  bg-[#2D89C8] text-white rounded-[40px] font-semibold text-base flex items-center  gap-1 Quicksand self-center'>
        {props.text}
        <FaArrowRightLong  size={20} className=' ml-1'/>
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <path d="M4.5 12H20.5" stroke="white" stroke-width="2" stroke-linecap="square"/>
  <path d="M20.5 12C16.0817 12 12.5 8.41828 12.5 4" stroke="white" stroke-width="2" stroke-linecap="square"/>
  <path d="M20.5 12C16.0817 12 12.5 15.5817 12.5 20" stroke="white" stroke-width="2" stroke-linecap="square"/>
</svg> */}
    </button>
  )
}

export default Button