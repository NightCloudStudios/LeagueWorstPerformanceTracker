import { useEffect, useState } from "react";
import { SummonerData } from "./util/types";
import { fetchAllMatchData } from "./util/lol-api-tool";
import SummonerInfo, { SummonerInfoSkeleton } from "./components/SummonerInfo";

export default function SummonerPage() {
  const [sumData, setSumData] = useState<SummonerData[]>([]);
  // const pathname = usePathname();
  // const server: string = pathname.split("/")[1];
  // const user: string = pathname.split("/")[2].replace("-", "#");
  const [isLoading, setLoading] = useState(true);

  // console.log(`server:${server} + User:${user}`);

  /*
  useEffect(() => {
    const fetch = async () => {
      //try catch with axios? or check nextjs for things
      //should put player data from search here
      const fetchedData = await fetchAllMatchData(server, user); //------ Get from somewhere

      if (fetchedData != undefined) {
        setSumData(fetchedData);
      }
      setLoading(false);
    };

    fetch();
  }, [server, user]);
  */
  if (isLoading) return <SummonerInfoSkeleton />;
  if (sumData.length == 0) return <p>No Summoner Data</p>;
  return (
    <div className="flex justify-self-center w-full md:w-2/3">
      <SummonerInfo sumData={sumData} />
    </div>
  );
}
