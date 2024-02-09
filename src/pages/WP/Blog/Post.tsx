import Breadcrumbs from "components/Breadcrumbs";
import Loader from "components/Loader";
import { wpRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostBanner({ image }) {
  return (
    <div
      className="relative w-full h-52 sm:h-72 bg-cover bg-center"
      style={{
        backgroundImage: `url('${image})`,
      }}
    />
  );
}

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState([]);
  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch(`${APIs.wp}/posts?slug=${slug}`);
        if (res.ok) {
          const postsData = await res.json();
          // should only get a single post item from slug query
          if (postsData.length === 1) {
            postsData[0].jetpack_featured_media_url =
              postsData[0].jetpack_featured_media_url ??
              "/images/placeholder-banner.png";
            setPost(postsData[0]);
          }
        }
      } catch {
        // Redirect or raise an error message here!
      }
    }
    loadPost();
  }, []);
  return post.title ? (
    <>
      <PostBanner id={post.id} image={post.jetpack_featured_media_url} />
      <div className="padded-container">
        <div className="grid justify-center items-center text-center py-5">
          <Breadcrumbs
            className="text-xs sm:text-sm justify-start"
            items={[
              { title: "Posts", to: `${wpRoutes.blog}` },
              {
                title: `${post.title.rendered}`,
                to: `${wpRoutes.blog}/${post.slug}`,
              },
            ]}
          />
          <h1 className="font-header text-[1.63rem] md:text-3xl lg:text-[2.75rem] break-words my-5">
            {post.title.rendered}
          </h1>
          <div className="text-center">
            <p className="font-bold text-xs tracking-wider uppercase">
              Updated on:{" "}
              <span className="text-xs text-base text-gray-d1">
                {post.modified
                  ? new Date(post.modified).toLocaleDateString("en-UK", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "-"}
              </span>
            </p>
          </div>
        </div>
        <span
          className="grid justify-center items-center text-center"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        ></span>
      </div>
    </>
  ) : (
    <Loader bgColorClass="bg-blue" gapClass="gap-2" widthClass="w-4" />
  );
}
