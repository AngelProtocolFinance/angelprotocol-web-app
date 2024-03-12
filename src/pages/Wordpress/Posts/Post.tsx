import Breadcrumbs from "components/Breadcrumbs";
import Loader from "components/Loader";
import { wpRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const getFeaturedImage = async (id) => {
  const res = await fetch(`${APIs.wp}/media/${id}`);
  const media = await res.json();
  if (!res.ok) {
    return "/images/placeholder-banner.png";
  }
  return media.guid.rendered.toString();
};

function PostBanner({ media }) {
  return (
    <div
      className="relative w-full h-52 sm:h-72 bg-cover bg-center"
      style={{
        backgroundImage: `url(${media})`,
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
            let post = postsData[0];
            if (post.featured_media) {
              post.featured_media_url = await getFeaturedImage(
                post.featured_media
              );
            }
            setPost(post);
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
      {post.featured_media_url && (
        <PostBanner image={post.featured_media_url} />
      )}
      <div className="padded-container px-[15%]">
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
        <div
          className="grid padded-container px-2 wp-post"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        ></div>
      </div>
    </>
  ) : (
    <Loader bgColorClass="bg-blue" gapClass="gap-2" widthClass="w-4" />
  );
}
