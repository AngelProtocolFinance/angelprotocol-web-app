import Image from "components/Image";
import Loader from "components/Loader";
import { wpRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const getFeaturedImage = async (id) => {
  const res = await fetch(`${APIs.wp}/media/${id}`);
  const media = await res.json();
  if (!res.ok) {
    return "/images/placeholder-banner.png";
  }
  return media.guid.rendered.toString();
};

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const res = await fetch(`${APIs.wp}/posts`);
    if (!res.ok) {
      return;
    }
    const postsData = await res.json();
    await postsData.forEach(async (post) => {
      let media = "/images/placeholder-banner.png";
      if (post.featured_media) {
        media = await getFeaturedImage(post.featured_media);
      }
      post.featured_media_url = media;
    });
    setPosts(postsData);
  };

  // called on page load
  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <div className="w-full grid content-start pb-16">
      <div className="grid gap-y-4 content-start padded-container min-h-screen">
        <div className="padded-container justify-items-center lg:content-start text-gray">
          <h1 className="text-orange font-header text-[1.63rem] md:text-3xl lg:text-[2.75rem] break-words my-5">
            Posts
          </h1>
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-4 content-start">
            {posts ? (
              posts.map((post, _index) => (
                <div
                  className="relative overflow-clip rounded-lg border border-prim hover:border-blue dark:hover:border-blue"
                  key={post.slug}
                >
                  <Link
                    to={`${wpRoutes.blog}/${post.slug}`}
                    className="grid grid-rows-[auto_1fr] h-full"
                  >
                    <Image
                      className="rounded-lg p-[5px]"
                      src={post.featured_media_url}
                    />
                    <div className="flex flex-col p-3 pb-4 gap-3">
                      <h2 className="text-ellipsis line-clamp-2 text-blue">
                        {post.title.rendered}
                      </h2>
                      <p
                        className="justify"
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.rendered,
                        }}
                      ></p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <Loader
                bgColorClass="bg-blue"
                gapClass="gap-2"
                widthClass="w-4"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
