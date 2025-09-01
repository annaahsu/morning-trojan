"use client";

import { useState } from "react";
import Link from "next/link";
import { PostData } from "@/lib/posts";

interface PageLoadMoreProps {
  allPostsData: PostData[];
}

export default function PageLoadMore({ allPostsData }: PageLoadMoreProps) {
  const limit = 20;
  const [visible, setVisible] = useState(limit);
  const [query, setQuery] = useState("");

  const showMore = () => setVisible((prev) => prev + limit);
  const filteredPosts = allPostsData.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()) && !post.hidden
  );

  return (
    <div className="posts-container">
      <input
        id="search"
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setVisible(limit);
        }}
        className="search"
      />
      <div className="posts">
        {filteredPosts
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
          {filteredPosts.length === 0 && (
            <p className="no-results">No results found.</p>
          )}
      </div>

      {visible < filteredPosts.length && (
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

        .search {
          outline: none;
          border-radius: 6px;
          border: 1px solid #888;
          padding: 0.5rem 0.75rem;
        }

        .search:active, .search:focus {
          border: 1px solid #222;
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

        .load-more-btn {
          font-family: inherit;
          font-size: 0.75rem;
          color: var(--white);
          background: var(--red);
          padding: 0.5rem 0.75rem;
          border-radius: 12px;
          cursor: pointer;
        }

        .load-more-btn:active {
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
