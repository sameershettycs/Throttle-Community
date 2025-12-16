// Contentstack TypeScript Interfaces matching actual schema

// Bike interface
export interface Bike {
  uid: string;
  title: string;
  brand: string;
  launched: string;
  type: string;
  _content_type_uid?: string;
  created_at?: string;
  updated_at?: string;
}

// User Profile interface
export interface UserProfile {
  uid: string;
  title: string; // username
  full_name: string;
  bio: string;
  experience_level: number;
  aura_points: number;
  bike?: Bike[]; // populated reference
  avatar?: string | null;
  created_at?: string;
  updated_at?: string;
  _content_type_uid?: string;
}

// Question interface
export interface Question {
  uid: string;
  title: string;
  body: string; // description content
  category: string;
  author?: UserProfile[]; // populated reference
  related_bike?: Bike[]; // populated reference
  created_at?: string;
  updated_at?: string;
  tags?: string[];
  _content_type_uid?: string;
}

// Comment interface
export interface Comment {
  uid: string;
  title: string;
  content: string;
  author?: UserProfile[]; // populated reference
  question?: Question[]; // populated reference
  created_at?: string;
  updated_at?: string;
  _content_type_uid?: string;
}

// API Response type for entries
export interface EntriesResponse<T> {
  entries: T[];
  count?: number;
  content_type_uid?: string;
}
