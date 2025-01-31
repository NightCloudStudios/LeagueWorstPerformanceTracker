import { reverse } from "dns";

const API_KEY: string = "ENTER_API_HERE";

const SUMMONER_NAME: string = "JustExisting";
const SUMMONER_TAG: string = "ALUNE";
const REGION: string = "euw1";

const urlBase = ".api.riotgames.com";
const urlPathData = "/lol/league/v4/entries/by-summoner/";
const urlPathName = "/lol/summoner/v4/summoners/by-name/";
//const urlSearchParams: string = `?api_key=${process.env.RIOT_DEV_TOKEN}`;
const apiKeyUrl: string = `?api_key=${API_KEY}`;


interface SummonerId {
  puuid: string;
}

interface SummonerMatchIDs{
    matchID: string[];
}

interface SummonerData {
  queueType: string;
  championName: string;
  kills: number;
  assists: string;
  deaths: number;
  totalDamageDealtToChampions: string;
}

interface GameData{
  metadata : metadata;
  info : info;
}

interface metadata{
  participants: string[]
}

interface info{
  participants: SummonerData[]
}



const errorCodes = new Set<number>([
  400, 401, 403, 404, 405, 415, 429, 500, 502, 503, 504,
]);

const GetSummonerData = async (
  platform: string, //which base url to use
  summonerName: string, //which user to get data from
  summonerTag: string
): Promise<SummonerId> => {
    const url = `https://${platform}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}${apiKeyUrl}`;

    
    const request: RequestInfo = new Request(url, {
        method: 'GET',
      })

    try{
        const responce = await fetch(request);
        const resBody = await responce.json();
    
        if (errorCodes.has(responce.status)) {
            throw resBody; //throw goes to the closest catch
        }

        return resBody as SummonerId;
    }
    catch(error){
        console.log(error);
        throw error;
    }

};

const GetMatches = async (
    platform: string, //which base url to use
    summonerPuuid: string, //which user to get data from
  ): Promise<SummonerMatchIDs> => {
      const url = `https://${platform}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids${apiKeyUrl}`;

  //    url = f"https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/{summoner_id}/ids?api_key={API_KEY}"
      
      const request: RequestInfo = new Request(url, {
          method: 'GET',
        })
  
      try{
          const responce = await fetch(request);
          const resBody = await responce.json();
      
          if (errorCodes.has(responce.status)) {
              throw resBody; //throw goes to the closest catch
          }
          return { matchID: resBody};
      }
      catch(error){
          console.log(error);
          throw error;
      }
  
  };


const GetMatchData = async (
    platform: string, //which base url to use
    gameID: string, //which user to get data from
  ): Promise<GameData> => {
      const url = `https://${platform}.api.riotgames.com/lol/match/v5/matches/${gameID}${apiKeyUrl}`;
      
      const request: RequestInfo = new Request(url, {
          method: 'GET',
        })
  
      try{
          const responce = await fetch(request);
          const resBody = await responce.json();
      
          if (errorCodes.has(responce.status)) {
              throw resBody; //throw goes to the closest catch
          }
          //console.log(resBody);
          return resBody as GameData;
      }
      catch(error){
          console.log(error);
          throw error;
      }
  
  };


async function checkGames(games: SummonerMatchIDs, playerPuuid: string){
  var PlayerData : SummonerData[] = [];
  for (const _MatchID of games.matchID) {
    console.log(`Checking ${_MatchID}`);
    
   

    const gameDetails = await GetMatchData("europe", _MatchID);
    
    var playerArrayPos = 0
    gameDetails.metadata.participants.forEach(player => {
      if(player == playerPuuid){
        playerArrayPos = gameDetails.metadata.participants.indexOf(player);
        const pD = gameDetails.info.participants[playerArrayPos];
        

        PlayerData.push(gameDetails.info.participants[playerArrayPos]);
      }
    });
    
  }


  PlayerData.sort((a, b) => b.kills/b.deaths - a.kills/a.deaths).reverse();
  PlayerData = PlayerData.slice(0, 3);
  
  console.log(PlayerData);

}

const doThing = async () => { 
  try {
    const res = await GetSummonerData("europe", SUMMONER_NAME,SUMMONER_TAG); //Get Id
    //console.log(res.puuid);
    const matches = await GetMatches("europe",res.puuid); // Get matches this ID played in

    checkGames(matches,res.puuid); //Check each match get data and compare to find worst.
  } catch {
    console.log("GetSummonerData Failed");
  }
}

doThing();
