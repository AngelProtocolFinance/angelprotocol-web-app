export interface PageContext {
  /** append with | APP_NAME */
  meta_title: string;
  /** prepend with APP_NAME */
  meta_description: string;
  copy: {
    1: string;
    /** prepend with APP_NAME */
    2: string;
  };
  hero: string;
  left: string;
  right: string;
}
