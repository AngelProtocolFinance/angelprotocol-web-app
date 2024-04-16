import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import useGetBlogs from '../hooks/useGetBlogs'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'




const Blogs = () => {
  return (
    <div>Blogs</div>
  )
}

export default Blogs

// const Blogs = () => {
//     const [num, setNum] = useState(0)
//     const [blogs, setBlogs] = useGetBlogs([], num)

//     const navigate = useNavigate()
//     const handleDelete = async(id) => {
//         const res = await axios({
//             method : "delete",
//             url : `/api/blogs/${id}`
//         })
//         if (res.data.success === true) {
//             alert("Blog Deleted")
//             setNum(num => num + 1)
//         }else{
//             alert("Could not delete blog")
//         }
//     }
    
//     return (
//         <div className='p-[30px] md:p-[100px] flex gap-5 flex-wrap'>
//             <div className='min-w-[350px] min-h-[444px] border border-solid flex items-center justify-center pb-[24px] rounded-[18px] cursor-pointer' onClick={()=>navigate("/writeBlog")}>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                 </svg>

//             </div>
//             {
//                 blogs.map((ele) => {
//                     return <BlogCard blog={ele} role={"ADMIN"} handleDelete={handleDelete} id={ele._id}/>
//                 })
//             }
//         </div>
//     )
// }

// export default Blogs