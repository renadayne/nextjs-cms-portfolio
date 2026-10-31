# Kế Hoạch Triển Khai Xây Dựng Blog & Portfolio (Personal Digital Space)

> **Dựa trên:** PRD (`stitch/01_product_requirements.md`), UI Brief (`stitch/02_ui_frontend_brief.md`), Design System `DESIGN.md` và mã giao diện Stitch Google AI (`code.html`).
> **Mục tiêu:** Xây dựng blog và portfolio hoàn chỉnh theo kiến trúc Next.js App Router, TypeScript, Tailwind CSS, hỗ trợ Mock Repository độc lập & chuẩn bị sẵn sàng kết nối API thật.
> **Quy tắc làm việc:** Chia nhỏ từng bước độc lập, tự động kiểm thử và commit + push GitHub với Conventional Commits sau mỗi bước hoàn thành.

---

## Danh Sách Các Bước (Execution Roadmap)

### [x] Step 0: Thiết lập kế hoạch và tài liệu triển khai
- Phân tích toàn bộ yêu cầu PRD, UI brief và source code từ Stitch AI.
- Tạo file `PLANNING.md` và git tracking.

---

### [x] Step 1: Khởi tạo Next.js Foundation & Thiết lập Design Tokens
- Cấu trúc dự án Next.js 14 App Router + TypeScript + Tailwind CSS + Lucide Icons.
- Thiết lập bảng màu `Tĩnh Lặng Số (Digital Clarity)` chuẩn theo `DESIGN.md`:
  - Canvas `#FAF8FF`, Surface `#FFFFFF`, Primary `#004AC6` / `#2563EB`, Secondary `#1D4ED8`, Slate Ink `#131B2E`, `#434655`.
  - Phông chữ Google Fonts: `Plus Jakarta Sans` và `JetBrains Mono`.
  - Border radii (12-16px cards, 8-12px inputs), shadows và utilities.
- **Git Commit:** `feat(core): initialize Next.js project with design tokens and styling foundation`

---

### [x] Step 2: Xây dựng Shared Layout, Navigation & Footer
- Header cố định (Sticky Header) với hiệu ứng backdrop blur:
  - Wordmark `Minh Quân.dev`
  - Menu: Trang chủ, Blog, Dự án, Giới thiệu, Liên hệ
  - Status Badge: `Available for projects`
  - Mobile Menu drawer chuẩn accessibility, touch & keyboard friendly.
- Footer chuẩn:
  - Bản quyền, links điều hướng, mạng xã hội (GitHub, LinkedIn, Twitter/X).
  - Trạng thái hệ thống.
- Common UI Atoms: `Button`, `Badge` (Tech/Life pill), `TagChip`, `SectionHeading`, `Container`.
- **Git Commit:** `feat(ui): implement responsive header, navigation drawer, and footer`

---

### [x] Step 3: Xây dựng Data Models & Content Repository Layer
- Khai báo TypeScript DTOs theo API Contract:
  - `SiteSettings`, `PostSummary`, `PostDetail`, `ProjectSummary`, `ProjectDetail`, `ContactMessage`.
- Thiết lập Interface `ContentRepository` (Repository Pattern):
  - `MockContentRepository` đọc dữ liệu mẫu có sẵn để hoạt động 100% offline không cần backend.
  - `HttpContentRepository` sẵn sàng kết nối `/api/v1` khi có backend.
- Tạo bộ dữ liệu mẫu (Fixtures) chuẩn từ Stitch:
  - 6 bài viết Tech & Life (tối ưu Web Vitals, kiến trúc Frontend, cuộc sống làm nghề).
  - 4 dự án tiêu biểu (HyperFlow, CloudMetrics, DevNotes, Zenith Design System).
  - Profile đầy đủ của tác giả.
- **Git Commit:** `feat(data): implement content repository interface and rich mock datasets`

---

### [x] Step 4: Xây dựng Trang Chủ (`/` Home Page)
- **Hero Section**:
  - Availability pill `Sẵn sàng nhận dự án mới`.
  - H1 tiêu đề, vai trò Senior Frontend Engineer / Product Builder.
  - Thẻ chân dung / workspace và micro-metrics (6+ năm kinh nghiệm, 18+ live products).
  - CTA "Xem dự án" và "Đọc bài viết".
- **Featured Projects**: Bento grid các dự án tiêu biểu theo đúng bản mẫu Stitch.
- **Latest Posts**: Danh sách 4 bài viết mới nhất phân tách nhãn Công nghệ / Đời sống.
- **About Teaser & Tech Stack Chips**.
- **Contact Banner Call-to-action**.
- **Git Commit:** `feat(home): build modern editorial homepage with featured projects and posts`

