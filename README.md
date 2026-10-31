# Personal Tech & Life Portfolio / Blog (Minh Quân.dev)

Một không gian số cá nhân hiện đại kết hợp giới thiệu sản phẩm kỹ thuật (Portfolio) và chia sẻ bài viết chuyên sâu về công nghệ web cũng như góc nhìn đời sống (Tech & Life Blog).

Được xây dựng dựa trên bản thiết kế **Tĩnh Lặng Số (Digital Clarity)** từ Google Stitch AI và yêu cầu đặc tả sản phẩm (PRD).

---

## 🚀 Công Nghệ Sử Dụng

- **Framework:** Next.js 14+ (App Router, Server Components & Suspense)
- **Ngôn ngữ:** TypeScript
- **Styling:** Tailwind CSS (bảng màu Tĩnh Lặng Số: Canvas `#faf8ff`, Surface `#ffffff`, Primary `#004ac6`, Secondary `#1d4ed8`)
- **Typography:** `Plus Jakarta Sans` (editorial text tiếng Việt hoàn mỹ) và `JetBrains Mono` (code & metadata)
- **Nội dung:** Markdown Renderer với GFM, syntax highlighting và sanitization an toàn
- **Kiến trúc dữ liệu:** Repository Pattern (`ContentRepository`) với Mock Adapter & HTTP REST Adapter

---

## 📂 Bản Đồ Định Tuyến (Sitemap)

```text
/                      Trang chủ (Hero, Featured Projects, Latest Posts, Skills Teaser, CTA)
├─ /blog               Danh mục bài viết (Filter Tất cả/Công nghệ/Đời sống, Search, Tags)
│  └─ /blog/[slug]     Chi tiết bài viết (Reading time, sanitized Markdown, Related posts)
├─ /projects           Danh mục dự án (Phân loại Web/OSS/Design, Live stats)
│  └─ /projects/[slug] Case study chi tiết (Bối cảnh, Giải pháp, Kết quả, Demo/GitHub)
├─ /about              Hồ sơ tác giả, hành trình sự nghiệp và năng lực chuyên môn
├─ /contact            Kênh liên hệ trực tiếp và Form gửi tin nhắn (Honeypot spam protection)
├─ /sitemap.xml        Dynamic Sitemap cho công cụ tìm kiếm
├─ /robots.txt         Cấu hình cào dữ liệu chuẩn SEO
└─ /studio             Admin Dashboard
   ├─ /studio/login    Đăng nhập quản trị viên (Demo: admin / admin123)
   ├─ /studio/posts    Quản lý danh sách, tạo mới (/new) và chỉnh sửa (/edit) bài viết
   ├─ /studio/projects Quản lý danh mục dự án
   ├─ /studio/messages Hộp thư tin nhắn từ khách gửi đến
   └─ /studio/settings Cấu hình hồ sơ website và mặc định SEO
```

---

## 🛠 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Chạy môi trường phát triển (Dev Server)
```bash
npm run dev
```
Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

### 3. Kiểm tra bản build sản xuất
```bash
npm run build
npm run start
```

---

## 🔌 Chuyển Đổi Mock Data & Real REST API

Hệ thống được thiết kế theo Repository Pattern:
- **Mặc định:** Hoạt động hoàn toàn độc lập với dữ liệu mẫu phong phú trong `src/lib/mock-data.ts`.
- **Kết nối Backend REST API:** Tạo file `.env.local` và chỉ định:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api/v1
```
Khi có biến môi trường trên, toàn bộ ứng dụng tự động chuyển sang gọi các endpoint REST theo đúng hợp đồng `04_API_CONTRACT.md` mà không cần thay đổi bất kỳ dòng mã UI nào.