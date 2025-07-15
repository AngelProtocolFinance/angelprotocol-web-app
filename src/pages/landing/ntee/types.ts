export interface PageContext {
  /** append with | APP_NAME */
  meta_title: string;
  /** prepend with APP_NAME */
  meta_description: string;
  hero_copy: {
    1: string;
    /** prepend with APP_NAME */
    2: string;
  };
  red_copy: string;
  hero: string;
  left: string;
  right: string;
}
