import { headers } from "next/headers";

const API_KEY: string = "ENTER_API_HERE";

const SUMMONER_NAME: string = "JustExisting";
const SUMMONER_TAG: string = "ALUNE";
const REGION: string = "euw1";

const urlBase = ".api.riotgames.com";
const urlPathData = "/lol/league/v4/entries/by-summoner/";
const urlPathName = "/lol/summoner/v4/summoners/by-name/";
// const urlSearchParams: string = `?api_key=${process.env.RIOT_DEV_TOKEN}`;
const apiKeyUrl = `?api_key=${process.env.RIOT_KEY}`;
const key: string = process.env.RIOT_KEY as string;

interface SummonerId {
  puuid: string;
}

interface SummonerMatchIDs {
  matchID: string[];
}

export interface SummonerData {
  queueType: string;
  championName: string;
  kills: number;
  assists: string;
  deaths: number;
  totalDamageDealtToChampions: string;
}

interface GameData {
  metadata: metadata;
  info: info;
}

interface metadata {
  participants: string[];
}

interface info {
  participants: SummonerData[];
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
    method: "GET",
  });

  try {
    const responce = await fetch(request);
    const resBody = await responce.json();

    if (errorCodes.has(responce.status)) {
      throw resBody; //throw goes to the closest catch
    }
    return resBody as SummonerId;
  } catch (error) {
    throw error;
  }
};

const GetMatches = async (
  platform: string, //which base url to use
  summonerPuuid: string //which user to get data from
): Promise<SummonerMatchIDs> => {
  const url = `https://${platform}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids${apiKeyUrl}`;

  //    url = f"https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/{summoner_id}/ids?api_key={API_KEY}"

  const request: RequestInfo = new Request(url, {
    method: "GET",
  });

  try {
    const responce = await fetch(request);
    const resBody = await responce.json();

    if (errorCodes.has(responce.status)) {
      throw resBody; //throw goes to the closest catch
    }
    return { matchID: resBody };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GetMatchData = async (
  platform: string, //which base url to use
  gameID: string //which user to get data from
): Promise<GameData> => {
  const url = `https://${platform}.api.riotgames.com/lol/match/v5/matches/${gameID}${apiKeyUrl}`;

  const request: RequestInfo = new Request(url, {
    method: "GET",
  });

  try {
    const responce = await fetch(request);
    const resBody = await responce.json();

    if (errorCodes.has(responce.status)) {
      throw resBody; //throw goes to the closest catch
    }
    //console.log(resBody);
    return resBody as GameData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

async function checkGames(games: SummonerMatchIDs, playerPuuid: string) {
  const PlayerData: SummonerData[] = [];

  //My Way

  games.matchID.forEach(async (matchId) => {
    console.log(`Checking ${matchId}`);

    const gameDetails = await GetMatchData("europe", matchId);

    const pos = gameDetails.metadata.participants.indexOf(playerPuuid);

    //Not found
    if (pos == -1) {
      // console.log(`PlayerPuuid: ${playerPuuid} can not be found in this match`);
      throw Error(`PlayerPuuid: ${playerPuuid} can not be found in this match`); //Idk if should do this
      // return null;
    }

    PlayerData.push(gameDetails.info.participants[pos]);
  });

  /*  Your way

  for (const _MatchID of games.matchID) {
    console.log(`Checking ${_MatchID}`);

    const gameDetails = await GetMatchData("europe", _MatchID);

    // const playerArrayPos = 0 placed lower
    gameDetails.metadata.participants.forEach((player) => {
      if (player == playerPuuid) {
        const playerArrayPos =
          gameDetails.metadata.participants.indexOf(player);
        const pD = gameDetails.info.participants[playerArrayPos];

        PlayerData.push(gameDetails.info.participants[playerArrayPos]);
      }
    });
  }
    */

  PlayerData.sort((a, b) => b.kills / b.deaths - a.kills / a.deaths).reverse();
  const worstGames = PlayerData.slice(0, 3);

  console.log(worstGames);
  return worstGames;
}

export const fetchAllMatchData = async (server: string, summoner: string) => {
  const name = summoner.split("#");

  try {
    // console.log(`Fetching: ${server + summoner}`);
    // const player = await GetSummonerData("europe", SUMMONER_NAME, SUMMONER_TAG); //Get Id
    const player = await GetSummonerData("europe", name[0], name[1]); //Get Id

    //console.log(res.puuid);
    const matches = await GetMatches("europe", player.puuid); // Get matches this ID played in

    const worstGames = await checkGames(matches, player.puuid); //Check each match get data and compare to find worst.

    return worstGames;
  } catch (error) {
    console.log("GetSummonerData Failed: ", error);
  }
};

// fetchAllMatchData(); //for unit testing

/*


https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/qPC4O7VArE-qX22aT5R5bVxXJzLLupVG1czFXKNGkz_Rns8tboGk-A3yDRw7oF0O_lJBtbRQcfcItQ?api_key=RGAPI-df40b1cb-fe8c-4445-bf84-3c406fb9dbc1


*/
