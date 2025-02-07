import SearchBar from "./components/SearchBar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased">
        <main className="bg-slate-800 min-h-dvh flex flex-col">
          <SearchBar />
          <div className="flex grow place-content-center">{children}</div>
          <footer className="flex w-full place-content-center bg-black">
            <div className="w-fit">Footer Stuff</div>
          </footer>
        </main>
      </body>
    </html>
  );
}