/**https://developer.wordpress.org/rest-api/reference/ */

export interface IHmtl {
  rendered: string;
}

export interface IPost {
  id: number;
  date: string;
  slug: string;
  title: IHmtl;
  author: number;
  excerpt: IHmtl;
  featured_media: number;
  content: IHmtl;
}

export interface IPostsSearch {
  page?: number;
  /**
   * DEFAULTS:
   * page: 1
   * per_page: 10
   * context: "view"
   * order: "desc" by date
   * status: "publish"
   *
   */
}
export interface IPostsPage {
  posts: Post[];
  pageNum: number;
  nextPageNum?: number;
}

interface Html {
  rendered: string;
}

export type Post = {
  id: number;
  date: string;
  slug: string;
  title: Html;
  author: number;
  excerpt: Html;
  featured_media: number;
  content: Html;
};

/** custom type made from Post[] and response headers */
export type PostPage = {
  posts: Post[];
  pageNum: number;
  nextPageNum?: number;
};

export interface IMediaSize {
  file: string;
  width: number;
  height: number;
  filesize?: number;
  mime_type?: string;
  source_url?: string;
}

interface IMediaSizes {
  medium: IMediaSize;
  large: IMediaSize;
  thumbnail: IMediaSize;
  medium_large: IMediaSize;
  "1536x1536": IMediaSize;
  "2048x2048": IMediaSize;
  "gainioz-case-details": IMediaSize;
  tenweb_optimizer_mobile: IMediaSize;
  tenweb_optimizer_tablet: IMediaSize;
  full: Omit<IMediaSize, "filesize">;
}

export interface IMediaDetails {
  width: number;
  height: number;
  sizes: IMediaSizes;
}

export interface IMedia {
  guid: Html;
  alt_text: string;
  media_details: IMediaDetails;
}

export interface IUser {
  name: string;
}
