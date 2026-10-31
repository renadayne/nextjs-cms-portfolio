import React from "react";
import { PostEditorForm } from "@/components/studio/PostEditorForm";

export default function NewPostPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-headline-md text-headline-md font-bold text-on-surface">
          Soạn thảo bài viết mới
        </h1>
        <p className="text-body-sm text-on-surface-variant">
          Viết bài chia sẻ kiến thức công nghệ hoặc chiêm nghiệm đời sống.
        </p>
      </div>

      <PostEditorForm isNew />
    </div>
  );
}
