import type { Metadata } from "next";
import Nav from "@/components/nav";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Morning, Trojan",
  description: "The definitive USC newsletter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="body">
          <Nav />
          {children}
        </div>
        <footer className="footer">
          <p>
            You&apos;re all caught up. Thanks for reading Morning, Trojan, and
            have a good day.
          </p>
          <p>&copy; {new Date().getFullYear()} Tomoki Chien.</p>
        </footer>
      </body>
    </html>
  );
}
