import {
  ContactMessage,
  Paginated,
  PostDetail,
  PostFilters,
  PostSummary,
  ProjectDetail,
  ProjectFilters,
  ProjectSummary,
  SiteSettings,
} from "@/types";
import {
  initialMessages,
  initialPosts,
  initialProjects,
  initialSiteSettings,
} from "./mock-data";
import { calculateReadingTime } from "./utils";

export interface ContentRepository {
  getSite(): Promise<SiteSettings>;
  updateSite(settings: Partial<SiteSettings>): Promise<SiteSettings>;
  listPosts(filters?: PostFilters): Promise<Paginated<PostSummary>>;
  getPost(slug: string): Promise<PostDetail | null>;
  createPost(data: Partial<PostDetail>): Promise<PostDetail>;
  updatePost(id: string, data: Partial<PostDetail>): Promise<PostDetail>;
  deletePost(id: string): Promise<boolean>;
  listProjects(filters?: ProjectFilters): Promise<Paginated<ProjectSummary>>;
  getProject(slug: string): Promise<ProjectDetail | null>;
  createProject(data: Partial<ProjectDetail>): Promise<ProjectDetail>;
  updateProject(id: string, data: Partial<ProjectDetail>): Promise<ProjectDetail>;
  deleteProject(id: string): Promise<boolean>;
  listMessages(): Promise<ContactMessage[]>;
  sendMessage(data: { name: string; email: string; message: string }): Promise<boolean>;
  markMessageRead(id: string, isRead: boolean): Promise<boolean>;
  deleteMessage(id: string): Promise<boolean>;
  getAllTags(): Promise<string[]>;
}

// Global in-memory storage for mock mode
let siteSettingsState = { ...initialSiteSettings };
let postsState = [...initialPosts];
let projectsState = [...initialProjects];
let messagesState = [...initialMessages];

export class MockContentRepository implements ContentRepository {
  async getSite(): Promise<SiteSettings> {
    return { ...siteSettingsState };
  }

  async updateSite(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    siteSettingsState = { ...siteSettingsState, ...settings };
    return { ...siteSettingsState };
  }

