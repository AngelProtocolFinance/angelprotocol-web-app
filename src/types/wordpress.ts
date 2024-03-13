export namespace Wordpress {
  interface Html {
    rendered: string;
  }

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
    content: Html;
  };

  export type Page = Post & {
    parent: number;
    jetpack_featured_media_url: any; //TODO: type
    excerpt: Html;
  };

  export namespace Media {
    export interface Meta {
      "content-type": string;
    }

    export interface Size {
      file: string;
      width: number;
      height: number;
      filesize?: number;
      mime_type?: string;
      source_url?: string;
    }

    interface Sizes {
      medium: Size;
      large: Size;
      thumbnail: Size;
      medium_large: Size;
      "1536x1536": Size;
      "2048x2048": Size;
      "gainioz-case-details": Size;
      tenweb_optimizer_mobile: Size;
      tenweb_optimizer_tablet: Size;
      full: Omit<Size, "filesize">;
    }

    interface ImageMeta {
      aperture: string;
      credit: string;
      camera: string;
      caption: string;
      created_timestamp: string;
      copyright: string;
      focal_length: string;
      iso: string;
      shutter_speed: string;
      title: string;
      orientation: string;
      keywords: unknown[];
    }

    export interface Details {
      width: number;
      height: number;
      file: string;
      filesize: number;
      sizes: Sizes;
      image_meta: ImageMeta;
    }

    interface Link {
      href: string;
    }

    interface EmbeddableLink extends Link {
      embeddable: boolean;
    }

    export interface Links {
      self: Link[];
      collection: Link[];
      about: Link[];
      author: EmbeddableLink[];
      replies: EmbeddableLink[];
    }
  }

  export interface Media {
    id: number;
    date: string;
    date_gmt: string;
    guid: Html;
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: Html;
    author: number;
    comment_status: string;
    ping_status: string;
    template: string;
    meta: Media.Meta;
    description: Html;
    caption: Html;
    alt_text: string;
    media_type: string;
    mime_type: string;
    media_details: Media.Details;
    post: number;
    source_url: string;
    _links: Media.Links;
  }
}
