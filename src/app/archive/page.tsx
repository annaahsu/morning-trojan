import { getSortedPostsData } from "@/lib/posts";
import PageLoadMore from "@/components/pageLoadMore";

export default function PostsPage() {
  const allPostsData = getSortedPostsData();

  return (
    <main>
      <h1>Archive</h1>
      <PageLoadMore allPostsData={allPostsData} />
    </main>
  );
}
