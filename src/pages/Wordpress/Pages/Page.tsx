import Loader from "components/Loader";
import { APIs } from "constants/urls";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Page() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState([]);
  useEffect(() => {
    async function loadPage() {
      try {
        const res = await fetch(`${APIs.wp}/pages?slug=${slug}`);
        if (res.ok) {
          const pagesData = await res.json();
          // should only get a single page item from slug query
          if (pagesData.length === 1) {
            setPage(pagesData[0]);
          }
        }
      } catch {
        // Redirect or raise an error message here!
      }
    }
    loadPage();
  }, []);
  return page.title ? (
    <>
      <div className="padded-container">
        <div className="grid justify-center items-center text-center py-5">
          <h1 className="font-header text-[1.63rem] md:text-3xl lg:text-[2.75rem] break-words my-5">
            {page.title.rendered}
          </h1>
        </div>
        <span
          className="grid justify-center items-center text-center"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        ></span>
      </div>
    </>
  ) : (
    <Loader bgColorClass="bg-blue" gapClass="gap-2" widthClass="w-4" />
  );
}
