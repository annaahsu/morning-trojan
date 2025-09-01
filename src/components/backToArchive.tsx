"use client";

import Link from "next/link";

export default function BackToArchive() {
  return (
    <div className="bl">
      <Link href="/archive" className="back-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span>Back to Archive</span>
      </Link>
      <style>{`
        .back-link {
          display: flex;
          align-items: center;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
