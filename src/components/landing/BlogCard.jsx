import React, { useEffect, useState } from 'react'
import CRUDButtons from './CRUDButtons'
import { Link } from "react-router-dom"
import DOMPurify from 'dompurify';
import useGetBlogs from '../../../../constants/useGetBlogs.js';


const BlogCard = ({ blog,imgUrl }) => {

    const sanitize = (dirtyHTML) => {
        const cleanHtml = DOMPurify.sanitize(dirtyHTML, {
            ALLOWED_TAGS: ['p', 'span', 'b', 'i', 'u'] 
          })

        return cleanHtml
    }



    return (
        <div className='w-full md:w-full h-[460px] borderLine flex flex-col gap-3 pb-[20px] rounded-[18px] relative blog_card overflow-hidden bg-white font-body'>
        <img src={imgUrl} alt="thumbnail" className='rounded-t-[18px] object-fill object-center  h-[179px]' />
        
     
        <div className='flex gap-2 px-[24px]'>
        </div>
        <h4 className='text-[#0D283A] font-semibold w-full text-xl line-clamp-2  px-[24px]' dangerouslySetInnerHTML={{__html:(blog.title.rendered)}}/>
        <p className='text-[#0D283A] text-[14px] lg:text-[16px] md:text-[16px] line-clamp-4 px-[24px]  tracking-[.8px]  text w-full  ' id='desc'
            dangerouslySetInnerHTML={{ __html: sanitize(blog?.excerpt?.rendered) }} />
        
        <a href={`https://better.giving/${blog.slug}/`} className='self-end mt-auto  text-[#2D89C8] px-4  py-2 rounded-full  font-semibold uppercase'>Read More</a>
    </div>


       
    )
}




export default BlogCard