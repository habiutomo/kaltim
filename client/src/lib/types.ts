import { News, Official, Department, Service, Document, DocumentCategory } from "@shared/schema";

// Application-specific types
export interface SocialMedia {
  twitter?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

export interface InfoCard {
  icon: string;
  title: string;
  description: string;
  link: string;
  color: string;
}

export interface RegionStats {
  area: string;
  population: string;
  districts: string;
  capital: string;
}

export type OfficialWithParsedSocialMedia = Omit<Official, 'socialMedia'> & {
  socialMedia: SocialMedia;
}

// Parsed versions of the database types
export const parseOfficial = (official: Official): OfficialWithParsedSocialMedia => {
  try {
    const socialMedia = JSON.parse(official.socialMedia) as SocialMedia;
    return {
      ...official,
      socialMedia
    };
  } catch (e) {
    return {
      ...official,
      socialMedia: {}
    };
  }
};
