import {Link, useParams} from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../styles/MenuCategories.css"
import axios from "axios";
 
const MenuCategories = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  
  const getBlog = async() => {
    try {
      const res = await axios({
        url : `/api/blogs/${id}`,
        method : "get",
  
      })
      setBlog(res.data.Blog)
    } catch (error) {
      alert(error.message)
    }
  }
  useEffect(()=>{

    getBlog()
  }, [id])
  return  (
    <div className={"categoryList"}>
      {
        blog?.category.map((category)=>{
          return <Link href="/blog" className={`${"categoryItem"} `}>
          {category}
        </Link>
        })
      }
      {/* <Link
        href="/blog?cat=style"
        className={`${"categoryItem"} ${"style"}`}
      >
        Style
      </Link>
      <Link href="/blog" className={`${"categoryItem"} ${"fashion"}`}>
        Fashion
      </Link> */}
      
    </div>
  );
};

export default MenuCategories;
