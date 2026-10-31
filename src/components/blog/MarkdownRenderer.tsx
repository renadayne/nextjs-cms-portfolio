import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate max-w-none text-on-surface leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize, rehypeHighlight]}
        components={{
          h1: ({ ...props }) => (
            <h1
              className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-10 mb-5"
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <h2
              className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight mt-9 mb-4 pb-2 border-b border-outline-variant/30"
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight mt-7 mb-3"
              {...props}
            />
          ),
          p: ({ ...props }) => (
            <p
              className="font-body-editorial text-body-editorial text-on-surface/90 mb-6 leading-[1.8]"
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc pl-6 mb-6 space-y-2 text-on-surface/90 font-body-default" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal pl-6 mb-6 space-y-2 text-on-surface/90 font-body-default" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-4 border-primary pl-5 py-2 my-6 italic text-on-surface-variant bg-surface-container-low/50 rounded-r-xl"
              {...props}
            />
          ),
          a: ({ ...props }) => (
            <a
              className="text-primary hover:text-secondary underline underline-offset-4 font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          table: ({ ...props }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-outline-variant/40">
              <table className="w-full text-left text-body-sm" {...props} />
            </div>
          ),
          th: ({ ...props }) => (
            <th className="bg-surface-container px-4 py-3 font-semibold text-on-surface" {...props} />
          ),
          td: ({ ...props }) => (
            <td className="px-4 py-3 border-t border-outline-variant/20" {...props} />
          ),
          hr: () => <hr className="my-10 border-outline-variant/40" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
