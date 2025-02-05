"use client";

import { fetchAllMatchData, SummonerData } from "@/app/logic/lol-data-tool";
import SummonerInfo from "@/components/SummonerInfo";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function SummonerPage() {
  const [sumData, setSumData] = useState<SummonerData[]>([]);

  const pathname = usePathname();

  const server: string = pathname.split("/")[1];
  const user: string = pathname.split("/")[2];

  console.log(`server:${server} + User:${user}`);

  const fetch = async () => {
    //should put player data from search here
    const fetchedData = await fetchAllMatchData(server, user);

    if (fetchedData != undefined) {
      setSumData(fetchedData);
    }
  };

  return (
    <div className="flex justify-self-center w-full md:w-2/3">
      <SummonerInfo SumData={sumData} />
    </div>
  );
}
