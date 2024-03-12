export namespace Wordpress {
  export namespace Post {
    export namespace QueryParams {
      export type ContextType = "view" | "embed" | "edit";
      export type OrderBy =
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

      export type SortDirection = "asc" | "desc";
    }
    export type QueryParams = {
      context?: QueryParams.ContextType; // default: view
      search?: string; // query string
      page?: number; // default: 1
      per_page?: number; // default: 10
      offset?: number;
      order?: QueryParams.SortDirection;
      author?: string; // Limit result set to posts assigned to specific authors.
      after?: string; // Limit response to posts published after a given ISO8601 compliant date.
      modified_after?: string; // Limit response to posts modified after a given ISO8601 compliant date.
      orderby?: QueryParams.OrderBy;
    };

    export type Status = "publish" | "future" | "draft" | "pending" | "private";
    export type PingStatus = "open" | "closed";
    export type CommentStatus = "open" | "closed";
    export type Format =
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
  }

  export type Post = {
    id: number;
    date: string;
    modified: string;
    link: string;
    slug: string;
    status: Post.Status;
    title: any;
    author: number;
    excerpt: any;
    featured_media: number;
    comment_status: Post.CommentStatus;
    ping_status: Post.PingStatus;
    format: Post.Format;
    meta: any;
    sticky: boolean;
    categories: string[];
    tags: string[];
    content: { rendered: string };
  };

  export type Page = Post & {
    parent: number;
    jetpack_featured_media_url: any; //TODO: type
    excerpt: { rendered: string };
  };
}
