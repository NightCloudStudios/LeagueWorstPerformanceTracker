import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SearchBar from "./components/SearchBar.tsx";
import SummonerPage from "./page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <div className="antialiased">
      <main className="bg-slate-800 min-h-dvh flex flex-col">
        <SearchBar />
        <div className="flex grow place-content-center">
          <SummonerPage />
        </div>
        <footer className="flex w-full place-content-center bg-black">
          <div className="w-fit">Footer Stuff</div>
        </footer>
      </main>
    </div>
    Test
  </StrictMode>
);
