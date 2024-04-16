import { useEffect, useState } from "react"
import axios from "axios"

       const useGetBlogs = (blogData,thumData) => {
    const [blogs, setBlogs] = useState(blogData)
    const [thumbBlog, setthumbBlog] = useState(thumData)
    // const [readMoreData,setreadMoreData] = useState([]);


    useEffect(() => {

        const fetchBlogs = async () => {
            try {
                const res = await axios.get("https://angelgiving-dev.10web.site/wp-json/wp/v2/posts");
            
            
                const thumbnailPromises = res.data.map(async (blog) => {
                    const thumbnailRes = await axios.get(`https://angelgiving-dev.10web.site/wp-json/wp/v2/media/${blog.featured_media}`);
                    return thumbnailRes.data.guid.rendered;
                });

                const thumbnails = await Promise.all(thumbnailPromises);
                setthumbBlog(thumbnails);
                setBlogs(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

        // const fetchBlogs = async() => {
        //     const res = await axios({
        //         method : "get",
        //         url : "https://angelgiving-dev.10web.site/wp-json/wp/v2/posts",
              
        //     })
        // //    console.log(res.data)
          
        
        // //   console.log("Hello Anurag",res.data)
        //   setBlogs(res.data);
         
        //  blogs.map(async function(dets){
        //     const thumbnailBlog = await axios({
        //         method : "get",
        //         url : `https://angelgiving-dev.10web.site/wp-json/wp/v2/media/${dets.featured_media}`,
              
        //     })
        //     console.log(thumbnailBlog.data)
        //     setthumbBlog([...thumbBlog,thumbnailBlog.data]);
        //   })

        //   thumbBlog.map(function(dets){
        //    console.log("Id Anurag",dets)
        //   })

          

          
         
            // if (res.data.success === true) {
            //     setBlogs(res.data.Blogs)
            // }
            // else {
            //     alert("Could not get blogs")
            // }
            
           
        }

        fetchBlogs()
    }, [])


    //    console.log("Anurag Yadav",blogs)

      return {blogs,thumbBlog};





    // useEffect(() => {
    //     const fetchBlogs = async() => {
    //         const res = await axios({
    //             method : "get",
    //             // url : "https://angelgiving-dev.10web.site/wp-json/wp/v2/posts",
    //             url : "/api/blogs"
    //         })
        
    //       console.log(res)
    //         if (res.data.success === true) {
    //             setBlogs(res.data.Blogs)
    //         }
    //         else {
    //             alert("Could not get blogs")
    //         }
    //         // const readMore = await axios({
    //         //     method : "get",
    //         //     url : "https://angelgiving-dev.10web.site/wp-json/wp/v2/posts"
    //         // })
    //         // setreadMoreData(readMore);
    //         // console.log(readMore);
           
    //     }

    //     fetchBlogs()
    // }, [num])

  
//    console.log(blogs)

    // return [blogs,readMoreData, setBlogs]
}

export default useGetBlogs;