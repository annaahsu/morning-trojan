"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Document, EnrichedDocumentSearchResults } from "flexsearch";
import { PostData } from "@/lib/posts";

type IndexablePostData = {
  slug: string;
  title: string;
  content: string;
};

interface PageLoadMoreProps {
  allPostsData: PostData[];
}

export default function PageLoadMore({ allPostsData }: PageLoadMoreProps) {
  const limit = 20;
  const [visible, setVisible] = useState(limit);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<Document<IndexablePostData>>();
  const [results, setResults] = useState<PostData[]>(
    allPostsData.filter((post) => !post.hidden)
  );
  const [webExclusives, setWebExclusives] = useState(false);
  const [sortAsc, setSortAsc] = useState(false);
  const [random, setRandom] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/search-index.json");
      const data: (PostData & { content: string })[] = await res.json();

      const idx = new Document<IndexablePostData>({
        document: {
          id: "slug",
          index: ["title", "content"],
          store: ["slug", "title", "content"],
        },
        tokenize: "full",
      });

      data.forEach((post) =>
        idx.add({ slug: post.slug, title: post.title, content: post.content })
      );

      setIndex(idx);
      setResults(
        data
          .filter((p) => !p.hidden)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
      );
    }

    load();
  }, []);

  useEffect(() => {
    if (!index) return;

    if (random) {
      const index = Math.floor(Math.random() * allPostsData.length);
      setResults(allPostsData.slice(index, index + 1));
      setQuery("");
      setWebExclusives(false);
      return;
    }

    if (query.trim() === "") {
      setResults(
        allPostsData
          .filter((p) => !p.hidden)
          .filter((p) => !webExclusives || p.web_exclusive)
          .sort((a, b) =>
            sortAsc
              ? new Date(a.date).getTime() - new Date(b.date).getTime()
              : new Date(b.date).getTime() - new Date(a.date).getTime()
          )
      );
      setVisible(limit);
      return;
    }

    const matches = index.search(query.toLowerCase(), {
      enrich: true,
    }) as EnrichedDocumentSearchResults<IndexablePostData>;

    const slugs = matches.flatMap((m) => m.result.map((r) => r.id));

    const found = allPostsData
      .filter((p) => slugs.includes(p.slug) && !p.hidden)
      .filter((p) => !webExclusives || p.web_exclusive)
      .sort((a, b) =>
        sortAsc
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    setResults(found);
    setVisible(limit);
  }, [query, index, webExclusives, sortAsc, random, allPostsData]);

  const showMore = () => setVisible((prev) => prev + limit);

  return (
    <div className="posts-container">
      <div className="filters">
        <input
          id="search"
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search"
        />
        <div className="buttons">
          <button
            className={webExclusives ? "filter filter-active" : "filter"}
            onClick={() => {
              setRandom(false);
              setWebExclusives(!webExclusives);
            }}
          >
            Web exclusives only
            {webExclusives && <X />}
          </button>
          <button className="filter" onClick={() => {
            setRandom(false);
            setSortAsc(!sortAsc);
          }}>
            {sortAsc ? "Sort Descending" : "Sort Ascending"}
          </button>
          <button
            className={random ? "filter filter-active" : "filter"}
            onClick={() => setRandom(!random)}
          >
            Random newsletter
            {random && <X />}
          </button>
        </div>
      </div>

      <div className="posts">
        {results
          .slice(0, visible)
          .map(({ slug, title, date, web_exclusive }) => (
            <Link href={`/p/${slug}`} key={slug} className="list-item">
              <h2 className="list-item-title">{title}</h2>
              <span className="list-item-date">
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {web_exclusive && (
                <span className="web-exclusive">web exclusive</span>
              )}
            </Link>
          ))}
        {query.trim() !== "" && results.length === 0 && (
          <p className="no-results">No results found.</p>
        )}
      </div>

      {visible < results.length && (
        <div>
          <button onClick={showMore} className="load-more-btn">
            Load More
          </button>
        </div>
      )}

      <style>{`
        a {
          text-decoration: none;
          color: inherit;
        }

        .filters {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .search {
          outline: none;
          border-radius: 6px;
          border: 1px solid #888;
          padding: 0.5rem 0.75rem;
        }

        .search:active, .search:focus {
          border: 1px solid #222;
        }

        .buttons {
          display: flex;
          flex-flow: row wrap;
          gap: 0.5rem;
        }

        .posts {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .list-item-title {
          font-size: 1.25rem;
          margin: 0;
        }

        .list-item-date {
          font-size: 0.75rem;
        }

        .web-exclusive {
          font-size: 0.75rem;
          margin-left: 1rem;
          background-image: linear-gradient(to top, rgba(255, 0, 0, 0.25) 30%, transparent 40%);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        .posts-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .load-more-btn, .filter {
          font-family: inherit;
          font-size: 0.75rem;
          color: var(--white);
          background: var(--red);
          padding: 0.5rem 0.75rem;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          border: 1.5px solid var(--red);
        }

        .filter-active {
          background: var(--white);
          color: var(--red);
        }

        .load-more-btn:active, .filter:active {
          transform: scale(0.9);
          transition: 0.3s;
        }

        .no-results {
          margin-top: -1rem;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}

export function X() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
