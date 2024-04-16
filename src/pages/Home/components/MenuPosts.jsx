// import Image from "next/image";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import "../styles/MenuPosts.css"
import useGetBlogs from "../hooks/useGetBlogs";

const MenuPosts = ({ withImage  }) => {
  const [blogs, setBlogs] = useGetBlogs([])


  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    
    const options = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
  
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className={"menu_posts_items"}>
      {
        blogs?.map((blog, i)=>{
          if (i>3) {
            return null
          }
          else{
            return <Link to={`/blog/${blog._id}`} className={"item"}>
            {withImage && (
              <div className={"imageContainer"}>
                <img src={`${process.env.REACT_APP_API_HOST}/uploads/${blog.thumbnail}`} alt="" fill className={"image"} />
              </div>
            )}
            <div className={"textContainer"}>
              <span className="flex gap-1">
              {
                blog?.category.map((category)=>{
                  return <span className={`${"category"}`}>{category}</span>
                })
              }
              
                            </span>
              
              <h3 className={"postTitle"}>
                {blog.title.substring(0, 30)}
              </h3>
              <div className={"detail"}>
                <span className={"username"}>{blog.user.userName}</span>
                <span className={"date"}> - {formatDate(blog.createdAt)}</span>
              </div>
            </div>
          </Link>
          }
        })
      }
      {/* <Link href="/" className={"item"}>
        {withImage && (
          <div className={"imageContainer"}>
            <img src="/blog_thumbnail_1.png" alt="" fill className={"image"} />
          </div>
        )}
        <div className={"textContainer"}>
          <span className={`${"category"} ${"travel"}`}>Travel</span>
          <h3 className={"postTitle"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={"detail"}>
            <span className={"username"}>John Doe</span>
            <span className={"date"}> - 10.03.2023</span>
          </div>
        </div>
      </Link> */}
      {/* <Link href="/" className={"item"}>
        {withImage && (
          <div className={"imageContainer"}>
            <img src="/blog_thumbnail_2.png" alt="" fill className={"image"} />
          </div>
        )}
        <div className={"textContainer"}>
          <span className={`${"category"} ${"culture"}`}>
            Culture
          </span>
          <h3 className={"postTitle"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={"detail"}>
            <span className={"username"}>John Doe</span>
            <span className={"date"}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      <Link href="/" className={"item"}>
        {withImage && (
          <div className={"imageContainer"}>
            <img src="/blog_thumbnail_1.png" alt="" fill className={"image"} />
          </div>
        )}
        <div className={"textContainer"}>
          <span className={`${"category"} ${"food"}`}>Food</span>
          <h3 className={"postTitle"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={"detail"}>
            <span className={"username"}>John Doe</span>
            <span className={"date"}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      <Link href="/" className={"item"}>
        {withImage && (
          <div className={"imageContainer"}>
            <img src="/blog_thumbnail_1.png" alt="" fill className={"image"} />
          </div>
        )}
        <div className={"textContainer"}>
          <span className={`${"category"} ${"fashion"}`}>
            Fashion
          </span>
          <h3 className={"postTitle"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
          <div className={"detail"}>
            <span className={"username"}>John Doe</span>
            <span className={"date"}> - 10.03.2023</span>
          </div>
        </div>
      </Link> */}
    </div>
  );
};

export default MenuPosts;
