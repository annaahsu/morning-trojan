import Image from "next/image";
import Link from "next/link";
import banner from "./banner.png";
import anna from "./anna.jpeg";
import tomo from "./tomo.jpeg";
import { getSortedPostsData } from "@/lib/posts";

export default function HomePage() {
  const getGreeting = () => {
    const greetings = [
      "Good night.",
      "Good morning.",
      "Good afternoon.",
      "Good evening.",
    ];
    return greetings[Math.floor(new Date().getHours() / 6)];
  };

  const allPostsData = getSortedPostsData();
  const notHiddenCount = allPostsData.filter((p) => !p.hidden).length;

  const today = new Date();
  const todayPosts = allPostsData.filter(
    (p) =>
      !p.hidden &&
      new Date(p.date).getDate() === today.getDate() &&
      new Date(p.date).getMonth() === today.getMonth()
  );

  return (
    <>
      <header>
        <Image
          className="banner"
          src={banner}
          alt="Morning, Trojan newsletter banner"
        />
        <div className="credit">
          <div className="headshots">
            <Image
              className="tomo"
              src={tomo}
              height={48}
              alt="Tomo Chien headshot"
            />
            <Image
              className="anna"
              src={anna}
              height={48}
              alt="Anna Hsu headshot"
            />
          </div>
          <span>
            <a href="https://tomo.news">Tomo Chien</a> &{" "}
            <a href="https://annahsu.dev">Anna Hsu</a>
          </span>
        </div>
      </header>
      <main>
        <p>
          <b>{getGreeting()}</b> It&apos;s{" "}
          {new Date().toLocaleDateString("en-US", { weekday: "long" })}. Welcome
          to our <Link href="/archive">archive</Link> of Morning, Trojan posts,
          which date back to August 30, 2022. You can search through all{" "}
          {notHiddenCount} posts using keywords, filter for web exclusives, and
          even read a randomly selected newsletter.
        </p>
        <p>
          Read more about Morning, Trojan and what we were able to accomplish{" "}
          <Link href="/about">here</Link>. Thanks for being a part of our
          journey, and we hope you enjoy your time here.
        </p>
        <div className="posts past">
          <hr />
          <h2>
            Find out what happened on{" "}
            {today.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
            :
          </h2>
          {todayPosts.map(({ slug, title, date }) => (
            <Link href={`/p/${slug}`} key={slug}>
              <p>
                {title} ({new Date(date).getFullYear()}){" "}
              </p>
            </Link>
          ))}
          {todayPosts.length === 0 && <p>We didn&apos;t publish anything!</p>}
        </div>
      </main>

      <style>{`
        .banner {
          width: 100%;
          height: auto;
        }

        .credit {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 0.75rem;
          font-weight: bold;
          margin: 1.5rem 0;
        }

        .headshots {
          display: flex;
        }

        .tomo {
          border-radius: 50%;
          z-index: 1;
        }

        .anna {
          border-radius: 50%;
          margin-left: -10px;
        }
      `}</style>
    </>
  );
}
