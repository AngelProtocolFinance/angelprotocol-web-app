import React, { useEffect, useState } from 'react'
import CRUDButtons from './CRUDButtons'
import { Link } from "react-router-dom"
import DOMPurify from 'dompurify';
import useGetBlogs from '../hooks/useGetBlogs.js';


const BlogCard = ({ blog,imgUrl }) => {

    const sanitize = (dirtyHTML) => {
        const cleanHtml = DOMPurify.sanitize(dirtyHTML, {
            ALLOWED_TAGS: ['p', 'span', 'b', 'i', 'u'] // Add other allowed tags as needed
          })

        return cleanHtml
    }



    // console.log("Test1",blog)
//  console.log("Test2",imgUrl)

    return (
                             //md:w-[350px]
        <div className='w-full md:w-full h-[460px] borderLine flex flex-col gap-3 pb-[20px] rounded-[18px] relative blog_card overflow-hidden bg-white DM_Sans'>
        <img src={imgUrl} alt="thumbnail" className='rounded-t-[18px] object-fill object-center  h-[179px]' />
        
      {/* <h4>{imgUrl}</h4> */}
        <div className='flex gap-2 px-[24px]'>
            {/* {blog?.categories.map((category, index) => (
                <p key={index} className='text-[#2D89C8] text-[14px] font-bold mt-4 uppercase Quicksand'>{category.name}</p>
            ))} */}
        </div>
        <h4 className='text-[#0D283A] font-semibold w-full text-xl line-clamp-2  px-[24px]' dangerouslySetInnerHTML={{__html:(blog.title.rendered)}}/>
        <p className='text-[#0D283A] text-[14px] lg:text-[16px] md:text-[16px] line-clamp-4 px-[24px]  tracking-[.8px]  text w-full  ' id='desc'
            dangerouslySetInnerHTML={{ __html: sanitize(blog?.excerpt?.rendered) }} />
        {/* <p className='text-[#0D283A] text-[14px] line-clamp-3 px-[24px]'>
            {sanitize(blog.excerpt.rendered)}
        </p> */}
        <a href={`https://better.giving/${blog.slug}/`} className='self-end mt-auto  text-[#2D89C8] px-4  py-2 rounded-full  font-semibold uppercase'>Read More</a>
    </div>


        // <div  className='w-50 md:w-[350px] h-[460px] border border-solid flex flex-col gap-3 pb-[24px] rounded-[18px] relative blog_card overflow-hidden bg-white  DM_Sans'>
        //     {/* {role==="ADMIN" && <CRUDButtons handleDelete={handleDelete} id={id}/>} */}

           
        //     <img src={blog?.featured_media?.source_url} alt="thumbnail" className='rounded-t-[18px]  max-h-[200px]'/>
        //     <div className='flex gap-2 px-[24px]'>
        //         {blog?.category?.map((category, index) => {
        //              return  <p  key={index} className='text-[#2D89C8] text-[14px] font-bold mt-4 uppercase Quicksand'>{category}</p> 
        //         }
        //               )}
        //     </div>
            
        //     <h4 className='text-[#0D283A] font-bold text-xl line-clamp-2  px-[24px]'>{blog.title.rendered}</h4>
        //     <p className='text-[#0D283A] text-[14px] line-clamp-3 mx-[24px] text-justify text  w-full overflow-hidden' id='desc'
        //     dangerouslySetInnerHTML={{ __html: sanitize(blog?.description) }} 
            
        //     />
        //     <p className='text-[#0D283A] text-[14px] line-clamp-3 px-[24px]'>
        //         {/* {discription} */}{blog._links.self[0].href}
        //     </p>
        //     <Link to={blog.link} className='self-end mt-auto px-[24px] text-[#2D89C8] font-semibold uppercase'>Read More</Link>
        // </div>
    )
}



// const BlogCard = ({ blog,idx, role, id, handleDelete }) => {

//     const sanitize = (dirtyHTML) => {
//         const cleanHtml = DOMPurify.sanitize(dirtyHTML, {
//             ALLOWED_TAGS: ['p', 'span', 'b', 'i', 'u'] // Add other allowed tags as needed
//           })

//         return cleanHtml
//     }



//     return (
//         <div  className='w-50 md:w-[350px] h-[460px] border border-solid flex flex-col gap-3 pb-[24px] rounded-[18px] relative blog_card overflow-hidden bg-white  DM_Sans'>
//             {role==="ADMIN" && <CRUDButtons handleDelete={handleDelete} id={id}/>}
//             <img src={`${process.env.REACT_APP_API_HOST}/uploads/${blog?.thumbnail}`} alt="thumbnail" className='rounded-t-[18px]  max-h-[200px]'/>
//             <div className='flex gap-2 px-[24px]'>
//                 {blog?.category?.map((category, index) => {
//                      return  <p  key={index} className='text-[#2D89C8] text-[14px] font-bold mt-4 uppercase Quicksand'>{category}</p> 
//                 }
//                       )}
//             </div>
            
//             <h4 className='text-[#0D283A] font-bold text-xl line-clamp-2  px-[24px]'>{blog?.title}</h4>
//             <p className='text-[#0D283A] text-[14px] line-clamp-3 mx-[24px] text-justify text  w-full overflow-hidden' id='desc'
//             dangerouslySetInnerHTML={{ __html: sanitize(blog?.description) }} 
            
//             />
//             {/* <p className='text-[#0D283A] text-[14px] line-clamp-3 px-[24px]'>
//                 {discription}
//             </p> */}
//             <Link to={`/blog/${blog?._id}`} className='self-end mt-auto px-[24px] text-[#2D89C8] font-semibold uppercase'>Read More</Link>
//         </div>
//     )
// }

export default BlogCard