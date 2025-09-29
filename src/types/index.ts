export interface Player {
  id: string;
  name: string;
  position: 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DST';
  teamId: string;
}

export interface DraftPick {
  id: string;
  year: number;
  round: number;
  originalTeamId: string; // The team the pick originally came from
  currentTeamId: string; // The team that currently owns the pick
  projectedPickNumber?: number; // Calculated based on rankings
}

export interface Team {
  id: string;
  name: string;
  color: string;
  players: Player[];
  draftPicks: DraftPick[];
}

export interface RankingData {
  year: number;
  rankings: string[]; // Array of team IDs in ranking order (1st place to last place)
}

export interface TradeSelection {
  players: Player[];
  draftPicks: DraftPick[];
}

export interface TradeData {
  leftTeamId: string;
  rightTeamId: string;
  leftSelection: TradeSelection;
  rightSelection: TradeSelection;
}

export type PositionColors = {
  [K in Player['position']]: string;
};