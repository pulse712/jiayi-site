"use client";

import React from "react";

/**
 * Renders Strapi v5 Blocks (rich text) content.
 * Supports: paragraph, heading, list, quote, code, image, link, bold, italic, underline, strikethrough
 */

type TextNode = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

type LinkNode = {
  type: "link";
  url: string;
  children: TextNode[];
};

type InlineNode = TextNode | LinkNode;

type BlockNode =
  | { type: "paragraph"; children: InlineNode[] }
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] }
  | { type: "list"; format: "ordered" | "unordered"; children: { type: "list-item"; children: InlineNode[] }[] }
  | { type: "quote"; children: InlineNode[] }
  | { type: "code"; syntax?: string; children: TextNode[] }
  | { type: "image"; image: { url: string; alternativeText?: string; width?: number; height?: number }; children: InlineNode[] };

function renderInline(node: InlineNode, idx: number): React.ReactNode {
  if (node.type === "link") {
    return (
      <a key={idx} href={node.url} className="text-primary underline underline-offset-2 hover:text-primary/80" target="_blank" rel="noopener noreferrer">
        {node.children.map((c, i) => renderInline(c, i))}
      </a>
    );
  }

  let content: React.ReactNode = node.text;
  if (!content) return null;

  if (node.bold) content = <strong key={idx}>{content}</strong>;
  if (node.italic) content = <em key={idx}>{content}</em>;
  if (node.underline) content = <u key={idx}>{content}</u>;
  if (node.strikethrough) content = <s key={idx}>{content}</s>;
  if (node.code) content = <code key={idx} className="font-mono text-sm bg-surface px-1.5 py-0.5 rounded border border-border">{content}</code>;

  return <span key={idx}>{content}</span>;
}

function renderBlock(block: BlockNode, idx: number): React.ReactNode {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={idx} className="text-base text-muted-foreground leading-relaxed">
          {block.children.map((c, i) => renderInline(c, i))}
        </p>
      );

    case "heading": {
      const cls: Record<number, string> = {
        1: "text-3xl font-bold tracking-tight text-charcoal mt-10 mb-4",
        2: "text-2xl font-bold tracking-tight text-charcoal mt-8 mb-3",
        3: "text-xl font-semibold text-charcoal mt-6 mb-2",
        4: "text-lg font-semibold text-charcoal mt-5 mb-2",
        5: "text-base font-semibold text-charcoal mt-4 mb-1",
        6: "text-sm font-semibold text-charcoal mt-4 mb-1",
      };
      const Tag = `h${block.level}` as keyof React.JSX.IntrinsicElements;
      return (
        <Tag key={idx} className={cls[block.level]}>
          {block.children.map((c, i) => renderInline(c, i))}
        </Tag>
      );
    }

    case "list":
      if (block.format === "ordered") {
        return (
          <ol key={idx} className="list-decimal pl-6 space-y-1.5 text-base text-muted-foreground">
            {block.children.map((item, i) => (
              <li key={i}>{item.children.map((c, j) => renderInline(c, j))}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul key={idx} className="space-y-2">
          {block.children.map((item, i) => (
            <li key={i} className="flex gap-3 text-base text-muted-foreground">
              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span>{item.children.map((c, j) => renderInline(c, j))}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote key={idx} className="border-l-4 border-primary pl-5 py-1 italic text-charcoal/80 text-base">
          {block.children.map((c, i) => renderInline(c, i))}
        </blockquote>
      );

    case "code":
      return (
        <pre key={idx} className="bg-surface border border-border rounded-md p-4 overflow-x-auto text-sm font-mono text-charcoal">
          <code>{block.children.map((c) => c.text).join("")}</code>
        </pre>
      );

    case "image":
      return (
        <figure key={idx} className="my-2">
          <img
            src={block.image.url}
            alt={block.image.alternativeText ?? ""}
            className="rounded-md border border-border w-full object-cover"
          />
        </figure>
      );

    default:
      return null;
  }
}

type Props = {
  content: BlockNode[] | null | undefined;
};

export function BlocksRenderer({ content }: Props) {
  if (!content || content.length === 0) return null;

  return (
    <div className="space-y-5">
      {content.map((block, idx) => renderBlock(block, idx))}
    </div>
  );
}