---

### [x] Step 5: Xây dựng Phân Hệ Blog (`/blog` & `/blog/[slug]`)
- **Trang `/blog`**:
  - Filter Tabs: Tất cả, Công nghệ (Tech), Đời sống (Life).
  - Search bar có debounce tìm kiếm tiêu đề & trích đoạn.
  - Tag chips filter tương tác.
  - Lưới bài viết với ảnh bìa fallback, category badge, thời gian đọc, ngày đăng.
  - Phân trang chuẩn query param `?category=...&tag=...&q=...`.
- **Trang `/blog/[slug]`**:
  - Breadcrumb điều hướng về Blog.
  - Header bài viết: Tiêu đề lớn, tác giả, ngày đăng, thời lượng đọc.
  - Trình đọc Markdown an toàn (sanitized), hỗ trợ code block syntax highlighting, blockquotes, bảng biểu, danh sách.
  - Nút Copy link bài viết / Chia sẻ.
  - Khối bài viết liên quan (Related Posts).
- **Git Commit:** `feat(blog): implement blog catalog, search/filter, and article reader`

---

### [x] Step 6: Xây dựng Phân Hệ Dự Án (`/projects` & `/projects/[slug]`)
- **Trang `/projects`**:
  - Category Tabs: Tất cả, Sản phẩm Web, Mã nguồn mở, Thiết kế UI/UX.
  - Search bar tìm kiếm dự án.
  - Thẻ dự án hiển thị vai trò, năm thực hiện, tech stack tags, mô tả bối cảnh và metric preview.
- **Trang `/projects/[slug]`**:
  - Thông tin dự án: Vai trò, thời gian, tech stack, liên kết demo và GitHub.
  - Case study chi tiết qua Markdown: Bối cảnh, Thách thức, Giải pháp, Kết quả.
- **Git Commit:** `feat(projects): create project showcase grid and case study detail views`

---

### [x] Step 7: Xây dựng Trang Giới Thiệu (`/about`) & Liên Hệ (`/contact`)
- **Trang `/about`**:
  - Tiểu sử chi tiết và hình ảnh không gian làm việc.
  - Kỹ năng & Công nghệ phân nhóm (Frontend, Architecture, Tools, UI/UX).
  - Dòng thời gian kinh nghiệm (Experience timeline).
  - Triết lý làm việc và xây dựng sản phẩm.
- **Trang `/contact`**:
  - Kênh liên hệ trực tiếp (Email, Telegram, LinkedIn, GitHub).
  - Form gửi tin nhắn với validation đầy đủ (Họ tên, Email, Nội dung).
  - Bảo vệ spam bằng Honeypot field `website`.
  - Trạng thái gửi: Đang gửi, Gửi thành công, Lỗi.
- **Git Commit:** `feat(pages): add about profile and interactive contact form`

---

### [x] Step 8: Xây dựng Studio Admin Dashboard (`/studio`)
- Cấu trúc layout Studio riêng biệt với Sidebar navigation.
- Session guard & Trang đăng nhập `/studio/login`.
- **Quản lý Bài viết (`/studio/posts`)**:
  - Danh sách bài viết, lọc Draft / Published.
  - Trình soạn thảo bài viết (`new` & `[id]/edit`): slug, excerpt, category, tags, cover url, markdown editor kèm live preview.
- **Quản lý Dự án (`/studio/projects`)**:
  - Danh sách và trình chỉnh sửa dự án.
- **Hộp thư Liên hệ (`/studio/messages`)**:
  - Xem danh sách tin nhắn khách gửi đến, đánh dấu đã đọc, xóa tin nhắn.
- **Cấu hình Website (`/studio/settings`)**:
  - Chỉnh sửa thông tin cá nhân, SEO defaults, bio, social links.
- **Git Commit:** `feat(studio): implement admin management studio for posts, projects, and settings`

---

### [x] Step 9: SEO, Performance, Fallback States & Hoàn Thiện
- Metadata Open Graph, Twitter Cards, Canonical URLs.
- Sinh tự động `sitemap.xml` và `robots.txt`.
- Xây dựng trang 404 tùy biến đẹp mắt và Error Boundary.
- Chạy toàn bộ build kiểm thử và đẩy phiên bản hoàn thiện lên GitHub.
- **Git Commit:** `chore(release): finalize SEO, sitemap, error states, and production build`
