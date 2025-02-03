"use client";

import { fetchAllMatchData, SummonerData } from "@/app/logic/lol-data-tool";
import Image from "next/image";
import { useState } from "react";

export default function SummonerInfo() {
  const [gameData, setGameData] = useState<SummonerData[]>([]);

  const fetch = async () => {
    //should put player data from search here
    const fetchedData = await fetchAllMatchData();

    if (fetchedData != undefined) {
      setGameData(fetchedData);
    }
  };

  function formSub(formData: FormData) {
    const name = formData.get("summonerName");
    const tag = formData.get("summonerTag");
    const region = formData.get("region");
    console.log(`Searching for: ${name}#${tag} | ${region}`);
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row h-12 w-full justify-center place-self-center bg-slate-900 p-2">
        <form
          className="flex flex-row h-12 w-2/3 justify-center place-self-center p-2"
          action={formSub}>
          <div className="flex h-full w-auto text-end bg-slate-600 rounded-l-md">
            <select className="bg-inherit self-center" name="region">
              <option value="EUW">EUW1</option>
              <option value="EUW2">EWU2</option>
            </select>
          </div>

          <div className="flex h-full w-full text-end bg-slate-700">
            <input
              className="bg-transparent w-full text-end pr-2 "
              id="summonerName"
              name="summonerName"
              type="text"
              placeholder="SummonerName"
              maxLength={16}
              required
            />
          </div>

          <div className="flex flex-row h-full w-36 pl-2 content-center bg-slate-700 border-l-8 border-l-orange-600">
            <label className="justify-center text-center self-center">
              <b>#</b>
            </label>
            <input
              className="bg-transparent w-full pl-2"
              id="summonerTag"
              name="summonerTag"
              type="text"
              placeholder="TAG"
              maxLength={5}
              required
            />
          </div>

          <div className="flex h-full w-fit aspect-square p-1 bg-slate-600 rounded-r-md">
            <button type="submit">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/search--v1.png"
                alt="search--v1"
              />
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col place-items-center w-full h-full bg-slate-800">
        <div>Summoner Name</div>
        <div>Worst three games (in last 20)</div>
        <div className="flex flex-col place-items-center w-5/6 gap-y-2 p-2 bg-slate-700 rounded-md">
          <GameInfo />
          <GameInfo />
          <GameInfo />
        </div>
      </div>
    </div>
  );
}

function GameInfo() {
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
