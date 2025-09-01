import Image from "next/image";
import Link from "next/link";
import banner from "./banner.png";
import anna from "./anna.jpeg";
import tomo from "./tomo.jpeg";

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
          to our <Link href="/archive">archive</Link> of Morning, Trojan posts.
        </p>
        <p>
          Read more about Morning, Trojan <Link href="/about">here</Link>.
        </p>
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
