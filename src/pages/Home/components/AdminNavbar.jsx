import React, { useContext } from 'react'
import { PageContext } from '../state/PageState'
import { UserContext } from '../state/UserState'

const AdminNavbar = () => {
    const { page, changePage } = useContext(PageContext)
    const { user } = useContext(UserContext)
  return (
    <nav className='bg-[#2D89C8] h-[76px] flex items-center justify-end gap-5 px-12'>
        <span onClick={()=>changePage("blog")} className={`cursor-pointer px-1 ${page==="blog"?"text-[#a8dbff] border-b border-solid border-[#a8dbff]":"text-white" }`}>Blogs</span>
        <span onClick={()=>changePage("testimonial")} className={`cursor-pointer px-1 ${page==="testimonial"?"text-[#a8dbff] border-b border-solid border-[#a8dbff]":"text-white" }`}>Testimonials</span>
        {
          user?.role === "SUPERADMIN" ? <span onClick={()=>changePage("makeAdmin")} className={`cursor-pointer px-1 ${page==="makeAdmin"?"text-[#a8dbff] border-b border-solid border-[#a8dbff]":"text-white" }`}>Make Admin</span>:""
        }
    </nav>
  )
}

export default AdminNavbar