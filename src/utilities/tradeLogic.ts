import type { Team, DraftPick, RankingData } from '../types';

/**
 * Calculate projected pick numbers based on rankings
 * Pick numbers are inverse of rankings from the year before with each subsequent pick adding 10
 */
export const calculatePickNumbers = (
  teams: Team[],
  rankings: RankingData[]
): Team[] => {
  const updatedTeams = teams.map(team => ({ ...team, draftPicks: [...team.draftPicks] }));
  
  rankings.forEach(yearRanking => {
    const { year } = yearRanking;
    
    // Find the previous year's rankings to determine pick order
    const previousYear = year - 1;
    const previousYearRankings = rankings.find(r => r.year === previousYear);
    
    if (!previousYearRankings) return;
    
    updatedTeams.forEach(team => {
      team.draftPicks.forEach(pick => {
        if (pick.year === year) {
          // Find the position of the original team in previous year's rankings
          const originalTeamPosition = previousYearRankings.rankings.indexOf(pick.originalTeamId);
          
          if (originalTeamPosition !== -1) {
            // Calculate pick number: inverse of position + (round - 1) * 10
            // Position 0 (1st place) gets pick 10, position 1 (2nd place) gets pick 9, etc.
            const totalTeams = previousYearRankings.rankings.length;
            const inversePosition = totalTeams - originalTeamPosition;
            pick.projectedPickNumber = inversePosition + (pick.round - 1) * totalTeams;
          }
        }
      });
    });
  });
  
  return updatedTeams;
};

/**
 * Get picks owned by a specific team
 */
export const getPicksByTeam = (teams: Team[], teamId: string): DraftPick[] => {
  const allPicks: DraftPick[] = [];
  teams.forEach(team => {
    team.draftPicks.forEach(pick => {
      if (pick.currentTeamId === teamId) {
        allPicks.push(pick);
      }
    });
  });
  return allPicks.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.round !== b.round) return a.round - b.round;
    return (a.projectedPickNumber || 0) - (b.projectedPickNumber || 0);
  });
};

/**
 * Execute a trade between two teams
 */
export const executeTrade = (
  teams: Team[],
  leftTeamId: string,
  rightTeamId: string,
  leftSelection: { players: string[], draftPicks: string[] },
  rightSelection: { players: string[], draftPicks: string[] }
): Team[] => {
  const updatedTeams = teams.map(team => ({
    ...team,
    players: [...team.players],
    draftPicks: [...team.draftPicks]
  }));
  
  const leftTeam = updatedTeams.find(t => t.id === leftTeamId);
  const rightTeam = updatedTeams.find(t => t.id === rightTeamId);
  
  if (!leftTeam || !rightTeam) return updatedTeams;
  
  // Move players
  leftSelection.players.forEach(playerId => {
    const playerIndex = leftTeam.players.findIndex(p => p.id === playerId);
    if (playerIndex !== -1) {
      const player = leftTeam.players.splice(playerIndex, 1)[0];
      player.teamId = rightTeamId;
      rightTeam.players.push(player);
    }
  });
  
  rightSelection.players.forEach(playerId => {
    const playerIndex = rightTeam.players.findIndex(p => p.id === playerId);
    if (playerIndex !== -1) {
      const player = rightTeam.players.splice(playerIndex, 1)[0];
      player.teamId = leftTeamId;
      leftTeam.players.push(player);
    }
  });
  
  // Move draft picks
  updatedTeams.forEach(team => {
    team.draftPicks.forEach(pick => {
      if (leftSelection.draftPicks.includes(pick.id) && pick.currentTeamId === leftTeamId) {
        pick.currentTeamId = rightTeamId;
      } else if (rightSelection.draftPicks.includes(pick.id) && pick.currentTeamId === rightTeamId) {
        pick.currentTeamId = leftTeamId;
      }
    });
  });
  
  return updatedTeams;
};

/**
 * Update rankings and recalculate pick numbers
 */
export const updateRankings = (
  teams: Team[],
  rankings: RankingData[],
  year: number,
  newRankings: string[]
): { teams: Team[], rankings: RankingData[] } => {
  const updatedRankings = rankings.map(r => 
    r.year === year ? { ...r, rankings: [...newRankings] } : r
  );
  
  const updatedTeams = calculatePickNumbers(teams, updatedRankings);
  
  return { teams: updatedTeams, rankings: updatedRankings };
};