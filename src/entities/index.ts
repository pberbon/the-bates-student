/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: articles
 * Interface for Articles
 */
export interface Articles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  articleTitle?: string;
  /** @wixFieldType text */
  fullContent?: string;
  /** @wixFieldType text */
  authorName?: string;
  /** @wixFieldType datetime */
  publicationDate?: Date | string;
  /** @wixFieldType text */
  sectionCategory?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  featuredImage?: string;
}


/**
 * Collection ID: newsletters
 * Interface for Newsletters
 */
export interface Newsletters {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  newsletterTitle?: string;
  /** @wixFieldType date */
  dateSent?: Date | string;
  /** @wixFieldType text */
  summary?: string;
  /** @wixFieldType url */
  newsletterLink?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  thumbnailImage?: string;
}


/**
 * Collection ID: printissues
 * Interface for PrintIssues
 */
export interface PrintIssues {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  issueTitle?: string;
  /** @wixFieldType number */
  issueNumber?: number;
  /** @wixFieldType date */
  publicationDate?: Date | string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  coverImage?: string;
  /** @wixFieldType url */
  pdfLink?: string;
}


/**
 * Collection ID: teammembers
 * Interface for TeamMembers
 */
export interface TeamMembers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  role?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  headshot?: string;
  /** @wixFieldType url */
  socialMediaLink?: string;
}
