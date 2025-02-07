export interface SummonerId {
  puuid: string;
}

export interface SummonerMatchIDs {
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

export interface GameData {
  metadata: metadata;
  info: info;
}

export interface metadata {
  participants: string[];
}

export interface info {
  participants: SummonerData[];
}