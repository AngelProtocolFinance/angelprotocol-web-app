export interface PageContext {
  /** append with | APP_NAME */
  meta_title: string;
  /** prepend with APP_NAME */
  meta_description: string;
  hero_subject: {
    1: string;
    2: string;
  };
  hero: string;
  cta: {
    /** appended by " .Grow Together." */
    pre: string;
    /** appended, with `" ,membership in the {APP_NAME} ..." */
    body: string;
  };
  left: string;
  right: string;
}
