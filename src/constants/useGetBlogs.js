import axios from "axios";
import { useEffect, useState } from "react";

const useGetBlogs = (blogData, thumData) => {
  const [blogs, setBlogs] = useState(blogData);
  const [thumbBlog, setthumbBlog] = useState(thumData);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          "https://angelgiving-dev.10web.site/wp-json/wp/v2/posts"
        );

        const thumbnailPromises = res.data.map(async (blog) => {
          const thumbnailRes = await axios.get(
            `https://angelgiving-dev.10web.site/wp-json/wp/v2/media/${blog.featured_media}`
          );
          return thumbnailRes.data.guid.rendered;
        });

        const thumbnails = await Promise.all(thumbnailPromises);
        setthumbBlog(thumbnails);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, thumbBlog };
};

export default useGetBlogs;
