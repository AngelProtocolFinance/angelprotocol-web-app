export type OpenClosed = "open" | "closed";
export type ContextType = "view" | "embed" | "edit";
export type SortDirection = "asc" | "desc";
export type OrderByOption =
  | "author"
  | "date"
  | "id"
  | "include"
  | "modified"
  | "parent"
  | "relevance"
  | "slug"
  | "include_slugs"
  | "title"
  | "menu_order";

export type WpQueryParams = {
  context?: ContextType; // default: view
  search?: string; // query string
  page?: number; // default: 1
  per_page?: number; // default: 10
  offset?: number;
  order?: SortDirection;
  author?: string; // Limit result set to posts assigned to specific authors.
  after?: string; // Limit response to posts published after a given ISO8601 compliant date.
  modified_after?: string; // Limit response to posts modified after a given ISO8601 compliant date.
  orderby?: OrderByOption;
};

export type PostStatus = "publish" | "future" | "draft" | "pending" | "private";
export type PostFormat =
  | "standard"
  | "aside"
  | "chat"
  | "gallery"
  | "link"
  | "image"
  | "quote"
  | "status"
  | "video"
  | "audio";

export type Post = {
  id: number;
  date: string;
  modified: string;
  link: string;
  slug: string;
  status: PostStatus;
  title: any;
  author: number;
  excerpt: any;
  featured_media: number;
  comment_status: OpenClosed;
  ping_status: OpenClosed;
  format: PostFormat;
  meta: any;
  sticky: boolean;
  categories: string[];
  tags: string[];
};

export type Page = Post & {
  parent: number;
  jetpack_featured_media_url: any; //TODO: type
  excerpt: { rendered: any }; //TODO: type
  content: { rendered: any }; //TODO: type
};