  async listPosts(filters: PostFilters = {}): Promise<Paginated<PostSummary>> {
    let items = [...postsState];

    // Filter by status if specified, otherwise public only sees published
    if (filters.status) {
      items = items.filter((p) => p.status === filters.status);
    } else {
      items = items.filter((p) => p.status === "published");
    }

    if (filters.category && filters.category !== "all") {
      items = items.filter((p) => p.category === filters.category);
    }

    if (filters.tag) {
      const tagLower = filters.tag.toLowerCase();
      items = items.filter((p) => p.tags.some((t) => t.toLowerCase() === tagLower));
    }

    if (filters.q) {
      const query = filters.q.toLowerCase().trim();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query)
      );
    }

    if (filters.featured !== undefined) {
      items = items.filter((p) => p.featured === filters.featured);
    }

    // Sort descending by publishedAt or createdAt
    items.sort(
      (a, b) =>
        new Date(b.publishedAt || b.createdAt).getTime() -
        new Date(a.publishedAt || a.createdAt).getTime()
    );

    const total = items.length;
    const page = filters.page || 1;
    const limit = filters.limit || 9;
    const totalPages = Math.ceil(total / limit) || 1;

    const startIndex = (page - 1) * limit;
    const paginatedItems = items.slice(startIndex, startIndex + limit);

    // Map to PostSummary (omit contentMarkdown to save bandwidth)
    const summaries: PostSummary[] = paginatedItems.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ contentMarkdown, ...rest }) => rest
    );

    return {
      data: summaries,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async getPost(slug: string): Promise<PostDetail | null> {
    const post = postsState.find((p) => p.slug === slug);
    if (!post) return null;
    return { ...post };
  }

  async createPost(data: Partial<PostDetail>): Promise<PostDetail> {
    const now = new Date().toISOString();
    const newPost: PostDetail = {
      id: `post-${Date.now()}`,
      slug: data.slug || `post-${Date.now()}`,
      title: data.title || "Bài viết không tiêu đề",
      excerpt: data.excerpt || "",
      contentMarkdown: data.contentMarkdown || "",
      category: data.category || "tech",
      tags: data.tags || [],
      coverImageUrl: data.coverImageUrl,
      coverImageAlt: data.coverImageAlt,
      featured: Boolean(data.featured),
      status: data.status || "draft",
      readingTimeMinutes: calculateReadingTime(data.contentMarkdown || ""),
      publishedAt: data.status === "published" ? now : "",
      createdAt: now,
      updatedAt: now,
    };
    postsState = [newPost, ...postsState];
    return newPost;
  }

  async updatePost(id: string, data: Partial<PostDetail>): Promise<PostDetail> {
    const index = postsState.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Bài viết không tồn tại");

    const existing = postsState[index];
    const now = new Date().toISOString();
    const updatedPost: PostDetail = {
      ...existing,
      ...data,
      readingTimeMinutes: data.contentMarkdown
        ? calculateReadingTime(data.contentMarkdown)
        : existing.readingTimeMinutes,
      publishedAt:
        data.status === "published" && !existing.publishedAt
          ? now
          : existing.publishedAt,
      updatedAt: now,
    };

    postsState[index] = updatedPost;
    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    const initialLen = postsState.length;
    postsState = postsState.filter((p) => p.id !== id);
    return postsState.length < initialLen;
  }

  async listProjects(filters: ProjectFilters = {}): Promise<Paginated<ProjectSummary>> {
    let items = [...projectsState].filter((p) => p.status === "published");

    if (filters.category && filters.category !== "all") {
      items = items.filter((p) => p.category === filters.category);
    }

    if (filters.tag) {
      const tagLower = filters.tag.toLowerCase();
      items = items.filter((p) =>
        p.techStack.some((t) => t.toLowerCase() === tagLower)
      );
    }

    if (filters.q) {
      const query = filters.q.toLowerCase().trim();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.summary.toLowerCase().includes(query)
      );
    }

    if (filters.featured !== undefined) {
      items = items.filter((p) => p.featured === filters.featured);
    }

    // Sort descending
    items.sort(
      (a, b) =>
        new Date(b.publishedAt || b.createdAt).getTime() -
        new Date(a.publishedAt || a.createdAt).getTime()
    );

    const total = items.length;
    const page = filters.page || 1;
    const limit = filters.limit || 9;
    const totalPages = Math.ceil(total / limit) || 1;

    const startIndex = (page - 1) * limit;
    const paginatedItems = items.slice(startIndex, startIndex + limit);

    // Map to ProjectSummary
    const summaries: ProjectSummary[] = paginatedItems.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ contentMarkdown, ...rest }) => rest
    );

    return {
      data: summaries,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async getProject(slug: string): Promise<ProjectDetail | null> {
    const project = projectsState.find((p) => p.slug === slug);
    if (!project) return null;
    return { ...project };
  }

  async createProject(data: Partial<ProjectDetail>): Promise<ProjectDetail> {
    const now = new Date().toISOString();
    const newProject: ProjectDetail = {
      id: `proj-${Date.now()}`,
      slug: data.slug || `project-${Date.now()}`,
      title: data.title || "Dự án mới",
      summary: data.summary || "",
      contentMarkdown: data.contentMarkdown || "",
      category: data.category || "web",
      techStack: data.techStack || [],
      role: data.role || "Developer",
      year: data.year || new Date().getFullYear().toString(),
      demoUrl: data.demoUrl,
      repositoryUrl: data.repositoryUrl,
      coverImageUrl: data.coverImageUrl,
      coverImageAlt: data.coverImageAlt,
      featured: Boolean(data.featured),
      status: data.status || "draft",
      metrics: data.metrics,
      publishedAt: data.status === "published" ? now : "",
      createdAt: now,
      updatedAt: now,
    };
    projectsState = [newProject, ...projectsState];
    return newProject;
  }

  async updateProject(id: string, data: Partial<ProjectDetail>): Promise<ProjectDetail> {
    const index = projectsState.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Dự án không tồn tại");

    const existing = projectsState[index];
    const now = new Date().toISOString();
    const updated = {
      ...existing,
      ...data,
      updatedAt: now,
    };

    projectsState[index] = updated;
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    const initialLen = projectsState.length;
    projectsState = projectsState.filter((p) => p.id !== id);
    return projectsState.length < initialLen;
  }

  async listMessages(): Promise<ContactMessage[]> {
    return [...messagesState].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async sendMessage(data: { name: string; email: string; message: string }): Promise<boolean> {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: data.name,
      email: data.email,
      message: data.message,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    messagesState = [newMsg, ...messagesState];
    return true;
  }

  async markMessageRead(id: string, isRead: boolean): Promise<boolean> {
    const msg = messagesState.find((m) => m.id === id);
    if (!msg) return false;
    msg.isRead = isRead;
    return true;
  }

  async deleteMessage(id: string): Promise<boolean> {
    const initialLen = messagesState.length;
    messagesState = messagesState.filter((m) => m.id !== id);
    return messagesState.length < initialLen;
  }

  async getAllTags(): Promise<string[]> {
    const tagSet = new Set<string>();
    postsState.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }
}

// Http Repository for production REST API
export class HttpContentRepository implements ContentRepository {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  }

  async getSite(): Promise<SiteSettings> {
    return this.request<SiteSettings>("/site");
  }

  async updateSite(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    return this.request<SiteSettings>("/site", {
      method: "PUT",
      body: JSON.stringify(settings),
    });
  }

  async listPosts(filters: PostFilters = {}): Promise<Paginated<PostSummary>> {
    const params = new URLSearchParams();
    if (filters.page) params.set("page", filters.page.toString());
    if (filters.limit) params.set("limit", filters.limit.toString());
    if (filters.category && filters.category !== "all") params.set("category", filters.category);
    if (filters.tag) params.set("tag", filters.tag);
    if (filters.q) params.set("q", filters.q);
    if (filters.featured !== undefined) params.set("featured", filters.featured.toString());
    return this.request<Paginated<PostSummary>>(`/posts?${params.toString()}`);
  }

  async getPost(slug: string): Promise<PostDetail | null> {
    try {
      return await this.request<PostDetail>(`/posts/${slug}`);
    } catch {
      return null;
    }
  }

  async createPost(data: Partial<PostDetail>): Promise<PostDetail> {
    return this.request<PostDetail>("/admin/posts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updatePost(id: string, data: Partial<PostDetail>): Promise<PostDetail> {
    return this.request<PostDetail>(`/admin/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deletePost(id: string): Promise<boolean> {
    await this.request(`/admin/posts/${id}`, { method: "DELETE" });
    return true;
  }

  async listProjects(filters: ProjectFilters = {}): Promise<Paginated<ProjectSummary>> {
    const params = new URLSearchParams();
    if (filters.page) params.set("page", filters.page.toString());
    if (filters.limit) params.set("limit", filters.limit.toString());
    if (filters.category && filters.category !== "all") params.set("category", filters.category);
    if (filters.tag) params.set("tag", filters.tag);
    if (filters.q) params.set("q", filters.q);
    if (filters.featured !== undefined) params.set("featured", filters.featured.toString());
    return this.request<Paginated<ProjectSummary>>(`/projects?${params.toString()}`);
  }

  async getProject(slug: string): Promise<ProjectDetail | null> {
    try {
      return await this.request<ProjectDetail>(`/projects/${slug}`);
    } catch {
      return null;
    }
  }

  async createProject(data: Partial<ProjectDetail>): Promise<ProjectDetail> {
    return this.request<ProjectDetail>("/admin/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: Partial<ProjectDetail>): Promise<ProjectDetail> {
    return this.request<ProjectDetail>(`/admin/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string): Promise<boolean> {
    await this.request(`/admin/projects/${id}`, { method: "DELETE" });
    return true;
  }

  async listMessages(): Promise<ContactMessage[]> {
    return this.request<ContactMessage[]>("/admin/messages");
  }

  async sendMessage(data: { name: string; email: string; message: string }): Promise<boolean> {
    await this.request("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return true;
  }

  async markMessageRead(id: string, isRead: boolean): Promise<boolean> {
    await this.request(`/admin/messages/${id}/read`, {
      method: "PATCH",
      body: JSON.stringify({ isRead }),
    });
    return true;
  }

  async deleteMessage(id: string): Promise<boolean> {
    await this.request(`/admin/messages/${id}`, { method: "DELETE" });
    return true;
  }

  async getAllTags(): Promise<string[]> {
    return this.request<string[]>("/tags");
  }
}

// Select repository based on environment variable
export function getContentRepository(): ContentRepository {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (apiBase) {
    return new HttpContentRepository(apiBase);
  }
  return new MockContentRepository();
}

export const contentRepo = getContentRepository();
