import { getPostData } from "@/lib/posts";
import Back from "@/components/backToArchive";

const renderMarkdown = (markdown: string) => {
  const html = markdown
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>");

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default async function NewsletterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <main className="content">
      <Back />
      <div className="content-card">
        <article>{renderMarkdown(postData.content)}</article>
      </div>
      <Back />
      <style>{`
        .content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .content-card {
          margin: -10px;
        }
      `}</style>
    </main>
  );
}
