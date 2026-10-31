export type PostCategory = "tech" | "life";
export type PostStatus = "draft" | "published";

export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  tags: string[];
  coverImageUrl?: string;
  coverImageAlt?: string;
  featured: boolean;
  status: PostStatus;
  readingTimeMinutes: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostDetail extends PostSummary {
  contentMarkdown: string;
}

export interface PostFilters {
  category?: PostCategory | "all";
  tag?: string;
  q?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
  status?: PostStatus;
}

export type ProjectCategory = "web" | "oss" | "design" | "mobile";
export type ProjectStatus = "draft" | "published";

export interface ProjectSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  techStack: string[];
  role?: string;
  year?: string;
  demoUrl?: string;
  repositoryUrl?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  featured: boolean;
  status: ProjectStatus;
  metrics?: { label: string; value: string };
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDetail extends ProjectSummary {
  contentMarkdown: string;
}

export interface ProjectFilters {
  category?: ProjectCategory | "all";
  tag?: string;
  q?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
}

export interface SiteSettings {
  displayName: string;
  role: string;
  tagline: string;
  shortBio: string;
  aboutMarkdown: string;
  avatarUrl?: string;
  locationLabel?: string;
  contactEmail?: string;
  availabilityStatus?: string;
  skills: {
    category: string;
    items: string[];
  }[];
  socialLinks: {
    label: string;
    url: string;
    icon?: string;
  }[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Paginated<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AdminSession {
  isAuthenticated: boolean;
  user?: {
    username: string;
    name: string;
    email: string;
  };
}
