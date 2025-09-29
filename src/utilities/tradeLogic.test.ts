import { describe, it, expect } from 'vitest';
import { TEAMS, INITIAL_RANKINGS } from '../utilities/data';
import { calculatePickNumbers, executeTrade, getPicksByTeam } from '../utilities/tradeLogic';

describe('Fantasy Football Annotator', () => {
  describe('Team Data Persistence', () => {
    it('should maintain team information consistency', () => {
      // Test that inputted information per team remains associated with those teams
      const warryTeam = TEAMS.find(team => team.id === 'warry');
      const sharkTeam = TEAMS.find(team => team.id === 'shark');
      
      expect(warryTeam).toBeDefined();
      expect(sharkTeam).toBeDefined();
      
      // Check Team Warry data
      expect(warryTeam?.name).toBe('Team Warry');
      expect(warryTeam?.color).toBe('bg-red-500');
      expect(warryTeam?.players).toHaveLength(4);
      expect(warryTeam?.players.some(p => p.name === 'Josh Allen')).toBe(true);
      
      // Check Team Shark data
      expect(sharkTeam?.name).toBe('Team Shark');
      expect(sharkTeam?.color).toBe('bg-blue-500');
      expect(sharkTeam?.players).toHaveLength(4);
      expect(sharkTeam?.players.some(p => p.name === 'Jameson Williams')).toBe(true);
      expect(sharkTeam?.players.some(p => p.name === 'Sam LaPorta')).toBe(true);
    });

    it('should maintain draft pick ownership across teams', () => {
      // Test that Team Shark has Team Warry's 2026 second pick
      const sharkPicks = getPicksByTeam(TEAMS, 'shark');
      const warrySecondPick = sharkPicks.find(
        pick => pick.originalTeamId === 'warry' && pick.year === 2026 && pick.round === 2
      );
      
      expect(warrySecondPick).toBeDefined();
      expect(warrySecondPick?.currentTeamId).toBe('shark');
      expect(warrySecondPick?.originalTeamId).toBe('warry');
    });
  });

  describe('Pick Number Calculation', () => {
    it('should assign pick numbers correctly according to rankings', () => {
      const teamsWithPicks = calculatePickNumbers(TEAMS, INITIAL_RANKINGS);
      
      // Team Warry is #1 in 2025, so their 2026 picks should be last (10th in 10-team league)
      const warryTeam = teamsWithPicks.find(t => t.id === 'warry');
      const warry2026FirstPick = warryTeam?.draftPicks.find(
        pick => pick.year === 2026 && pick.round === 1 && pick.originalTeamId === 'warry'
      );
      
      expect(warry2026FirstPick?.projectedPickNumber).toBe(10); // 10th pick (inverse of 1st place)
      
      // Check second round pick (should be 20th - 10 + 10)
      const warry2026SecondPick = warryTeam?.draftPicks.find(
        pick => pick.year === 2026 && pick.round === 2 && pick.originalTeamId === 'warry'
      );
      
      expect(warry2026SecondPick?.projectedPickNumber).toBe(20);
    });

    it('should update pick numbers when rankings change', () => {
      const initialTeams = calculatePickNumbers(TEAMS, INITIAL_RANKINGS);
      
      // Change Team Warry from #1 to #3 in 2025
      const newRankings = [...INITIAL_RANKINGS];
      newRankings[0] = {
        ...newRankings[0],
        rankings: ['shark', 'eagles', 'warry', 'lions', 'cowboys', 'chiefs', 'ravens', 'steelers', 'packers', 'bills']
      };
      
      const updatedTeams = calculatePickNumbers(initialTeams, newRankings);
      
      // Team Warry is now #3, so their 2026 first pick should be 8th (10 - 3 + 1 = 8)
      const warryTeam = updatedTeams.find(t => t.id === 'warry');
      const warry2026FirstPick = warryTeam?.draftPicks.find(
        pick => pick.year === 2026 && pick.round === 1 && pick.originalTeamId === 'warry'
      );
      
      expect(warry2026FirstPick?.projectedPickNumber).toBe(8);
    });
  });

  describe('Team Color Associations', () => {
    it('should correctly associate colors with team picks', () => {
      const teamsWithPicks = calculatePickNumbers(TEAMS, INITIAL_RANKINGS);
      
      // Check that each team's color is properly defined
      teamsWithPicks.forEach(team => {
        expect(team.color).toMatch(/^bg-\w+-\d{3}$/);
      });
      
      // Check specific color associations
      const warryTeam = teamsWithPicks.find(t => t.id === 'warry');
      const sharkTeam = teamsWithPicks.find(t => t.id === 'shark');
      
      expect(warryTeam?.color).toBe('bg-red-500');
      expect(sharkTeam?.color).toBe('bg-blue-500');
    });

    it('should maintain original team color for traded picks', () => {
      // Team Shark has Team Warry's pick, but the pick should still show Team Warry's color context
      const sharkPicks = getPicksByTeam(TEAMS, 'shark');
      const warryPickOwnedByShark = sharkPicks.find(
        pick => pick.originalTeamId === 'warry'
      );
      
      expect(warryPickOwnedByShark).toBeDefined();
      expect(warryPickOwnedByShark?.originalTeamId).toBe('warry');
      expect(warryPickOwnedByShark?.currentTeamId).toBe('shark');
      
      // The original team should still be identifiable for color coding
      const originalTeam = TEAMS.find(t => t.id === warryPickOwnedByShark?.originalTeamId);
      expect(originalTeam?.color).toBe('bg-red-500');
    });
  });

  describe('Trade Functionality', () => {
    it('should execute trades correctly', () => {
      const initialTeams = [...TEAMS];
      
      // Execute the example trade: Team Warry's 2026 first pick for Jameson Williams and Sam LaPorta
      const warryFirstPickId = initialTeams
        .find(t => t.id === 'warry')
        ?.draftPicks.find(p => p.year === 2026 && p.round === 1)?.id;
      
      const jamesonWilliamsId = initialTeams
        .find(t => t.id === 'shark')
        ?.players.find(p => p.name === 'Jameson Williams')?.id;
      
      const samLaPortaId = initialTeams
        .find(t => t.id === 'shark')
        ?.players.find(p => p.name === 'Sam LaPorta')?.id;
      
      expect(warryFirstPickId).toBeDefined();
      expect(jamesonWilliamsId).toBeDefined();
      expect(samLaPortaId).toBeDefined();
      
      const updatedTeams = executeTrade(
        initialTeams,
        'warry',
        'shark',
        { players: [], draftPicks: [warryFirstPickId!] },
        { players: [jamesonWilliamsId!, samLaPortaId!], draftPicks: [] }
      );
      
      // Check that players moved correctly
      const updatedWarryTeam = updatedTeams.find(t => t.id === 'warry');
      const updatedSharkTeam = updatedTeams.find(t => t.id === 'shark');
      
      expect(updatedWarryTeam?.players.some(p => p.name === 'Jameson Williams')).toBe(true);
      expect(updatedWarryTeam?.players.some(p => p.name === 'Sam LaPorta')).toBe(true);
      expect(updatedSharkTeam?.players.some(p => p.name === 'Jameson Williams')).toBe(false);
      expect(updatedSharkTeam?.players.some(p => p.name === 'Sam LaPorta')).toBe(false);
      
      // Check that pick ownership changed
      const sharkPicks = getPicksByTeam(updatedTeams, 'shark');
      const warryPickNowWithShark = sharkPicks.find(
        pick => pick.id === warryFirstPickId && pick.originalTeamId === 'warry'
      );
      
      expect(warryPickNowWithShark).toBeDefined();
      expect(warryPickNowWithShark?.currentTeamId).toBe('shark');
    });
  });
});