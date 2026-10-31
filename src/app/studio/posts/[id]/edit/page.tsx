import React from "react";
import { notFound } from "next/navigation";
import { contentRepo } from "@/lib/content-repository";
import { PostEditorForm } from "@/components/studio/PostEditorForm";

interface Props {
  params: { id: string };
}

export default async function EditPostPage({ params }: Props) {
  // Find post by ID from full list
  const postsRes = await contentRepo.listPosts({ limit: 100 });
  const post = postsRes.data.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  // Fetch full detail for markdown content
  const postDetail = await contentRepo.getPost(post.slug);
  if (!postDetail) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-headline-md text-headline-md font-bold text-on-surface">
          Chỉnh sửa bài viết
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Cập nhật nội dung, trạng thái phát hành hoặc ảnh bìa.
        </p>
      </div>

      <PostEditorForm initialData={postDetail} />
    </div>
  );
}
