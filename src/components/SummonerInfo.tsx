export default function SummonerInfo() {
  return (
    <div className="flex flex-col place-items-center w-full h-full bg-slate-800 rounded-lg">
      <div>Summoner Name</div>
      <div>Worst three games (in last 20)</div>
      <div className="flex flex-col place-items-center w-5/6 gap-y-2 p-2 bg-slate-700 rounded-md">
        <GameInfo />
        <GameInfo />
        <GameInfo />
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
