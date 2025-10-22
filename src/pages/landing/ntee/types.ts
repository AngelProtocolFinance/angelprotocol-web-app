export interface PageContext {
  meta_subject: {
    /** `Fundraising Platform for ${meta_subject.title}` */
    title: string;
    /** `{APP_NAME} helps ${meta_subject.description} increase`  */
    description: string;
  };
  hero_subject: {
    1: string;
    2: string;
  };
  hero: string;
  cta: {
    /** appended by " Grow Together." */
    pre: string;
    /** appended, with `" ,membership in the {APP_NAME} ..." */
    body: string;
  };
  left: string;
  right: string;
  /** e.g. nonprofits, faith charities, schools and universities, prepended by "Join thousands of .." */
  partners: string;
}
