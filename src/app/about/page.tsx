import Link from "next/link";
import Image from "next/image";
import anna from "@/app/anna.jpeg";
import tomo from "@/app/tomo.jpeg";

export default function AboutPage() {
  return (
    <main>
      <h1>We report the bold stories USC needs.</h1>
      <p>
        We&apos;ve{" "}
        <Link href="/p/usc-spoof-security-fail">exposed major flaws</Link> in
        the school&apos;s cybersecurity systems. We&apos;ve uncovered seismic
        cuts to{" "}
        <Link href="/p/usc-cuts-national-merit-finalist-scholarship">
          scholarships
        </Link>{" "}
        and <Link href="/p/usc-planned-benefit-cuts">employee benefits</Link>.
        Once, we mailed the university president a &quot;
        <Link href="/p/and-the-moron-of-the-year-is">Moron of the Year</Link>
        &quot; trophy. You&apos;ll find no news outlet that breaks bigger
        stories <b>while having more fun doing it.</b>
      </p>
      <p>
        When we&apos;re not reporting major scoops, we&apos;re writing the daily
        newsletter &mdash; our bread and butter.
      </p>
      <p>
        On weekday mornings, you&apos;ll receive a two-minute email brief that
        aggreggates the day&apos;s biggest USC, Los Angeles, and California
        stories. We trawl dozens of news websites, then synthesize the five most
        important articles into bite-sized,{" "}
        <Link href="/p/theta-xi-reinstated">snarky</Link> briefs. Click the link
        if you want to read more; scroll if you don&apos;t.
      </p>
      <p>
        Reading the news is hard. <b>We do the legwork for you.</b>
      </p>
      <p>
        Our subscribers include students who run clubs, service organizations,
        student government, media, and participate in Division I athletics. We
        count USC trustees, executives, deans, senior faculty, healthcare
        officials, staffers, alumni, and parents among our readers.
      </p>
      <p>
        Reporters, editors, and business executives at The New York Times, Los
        Angeles Times, LAist, The San Francisco Standard, and San Diego
        Union-Tribune also read Morning, Trojan.
      </p>
      <p>
        Morning, Trojan is USC&apos;s only student news outlet that isn&apos;t
        funded by the school.
      </p>
      <h2>Our staff</h2>
      <div className="bio">
        <Image
          className="tomo"
          src={tomo}
          height={96}
          alt="Tomo Chien headshot"
        />
        <div>
          <h3>
            <a href="https://tomo.news">Tomo Chien</a>
          </h3>
          <p>
            I&apos;m the founder of Morning, Trojan and a senior at USC. I
            commute between Los Angeles and San Francisco, where I&apos;m a
            reporter at The San Francisco Standard. Reach me at{" "}
            <a href="mailto:tomo@morningtrojan.com">tomo@morningtrojan.com</a>{" "}
            or tomo.415 on Signal.
          </p>
        </div>
      </div>
      <div className="bio">
        <Image
          className="anna"
          src={anna}
          height={96}
          alt="Anna Hsu headshot"
        />
        <div>
          <h3>
            <a href="https://annahsu.dev">Anna Hsu</a>
          </h3>
          <p>
            I live a double life of writing stories and code at USC, and I love
            zeugmas. Outside of catching Tomo&apos;s mistakes every morning, you
            can find me eating good food, running to eat more food, and writing
            about said food.
          </p>
        </div>
      </div>
      <style>{`
        .bio {
          display: flex;
          gap: 32px;
        }

        .bio h3 {
          margin-top: 0;
        }

        .tomo, .anna {
          border-radius: 50%;
        }
      `}</style>
    </main>
  );
}
