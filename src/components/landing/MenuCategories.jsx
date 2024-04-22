import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/landing/MenuCategories.css";

const MenuCategories = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const getBlog = async () => {
    try {
      const res = await axios({
        url: `/api/blogs/${id}`,
        method: "get",
      });
      setBlog(res.data.Blog);
    } catch (error) {
      alert(error.message);
    }
  };

  //biome-ignore lint: TODO: move to RTK
  useEffect(() => {
    getBlog();
  }, []);
  return (
    <div className={"categoryList"}>
      {blog?.category.map((category) => {
        return (
          <Link href="/blog" className={`${"categoryItem"} `}>
            {category}
          </Link>
        );
      })}
    </div>
  );
};

export default MenuCategories;
