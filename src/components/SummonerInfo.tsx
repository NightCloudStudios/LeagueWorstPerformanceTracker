"use client";

import { fetchAllMatchData, SummonerData } from "@/app/logic/lol-data-tool";
import Image from "next/image";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function SummonerInfo({ sumData }: { sumData: SummonerData[] }) {
  return (
    <div className="flex flex-col w-full h-full bg-slate-900">
      <div className="flex flex-col place-items-center w-full h-full p-2 bg-slate-800">
        <div>Summoner Name</div>
        <div>Worst three games (in last 20)</div>
        <div className="flex flex-col place-items-center w-full  gap-y-2 p-2 last:rounded-md">
          {sumData.map((data, index) => (
            <GameInfo matchData={data} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GameInfo({ matchData }: { matchData: SummonerData }) {
  return (
    <div className="flex flex-col p-2 w-full justify-center bg-slate-500 rounded-md">
      <div className="flex flex-row space-x-2">
        <div className="aspect-square h-16 bg-slate-700 outline outline-black">
          Champ Icon
        </div>
        <div className="flex flex-col w-full outline place-content-around pl-2 outline-slate-900">
          <div className="flex">
            KDA: {matchData.kills}/{matchData.deaths}/{matchData.assists}
          </div>
          <div className="flex">KD: 0.33</div>
          <div className="flex text-xs">Game id: ioaijdal89utij34owklerfd</div>
        </div>
      </div>
    </div>
  );
}

export function SummonerInfoSkeleton() {
  return (
    <div className="flex flex-col w-full h-full bg-slate-900">
      <div className="flex flex-col place-items-center w-full h-full p-2 bg-slate-800">
        <div>Summoner Name</div>
        <div>Worst three games (in last 20)</div>
        <div className="flex flex-col place-items-center w-full  gap-y-2 p-2 last:rounded-md">
          <GameInfoSkeleton />
          <GameInfoSkeleton />
          <GameInfoSkeleton />
        </div>
      </div>
    </div>
  );
}

function GameInfoSkeleton() {
  return (
    <div className="flex flex-col p-2 w-full justify-center bg-slate-500 rounded-md">
      <div className="flex flex-row space-x-2">
        <div className="aspect-square h-16 bg-slate-700 outline outline-black">
          Champ Icon
        </div>
        <div className="flex flex-col w-full outline place-content-around pl-2 outline-slate-900">
          <div className="flex">KDA: 1/3/6</div>
          <div className="flex">KD: 0.33</div>
          <div className="flex text-xs">Game id: ioaijdal89utij34owklerfd</div>
        </div>
      </div>
    </div>
  );
}
