
export interface Brand {
  id: string;
  name: string;
  logo: string;
  category: string;
  budget: string;
  deadline: string;
  description: string;
  requirements: string[];
  pastCollaborators: {
    name: string;
    image: string;
    handle: string;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  socialMedia: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
  category: string;
}
