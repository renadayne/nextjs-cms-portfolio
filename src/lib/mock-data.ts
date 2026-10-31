import { PostDetail, ProjectDetail, SiteSettings, ContactMessage } from "@/types";

export const initialSiteSettings: SiteSettings = {
  displayName: "Nguyễn Minh Quân",
  role: "Senior Frontend Engineer / Product Builder",
  tagline: "Xây dựng giao diện web tinh gọn và chia sẻ góc nhìn công nghệ & đời sống.",
  shortBio:
    "Tôi tập trung vào trải nghiệm người dùng, kiến trúc frontend hiệu năng cao và những suy ngẫm thực tế về hành trình làm nghề công nghệ tại Việt Nam.",
  aboutMarkdown: `Chào bạn, tôi là **Nguyễn Minh Quân** — một kỹ sư giao diện người dùng và người xây dựng sản phẩm số sống tại Hà Nội.

Với hơn **6 năm kinh nghiệm** thực chiến trong việc thiết kế và phát triển các ứng dụng web phức tạp, tôi đặc biệt đam mê hai khía cạnh: **Trải nghiệm người dùng mượt mà** và **Kiến trúc mã nguồn tinh khiết**.

### Triết lý làm nghề
Tôi tin rằng một sản phẩm tốt không chỉ giải quyết bài toán nghiệp vụ, mà còn phải tôn trọng sự chú ý và thời gian của người dùng. Sự "tĩnh lặng" trong giao diện — tối giản những chi tiết thừa, tập trung vào nội dung và tốc độ phản hồi — chính là giá trị cốt lõi mà tôi luôn theo đuổi.

### Những lĩnh vực tôi quan tâm
- **Next.js & Modern React Ecosystem:** Tận dụng Server Components, tối ưu hóa bundle size và kiến trúc caching.
- **Design Systems & Micro-Interactions:** Xây dựng hệ thống giao diện đồng nhất, dễ mở rộng và đạt chuẩn tiếp cận WCAG.
- **Web Performance & Core Web Vitals:** Tối ưu LCP, INP, CLS để mang lại trải nghiệm tiệm cận ứng dụng bản địa (native apps).
- **Life Reflections & Digital Minimalism:** Ghi chép về tư duy làm nghề, sự cân bằng và năng suất làm việc bền vững.`,
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  locationLabel: "Hà Nội, Việt Nam",
  contactEmail: "quan.nguyen@example.com",
  availabilityStatus: "Sẵn sàng nhận dự án mới",
  skills: [
    {
      category: "Frontend & Architecture",
      items: ["TypeScript", "Next.js", "React", "State Machines", "Web Vitals", "SSR / SSG"],
    },
    {
      category: "Design & Styling",
      items: ["Tailwind CSS", "Figma", "Design Systems", "Accessibility (a11y)", "Responsive UI"],
    },
    {
      category: "Backend & Tooling",
      items: ["Node.js", "REST / GraphQL", "Git Workflow", "CI/CD Pipelines", "Docker", "Vercel"],
    },
  ],
  socialLinks: [
    { label: "GitHub", url: "https://github.com", icon: "github" },
    { label: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    { label: "Twitter", url: "https://twitter.com", icon: "twitter" },
    { label: "Email", url: "mailto:quan.nguyen@example.com", icon: "mail" },
  ],
  seoTitle: "Nguyễn Minh Quân — Senior Frontend Engineer & Tech Blog",
  seoDescription:
    "Không gian số cá nhân của Nguyễn Minh Quân: Showcase dự án kỹ thuật và bài viết chuyên sâu về công nghệ web, kiến trúc frontend và lối sống tĩnh lặng.",
};

export const initialPosts: PostDetail[] = [
  {
    id: "post-1",
    slug: "toi-uu-hoa-web-vitals-cho-nextjs-ung-dung-lon",
    title: "Tối ưu hóa Core Web Vitals cho ứng dụng Next.js quy mô lớn",
    excerpt:
      "Phân tích chuyên sâu về cách cải thiện LCP, INP và CLS trên ứng dụng hàng trăm nghìn người dùng: Từ phân bổ Bundle, xử lý Web Fonts đến chiến lược Dynamic Hydration.",
    category: "tech",
    tags: ["Next.js", "Performance", "Web Vitals", "React"],
    featured: true,
    status: "published",
    readingTimeMinutes: 8,
    publishedAt: "2024-03-20T08:00:00Z",
    createdAt: "2024-03-18T10:00:00Z",
    updatedAt: "2024-03-20T08:00:00Z",
    coverImageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    coverImageAlt: "Mã nguồn và biểu đồ đo lường hiệu năng Web Vitals",
    contentMarkdown: `## Mở đầu về Core Web Vitals

Trong kỷ nguyên của các ứng dụng web phong phú (Rich Web Applications), chỉ số **Core Web Vitals** không chỉ ảnh hưởng trực tiếp đến thứ hạng SEO của Google mà còn định hình tỷ lệ giữ chân người dùng (retention rate).

Khi một trang web mất hơn 3 giây để tải hoặc giật lag khi người dùng bấm chuột, sự thất vọng sẽ lập tức chuyển hóa thành việc rời bỏ trang.

Trong bài viết này, tôi sẽ chia sẻ những chiến lược thực tế mà tôi đã áp dụng để đưa điểm số Web Vitals của một hệ thống có hơn 300,000 lượt truy cập hàng tháng lên mức **Xanh (Good)** toàn diện.

---

### 1. Giải quyết LCP (Largest Contentful Paint)

LCP đo lường thời gian phần tử nội dung lớn nhất (thường là ảnh bìa hero hoặc khối text tiêu đề chính) hiển thị trên màn hình.

Nguyên nhân phổ biến nhất gây ra điểm LCP kém:
1. **Tài nguyên chặn hiển thị (Render-blocking resources):** Các file CSS hoặc JS không cần thiết đặt ở \`<head>\`.
2. **Hình ảnh không được tối ưu:** Kích thước file ảnh gốc quá lớn hoặc tải chậm do không có CDN.
3. **Độ trễ phản hồi từ Server (TTFB):** Do xử lý SSR nặng hoặc truy vấn cơ sở dữ liệu chưa tối ưu.

\`\`\`tsx
// Chiến lược preload hình ảnh quan trọng trong Next.js App Router
import Image from 'next/image';

export function HeroBanner() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
      <Image
        src="/assets/hero-banner.webp"
        alt="Nền tảng tự động hóa CI/CD"
        fill
        priority // Đảm bảo Next.js tự động sinh preload tag
        sizes="(max-width: 768px) 100vw, 1140px"
        className="object-cover"
      />
    </div>
  );
}
\`\`\`

> **Lưu ý quan trọng:** Hãy luôn chỉ định thuộc tính \`priority\` cho hình ảnh nằm trong First Fold (phần hiển thị đầu tiên trước khi cuộn trang) và bật định dạng AVIF hoặc WebP.

---

### 2. Triệt tiêu CLS (Cumulative Layout Shift)

CLS đo lường mức độ xê dịch bố cục không mong muốn trong quá trình trang tải. Một số nguyên nhân điển hình:
- Hình ảnh hoặc video không có tỷ lệ khung hình (\`aspect-ratio\`) cố định.
- Font chữ nhấp nháy thay đổi kích thước khi nạp xong (FOUT - Flash of Unstyled Text).
- Banner quảng cáo hoặc thông báo pop-up được chèn bất ngờ vào DOM.

Để khắc phục font layout shift, hãy sử dụng module **next/font**:

\`\`\`css
/* Thiết lập font fallback metrics */
@font-face {
  font-family: 'Plus Jakarta Sans Fallback';
  src: local('Arial');
  ascent-override: 92%;
  descent-override: 24%;
  line-gap-override: 0%;
}
\`\`\`

---

### 3. Tối ưu INP (Interaction to Next Paint)

INP thay thế FID từ tháng 3/2024 để đo lường độ phản hồi của toàn bộ phiên làm việc của người dùng.

Để giữ INP < 200ms:
- Tránh chạy các tác vụ tính toán nặng trên Main Thread khi người dùng đang tương tác.
- Sử dụng \`startTransition\` của React 18+ để phân tách độ ưu tiên cập nhật giao diện.
- Trì hoãn (defer) các tác vụ ghi log và phân tích dữ liệu qua \`requestIdleCallback\`.

\`\`\`ts
import { useTransition } from 'react';

function SearchComponent() {
  const [isPending, startTransition] = useTransition();

  const handleSearchChange = (query: string) => {
    // Cập nhật input tức thì
    setLocalInput(query);

    // Chuyển việc lọc danh sách nặng vào transition
    startTransition(() => {
      setFilteredResults(heavyFilter(items, query));
    });
  };
}
\`\`\`

### Kết luận

Tối ưu Web Vitals không phải là một công việc làm một lần rồi thôi (one-off task), mà là một quy trình kiểm soát liên tục thông qua CI/CD và công cụ giám sát thực tế người dùng (RUM). Bằng việc phân bổ tài nguyên hợp lý và tận dụng kiến trúc hiện đại của Next.js, chúng ta hoàn toàn có thể xây dựng những trang web vừa đẹp mắt vừa phản hồi tức thì.`,
  },
  {
    id: "post-2",
    slug: "kien-truc-state-management-hien-dai-khi-nao-nen-bo-redux",
    title: "Kiến trúc State Management hiện đại: Khi nào nên từ bỏ Redux?",
    excerpt:
      "Nhìn lại sự phát triển của quản lý trạng thái trong React từ Redux, MobX đến Zustand, Jotai và Server State (TanStack Query, Server Actions).",
    category: "tech",
    tags: ["React", "State Management", "Architecture", "Zustand"],
    featured: true,
    status: "published",
    readingTimeMinutes: 6,
    publishedAt: "2024-03-12T14:30:00Z",
    createdAt: "2024-03-10T09:00:00Z",
    updatedAt: "2024-03-12T14:30:00Z",
    coverImageUrl:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    coverImageAlt: "Màn hình laptop hiển thị cấu trúc code và biểu đồ state",
    contentMarkdown: `## Sự chuyển dịch của Quản lý Trạng thái trong React

Nhiều năm trước, câu hỏi đầu tiên khi khởi tạo một dự án React thường là: *"Cấu hình Redux store thế nào?"*. Ngày nay, câu hỏi ấy dần được thay thế bằng: *"Dự án này có thực sự cần một Global Client Store hay không?"*.

### 1. Phân loại State: Client State vs Server State

Sai lầm lớn nhất của các kiến trúc cũ là gom toàn bộ dữ liệu tải về từ API (Server Cache) vào chung một kho Redux với UI State (như trạng thái mở menu, form input nháp).

Khi phân tách rõ:
- **Server State:** Dữ liệu thuộc về máy chủ, có thể lỗi thời (stale), cần revalidate, cache và retry.
- **Client State:** Dữ liệu thuần túy nội bộ trên trình duyệt (theme, modal open, wizard step).

Bạn sẽ nhận ra rằng 80% nhu cầu "Redux" trước đây thực chất chỉ là xử lý Server State!

### 2. Sự trỗi dậy của Zustand và Atom State

Khi chỉ còn lại UI State đơn thuần, các thư viện nhẹ như **Zustand** hoặc **Jotai** giải quyết bài toán với cú pháp ngắn gọn gấp 10 lần Redux Toolkit:

\`\`\`ts
import { create } from 'zustand';

interface StudioState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useStudioStore = create<StudioState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
\`\`\`

Không boilerplate, không provider lồng nhau, kiểm soát re-render chính xác tới từng thuộc tính con.

### Lời khuyên cho dự án mới

Hãy bắt đầu đơn giản nhất có thể: Sử dụng React Context hoặc URL query parameters cho state điều hướng; sử dụng Server Components hoặc TanStack Query cho dữ liệu mạng; và chỉ cài đặt Zustand khi bạn có các luồng dữ liệu liên quan mật thiết giữa nhiều thành phần tách biệt.`,
  },
  {
    id: "post-3",
    slug: "thiet-ke-design-system-voi-tailwind-css-va-tokens",
    title: "Thiết kế Design System với Tailwind CSS và CSS Custom Properties",
    excerpt:
      "Cách tổ chức hệ thống tokens màu sắc, khoảng cách và typography giúp đội ngũ dễ dàng tuân thủ chuẩn thiết kế mà không cần viết CSS lặp lại.",
    category: "tech",
    tags: ["Tailwind CSS", "Design System", "CSS", "UI/UX"],
    featured: false,
    status: "published",
    readingTimeMinutes: 5,
    publishedAt: "2024-02-28T09:15:00Z",
    createdAt: "2024-02-25T11:00:00Z",
    updatedAt: "2024-02-28T09:15:00Z",
    coverImageUrl:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    coverImageAlt: "Bảng màu và bản vẽ giao diện thiết kế",
    contentMarkdown: `## Tại sao kết hợp Tailwind CSS và CSS Variables là lựa chọn tối ưu?

Tailwind CSS mang lại tốc độ phát triển cực cao, nhưng nếu cấu hình màu cứng (hardcoded hex) trong file cấu hình, việc hỗ trợ đổi theme hoặc điều chỉnh bảng màu theo ngữ cảnh sẽ rất khó khăn.

Bằng cách liên kết Tailwind tokens với **CSS Custom Properties (Variables)**:

\`\`\`css
:root {
  --color-primary: 0 74 198;
  --color-surface: 250 248 255;
  --color-text-main: 19 27 46;
}
\`\`\`

Và trong \`tailwind.config.ts\`:

\`\`\`ts
export default {
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
      }
    }
  }
}
\`\`\`

Chúng ta vừa có thể sử dụng các utility class như \`bg-primary/80\`, vừa có thể thay đổi biến CSS dynamically trên từng container mà không cần tải lại trang.`,
  },
  {
    id: "post-4",
    slug: "tinh-lang-so-tim-lai-su-tap-trung-giua-ky-nguyen-ai",
    title: "Tĩnh lặng số: Tìm lại sự tập trung giữa kỷ nguyên AI và thông báo đẩy",
    excerpt:
      "Những suy ngẫm về việc giữ gìn sự tĩnh tại trong tâm trí khi làm việc trong ngành công nghệ luôn hối hả và ngập tràn tin tức giật gân.",
    category: "life",
    tags: ["Tĩnh lặng số", "Tư duy", "Năng suất", "Cuộc sống"],
    featured: true,
    status: "published",
    readingTimeMinutes: 5,
    publishedAt: "2024-03-25T16:00:00Z",
    createdAt: "2024-03-24T12:00:00Z",
    updatedAt: "2024-03-25T16:00:00Z",
    coverImageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    coverImageAlt: "Khung cảnh mặt hồ phẳng lặng buổi sớm",
    contentMarkdown: `## Cơn bão thông tin và cái giá của sự phân mảnh

Mỗi sáng mở máy tính, hàng chục kênh Slack, email, bài đăng Twitter và tin tức về các mô hình AI mới nhất xuất hiện dồn dập. Cảm giác sợ bị tụt hậu (FOMO) len lỏi vào tâm trí của hầu hết những người làm công nghệ.

Nhưng tôi nhận ra: **Biết nhiều thông tin bề mặt không đồng nghĩa với việc tạo ra chiều sâu giá trị.**

### Khái niệm "Tĩnh Lặng Số" (Digital Clarity)

Tĩnh lặng số không có nghĩa là từ bỏ công nghệ hay trở về thời kỳ ngắt kết nối hoàn toàn. Tĩnh lặng số là **sự chủ động chọn lọc** những gì được phép bước vào không gian nhận thức của bạn.

1. **Tắt toàn bộ thông báo không khẩn cấp:** Điện thoại của tôi luôn ở chế độ Do Not Disturb trong giờ làm việc sâu.
2. **Ưu tiên giao tiếp bất đồng bộ (Asynchronous):** Không cần trả lời tin nhắn ngay trong vòng 30 giây nếu việc đó làm đứt gãy mạch tư duy giải thuật.
3. **Dành thời gian đi dạo không thiết bị:** Những giải pháp kỹ thuật tốt nhất tôi từng nghĩ ra đều không đến từ lúc cắm mắt vào màn hình, mà đến từ lúc đi bộ dọc hồ Tây trong buổi chiều lộng gió.

> "Trí óc con người giống như mặt nước. Khi xao động, bạn không thể nhìn thấy đáy. Nhưng khi tĩnh lặng, vạn vật đều trở nên sáng rõ."`,
  },
  {
    id: "post-5",
    slug: "ghi-chep-lap-trinh-vien-6-nam-xay-dung-san-pham",
    title: "Ghi chép của một lập trình viên: Bài học từ 6 năm xây dựng sản phẩm",
    excerpt:
      "Từ những dòng code ngây ngô thời mới ra trường đến trách nhiệm dẫn dắt kỹ thuật: Điều gì thực sự tạo nên sự khác biệt của một kỹ sư phần mềm?",
    category: "life",
    tags: ["Kinh nghiệm", "Hành trình", "Sự nghiệp", "Ghi chép"],
    featured: false,
    status: "published",
    readingTimeMinutes: 7,
    publishedAt: "2024-03-05T10:00:00Z",
    createdAt: "2024-03-03T11:00:00Z",
    updatedAt: "2024-03-05T10:00:00Z",
    coverImageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    coverImageAlt: "Tách cafe và sổ tay ghi chép trên bàn làm việc gỗ",
    contentMarkdown: `## 6 năm nhìn lại một chặng đường

Nhìn lại những dòng commit đầu tiên từ năm 2018, tôi mỉm cười vì sự ngây thơ của chính mình. Ngày ấy, tôi đo lường giá trị của bản thân bằng số lượng thư viện mới mình học được, hay việc dùng những kỹ thuật phức tạp nhất để giải quyết một bài toán đơn giản.

Sau 6 năm, góc nhìn ấy đã thay đổi hoàn toàn.

### Ba bài học đắt giá nhất

#### 1. Code dễ đọc quan trọng hơn code 'thông minh'
Một đoạn mã ngắn hơn 3 dòng nhưng khiến đồng nghiệp phải mất 15 phút để suy luận logic toán học thường là một đoạn code tồi. Viết code sao cho người đọc sau 6 tháng nữa (hoặc chính bạn của tương lai) vẫn hiểu ngay lập tức mới là đỉnh cao của sự chuyên nghiệp.

#### 2. Thấu hiểu bài toán kinh doanh
Công nghệ chỉ là phương tiện để giải quyết vấn đề của con người. Nếu bạn xây dựng một hệ thống vi dịch vụ (microservices) hoàn hảo nhưng sản phẩm không có người dùng, hệ thống ấy vẫn thất bại.

#### 3. Chăm sóc sức khỏe thể chất và tinh thần
Hội chứng kiệt sức (Burnout) là có thật. Không có dòng code nào xứng đáng để bạn đánh đổi giấc ngủ và sức khỏe lâu dài. Hãy làm việc với sự kiên trì bền bỉ thay vì những đợt tăng tốc kiệt quệ.`,
  },
  {
    id: "post-6",
    slug: "van-hoa-remote-work-va-su-can-bang-tam-ly",
    title: "Văn hóa Remote Work và nghệ thuật duy trì ranh giới công việc",
    excerpt:
      "Làm việc từ xa mang lại tự do nhưng cũng dễ biến ngôi nhà thành văn phòng 24/7. Cách tôi thiết lập ranh giới rõ ràng để duy trì năng lượng tích cực.",
    category: "life",
    tags: ["Remote Work", "Thói quen", "Cân bằng"],
    featured: false,
    status: "published",
    readingTimeMinutes: 4,
    publishedAt: "2024-02-15T15:20:00Z",
    createdAt: "2024-02-14T10:00:00Z",
    updatedAt: "2024-02-15T15:20:00Z",
    coverImageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
    coverImageAlt: "Góc làm việc tại nhà với cây xanh và ánh sáng tự nhiên",
    contentMarkdown: `## Làm việc tại nhà: Sự tự do đi kèm trách nhiệm

Khi không còn sự phân chia địa lý giữa công ty và gia đình, nhiều người rơi vào trạng thái "không bao giờ thực sự nghỉ ngơi". Bạn ăn cơm cạnh máy tính, vừa xem phim vừa kiểm tra tin nhắn công việc.

### Thói quen giúp tôi giữ được sự cân bằng

- **Nghi thức bắt đầu và kết thúc ngày:** Vào lúc 18:00, tôi gập laptop lại, cất vào ngăn kéo và thay trang phục thể thao. Hành động vật lý này gửi tín hiệu rõ ràng đến não bộ rằng: Giờ làm việc đã khép lại.
- **Không gian làm việc riêng biệt:** Dù căn phòng có nhỏ đến đâu, hãy cố gắng có một chiếc bàn chỉ dành riêng cho công việc. Không bao giờ mang laptop lên giường ngủ.
- **Giao tiếp chủ động:** Thường xuyên cập nhật tiến độ công việc một cách minh bạch với đồng đội để tạo dựng niềm tin mà không cần micromanagement.`,
  },
];

export const initialProjects: ProjectDetail[] = [
  {
    id: "proj-1",
    slug: "hyperflow-workflow-automation-platform",
    title: "HyperFlow — Workflow Automation Platform",
    summary:
      "Nền tảng tự động hóa luồng làm việc cho nhóm kỹ thuật, tối ưu hóa thời gian xử lý CI/CD, phân bổ tài nguyên máy chủ thông minh và tích hợp giám sát lỗi trực tiếp.",
    category: "web",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Go", "Docker"],
    role: "Lead Frontend Engineer",
    year: "2023 – 2024",
    demoUrl: "https://example.com/demo/hyperflow",
    repositoryUrl: "https://github.com/example/hyperflow",
    coverImageUrl:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
    coverImageAlt: "Giao diện quản lý quy trình CI/CD của HyperFlow",
    featured: true,
    status: "published",
    metrics: { label: "Tối ưu độ trễ Pipeline", value: "-42% latency" },
    publishedAt: "2024-01-15T00:00:00Z",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    contentMarkdown: `## Bối cảnh dự án
Trong các tổ chức công nghệ có hàng chục microservices, việc cấu hình và theo dõi hàng trăm pipeline CI/CD thường gây ra tình trạng nghẽn cổ chai. Các kỹ sư phải chuyển đổi qua lại giữa nhiều công cụ rời rạc để tìm kiếm nguyên nhân thất bại của bản build.

**HyperFlow** được thiết kế như một trung tâm điều hành thống nhất (Unified Command Center), kết nối trực tiếp với GitHub Actions, GitLab CI và Kubernetes cluster để mang lại cái nhìn trực quan và khả năng tự động sửa lỗi thông minh.

---

### Thách thức kỹ thuật
1. **Khối lượng dữ liệu realtime khổng lồ:** Hàng nghìn node trạng thái cập nhật liên tục qua WebSocket cần hiển thị mượt mà ở tần số 60fps trên canvas sơ đồ luồng.
2. **Khả năng tương tác kéo thả linh hoạt:** Cho phép người dùng thiết kế luồng pipeline bằng giao diện trực quan (Visual Node Graph) tương đương với việc cấu hình file YAML phức tạp.
3. **Hiệu năng First Load:** Ứng dụng dashboard quy mô lớn nhưng phải đáp ứng thời gian tải trang đầu tiên dưới 1.5 giây.

---

### Giải pháp kiến trúc
- **Virtual Canvas Rendering:** Kết hợp HTML5 Canvas và Web Workers để xử lý tính toán vị trí của hơn 5,000 node luồng mà không làm đơ Main Thread.
- **Optimistic State Updates:** Cập nhật ngay lập tức giao diện người dùng khi thay đổi cấu hình, đồng bộ nền với máy chủ qua cơ chế Retry có lũy thừa.
- **Code Splitting tinh vi:** Tách biệt module thiết kế luồng (Editor) và module giám sát số liệu (Analytics) thành các dynamic chunks nạp theo nhu cầu.

---

### Kết quả đạt được
- Giảm **42% thời gian trung bình** để kỹ sư xác định và khắc phục lỗi build pipeline.
- Triển khai thành công cho hơn 12 đội ngũ kỹ thuật nội bộ với chỉ số hài lòng (CSAT) đạt **4.8/5**.
- Thời gian tải trang ban đầu đạt **1.1 giây** trên mạng 4G tiêu chuẩn.`,
  },
  {
    id: "proj-2",
    slug: "cloudmetrics-distributed-monitoring-dashboard",
    title: "CloudMetrics — Distributed Monitoring Dashboard",
    summary:
      "Hệ thống giám sát phân tán theo dõi hàng triệu metrics máy chủ mỗi giây với biểu đồ trực quan hóa dữ liệu thời gian thực và cảnh báo bất thường tự động.",
    category: "web",
    techStack: ["Next.js", "TypeScript", "D3.js", "Tailwind CSS", "GraphQL"],
    role: "Senior Frontend Engineer",
    year: "2023",
    demoUrl: "https://example.com/demo/cloudmetrics",
    repositoryUrl: "https://github.com/example/cloudmetrics",
    coverImageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    coverImageAlt: "Màn hình bảng điều khiển dữ liệu CloudMetrics",
    featured: true,
    status: "published",
    metrics: { label: "Xử lý dữ liệu", value: "2M+ metrics/giây" },
    publishedAt: "2023-11-20T00:00:00Z",
    createdAt: "2023-11-15T00:00:00Z",
    updatedAt: "2023-11-20T00:00:00Z",
    contentMarkdown: `## Bối cảnh dự án
Hạ tầng điện toán đám mây phân tán đòi hỏi các công cụ giám sát phải cập nhật liên tục các số liệu CPU, RAM, Network I/O và Error Rate theo từng mili-giây.

## Vai trò & Đóng góp
- Xây dựng thư viện biểu đồ chuyên dụng dựa trên D3.js với khả năng tự động gộp cụm điểm dữ liệu (Downsampling) khi người dùng zoom out timeline.
- Giảm thiểu việc tiêu hao bộ nhớ trình duyệt (Memory Leak) khi dashboard mở liên tục trong nhiều ngày.`,
  },
  {
    id: "proj-3",
    slug: "devnotes-minimalist-markdown-knowledge-hub",
    title: "DevNotes — Minimalist Markdown Knowledge Hub",
    summary:
      "Ứng dụng ghi chép mã nguồn mở ưu tiên quyền riêng tư, hỗ trợ lưu trữ cục bộ, liên kết hai chiều (bidirectional linking) và biên tập Markdown siêu tốc.",
    category: "oss",
    techStack: ["React", "TypeScript", "Tailwind CSS", "SQLite", "WebAssembly"],
    role: "Creator & Maintainer",
    year: "2023 – Hiện tại",
    demoUrl: "https://example.com/demo/devnotes",
    repositoryUrl: "https://github.com/example/devnotes",
    coverImageUrl:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
    coverImageAlt: "Ứng dụng ghi chép DevNotes tối giản",
    featured: true,
    status: "published",
    metrics: { label: "Mã nguồn mở", value: "1.2k+ Stars" },
    publishedAt: "2023-08-10T00:00:00Z",
    createdAt: "2023-08-01T00:00:00Z",
    updatedAt: "2023-08-10T00:00:00Z",
    contentMarkdown: `## Ý tưởng
Xuất phát từ nhu cầu ghi chép tài liệu kỹ thuật nhanh chóng mà không phụ thuộc vào các dịch vụ đám mây đóng, tôi đã phát triển DevNotes với tiêu chí: **Offline-First**, **Tốc độ khởi động tức thì** và **Hoàn toàn kiểm soát dữ liệu cá nhân**.`,
  },
  {
    id: "proj-4",
    slug: "zenith-design-system-ui-kit",
    title: "Zenith Design System — Enterprise UI Kit",
    summary:
      "Bộ công cụ thiết kế và thư viện thành phần giao diện đạt chuẩn tiếp cận WCAG 2.2 AA, phục vụ hơn 8 dự án sản phẩm công nghệ trong cùng hệ sinh thái.",
    category: "design",
    techStack: ["React", "Storybook", "TypeScript", "Tailwind CSS", "Radix UI"],
    role: "Design System Lead",
    year: "2022 – 2023",
    demoUrl: "https://example.com/demo/zenith",
    repositoryUrl: "https://github.com/example/zenith",
    coverImageUrl:
      "https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=1200&q=80",
    coverImageAlt: "Bộ linh kiện thiết kế Zenith Design System",
    featured: false,
    status: "published",
    publishedAt: "2023-05-18T00:00:00Z",
    createdAt: "2023-05-01T00:00:00Z",
    updatedAt: "2023-05-18T00:00:00Z",
    contentMarkdown: `## Mục tiêu dự án
Chuẩn hóa trải nghiệm người dùng, thống nhất bảng mã màu, token khoảng cách và cung cấp hơn 40 components React có khả năng truy cập bàn phím (Keyboard Accessible) đầy đủ.`,
  },
];

export const initialMessages: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Trần Minh Hoàng",
    email: "hoang.tran@techcorp.vn",
    message:
      "Chào Quân, mình rất ấn tượng với dự án HyperFlow của bạn. Bên mình đang xây dựng nền tảng DevOps mới và muốn mời bạn tham gia tư vấn giải pháp frontend. Hãy liên hệ lại với mình nhé!",
    isRead: false,
    createdAt: "2024-03-28T14:20:00Z",
  },
  {
    id: "msg-2",
    name: "Lê Thu Hà",
    email: "thuha.design@studio.io",
    message:
      "Bài viết về Tĩnh lặng số của bạn rất truyền cảm hứng. Mình cũng là một người làm thiết kế sản phẩm và hoàn toàn đồng cảm với quan điểm của bạn.",
    isRead: true,
    createdAt: "2024-03-26T09:10:00Z",
  },
];
