import type { Team, RankingData, PositionColors } from '../types';

// Position colors for visual coding
export const POSITION_COLORS: PositionColors = {
  QB: 'bg-red-200',
  RB: 'bg-green-200',
  WR: 'bg-blue-200',
  TE: 'bg-yellow-200',
  K: 'bg-purple-200',
  DST: 'bg-gray-200',
};

// Hardcoded team data
export const TEAMS: Team[] = [
  {
    id: 'warry',
    name: 'Team Warry',
    color: 'bg-red-500',
    players: [
      { id: 'p1', name: 'Josh Allen', position: 'QB', teamId: 'warry' },
      { id: 'p2', name: 'Christian McCaffrey', position: 'RB', teamId: 'warry' },
      { id: 'p3', name: 'Davante Adams', position: 'WR', teamId: 'warry' },
      { id: 'p4', name: 'Travis Kelce', position: 'TE', teamId: 'warry' },
    ],
    draftPicks: [
      { id: 'dp1', year: 2026, round: 1, originalTeamId: 'warry', currentTeamId: 'warry' },
      { id: 'dp2', year: 2026, round: 2, originalTeamId: 'warry', currentTeamId: 'shark' },
      { id: 'dp3', year: 2026, round: 3, originalTeamId: 'warry', currentTeamId: 'warry' },
      { id: 'dp4', year: 2027, round: 1, originalTeamId: 'warry', currentTeamId: 'warry' },
      { id: 'dp5', year: 2027, round: 2, originalTeamId: 'warry', currentTeamId: 'warry' },
      { id: 'dp6', year: 2027, round: 3, originalTeamId: 'warry', currentTeamId: 'warry' },
    ],
  },
  {
    id: 'shark',
    name: 'Team Shark',
    color: 'bg-blue-500',
    players: [
      { id: 'p5', name: 'Lamar Jackson', position: 'QB', teamId: 'shark' },
      { id: 'p6', name: 'Jameson Williams', position: 'WR', teamId: 'shark' },
      { id: 'p7', name: 'Sam LaPorta', position: 'TE', teamId: 'shark' },
      { id: 'p8', name: 'Derrick Henry', position: 'RB', teamId: 'shark' },
    ],
    draftPicks: [
      { id: 'dp7', year: 2026, round: 1, originalTeamId: 'shark', currentTeamId: 'shark' },
      { id: 'dp8', year: 2026, round: 2, originalTeamId: 'warry', currentTeamId: 'shark' }, // From Team Warry
      { id: 'dp9', year: 2026, round: 3, originalTeamId: 'shark', currentTeamId: 'shark' },
      { id: 'dp10', year: 2026, round: 1, originalTeamId: 'eagles', currentTeamId: 'shark' }, // From Team Eagles
      { id: 'dp11', year: 2026, round: 1, originalTeamId: 'lions', currentTeamId: 'shark' }, // From Team Lions
    ],
  },
  {
    id: 'eagles',
    name: 'Team Eagles',
    color: 'bg-green-500',
    players: [
      { id: 'p9', name: 'Jalen Hurts', position: 'QB', teamId: 'eagles' },
      { id: 'p10', name: 'Saquon Barkley', position: 'RB', teamId: 'eagles' },
      { id: 'p11', name: 'A.J. Brown', position: 'WR', teamId: 'eagles' },
      { id: 'p12', name: 'Dallas Goedert', position: 'TE', teamId: 'eagles' },
    ],
    draftPicks: [
      { id: 'dp12', year: 2026, round: 2, originalTeamId: 'eagles', currentTeamId: 'eagles' },
      { id: 'dp13', year: 2026, round: 3, originalTeamId: 'eagles', currentTeamId: 'eagles' },
      { id: 'dp14', year: 2027, round: 1, originalTeamId: 'eagles', currentTeamId: 'eagles' },
      { id: 'dp15', year: 2027, round: 2, originalTeamId: 'eagles', currentTeamId: 'eagles' },
      { id: 'dp16', year: 2027, round: 3, originalTeamId: 'eagles', currentTeamId: 'eagles' },
    ],
  },
  {
    id: 'lions',
    name: 'Team Lions',
    color: 'bg-purple-500',
    players: [
      { id: 'p13', name: 'Jared Goff', position: 'QB', teamId: 'lions' },
      { id: 'p14', name: 'Jahmyr Gibbs', position: 'RB', teamId: 'lions' },
      { id: 'p15', name: 'Amon-Ra St. Brown', position: 'WR', teamId: 'lions' },
      { id: 'p16', name: 'David Montgomery', position: 'RB', teamId: 'lions' },
    ],
    draftPicks: [
      { id: 'dp17', year: 2026, round: 2, originalTeamId: 'lions', currentTeamId: 'lions' },
      { id: 'dp18', year: 2026, round: 3, originalTeamId: 'lions', currentTeamId: 'lions' },
      { id: 'dp19', year: 2027, round: 1, originalTeamId: 'lions', currentTeamId: 'lions' },
      { id: 'dp20', year: 2027, round: 2, originalTeamId: 'lions', currentTeamId: 'lions' },
      { id: 'dp21', year: 2027, round: 3, originalTeamId: 'lions', currentTeamId: 'lions' },
    ],
  },
  {
    id: 'cowboys',
    name: 'Team Cowboys',
    color: 'bg-indigo-500',
    players: [
      { id: 'p17', name: 'Dak Prescott', position: 'QB', teamId: 'cowboys' },
      { id: 'p18', name: 'CeeDee Lamb', position: 'WR', teamId: 'cowboys' },
      { id: 'p19', name: 'Ezekiel Elliott', position: 'RB', teamId: 'cowboys' },
      { id: 'p20', name: 'Jake Ferguson', position: 'TE', teamId: 'cowboys' },
    ],
    draftPicks: [
      { id: 'dp22', year: 2026, round: 1, originalTeamId: 'cowboys', currentTeamId: 'cowboys' },
      { id: 'dp23', year: 2026, round: 2, originalTeamId: 'cowboys', currentTeamId: 'cowboys' },
      { id: 'dp24', year: 2026, round: 3, originalTeamId: 'cowboys', currentTeamId: 'cowboys' },
      { id: 'dp25', year: 2027, round: 1, originalTeamId: 'cowboys', currentTeamId: 'cowboys' },
      { id: 'dp26', year: 2027, round: 2, originalTeamId: 'cowboys', currentTeamId: 'cowboys' },
      { id: 'dp27', year: 2027, round: 3, originalTeamId: 'cowboys', currentTeamId: 'cowboys' },
    ],
  },
  {
    id: 'chiefs',
    name: 'Team Chiefs',
    color: 'bg-yellow-500',
    players: [
      { id: 'p21', name: 'Patrick Mahomes', position: 'QB', teamId: 'chiefs' },
      { id: 'p22', name: 'Tyreek Hill', position: 'WR', teamId: 'chiefs' },
      { id: 'p23', name: 'Kareem Hunt', position: 'RB', teamId: 'chiefs' },
      { id: 'p24', name: 'Noah Gray', position: 'TE', teamId: 'chiefs' },
    ],
    draftPicks: [
      { id: 'dp28', year: 2026, round: 1, originalTeamId: 'chiefs', currentTeamId: 'chiefs' },
      { id: 'dp29', year: 2026, round: 2, originalTeamId: 'chiefs', currentTeamId: 'chiefs' },
      { id: 'dp30', year: 2026, round: 3, originalTeamId: 'chiefs', currentTeamId: 'chiefs' },
      { id: 'dp31', year: 2027, round: 1, originalTeamId: 'chiefs', currentTeamId: 'chiefs' },
      { id: 'dp32', year: 2027, round: 2, originalTeamId: 'chiefs', currentTeamId: 'chiefs' },
      { id: 'dp33', year: 2027, round: 3, originalTeamId: 'chiefs', currentTeamId: 'chiefs' },
    ],
  },
  {
    id: 'ravens',
    name: 'Team Ravens',
    color: 'bg-gray-500',
    players: [
      { id: 'p25', name: 'Joe Burrow', position: 'QB', teamId: 'ravens' },
      { id: 'p26', name: 'Ja\'Marr Chase', position: 'WR', teamId: 'ravens' },
      { id: 'p27', name: 'Joe Mixon', position: 'RB', teamId: 'ravens' },
      { id: 'p28', name: 'Tee Higgins', position: 'WR', teamId: 'ravens' },
    ],
    draftPicks: [
      { id: 'dp34', year: 2026, round: 1, originalTeamId: 'ravens', currentTeamId: 'ravens' },
      { id: 'dp35', year: 2026, round: 2, originalTeamId: 'ravens', currentTeamId: 'ravens' },
      { id: 'dp36', year: 2026, round: 3, originalTeamId: 'ravens', currentTeamId: 'ravens' },
      { id: 'dp37', year: 2027, round: 1, originalTeamId: 'ravens', currentTeamId: 'ravens' },
      { id: 'dp38', year: 2027, round: 2, originalTeamId: 'ravens', currentTeamId: 'ravens' },
      { id: 'dp39', year: 2027, round: 3, originalTeamId: 'ravens', currentTeamId: 'ravens' },
    ],
  },
  {
    id: 'steelers',
    name: 'Team Steelers',
    color: 'bg-orange-500',
    players: [
      { id: 'p29', name: 'Russell Wilson', position: 'QB', teamId: 'steelers' },
      { id: 'p30', name: 'Najee Harris', position: 'RB', teamId: 'steelers' },
      { id: 'p31', name: 'George Pickens', position: 'WR', teamId: 'steelers' },
      { id: 'p32', name: 'Pat Freiermuth', position: 'TE', teamId: 'steelers' },
    ],
    draftPicks: [
      { id: 'dp40', year: 2026, round: 1, originalTeamId: 'steelers', currentTeamId: 'steelers' },
      { id: 'dp41', year: 2026, round: 2, originalTeamId: 'steelers', currentTeamId: 'steelers' },
      { id: 'dp42', year: 2026, round: 3, originalTeamId: 'steelers', currentTeamId: 'steelers' },
      { id: 'dp43', year: 2027, round: 1, originalTeamId: 'steelers', currentTeamId: 'steelers' },
      { id: 'dp44', year: 2027, round: 2, originalTeamId: 'steelers', currentTeamId: 'steelers' },
      { id: 'dp45', year: 2027, round: 3, originalTeamId: 'steelers', currentTeamId: 'steelers' },
    ],
  },
  {
    id: 'packers',
    name: 'Team Packers',
    color: 'bg-teal-500',
    players: [
      { id: 'p33', name: 'Jordan Love', position: 'QB', teamId: 'packers' },
      { id: 'p34', name: 'Josh Jacobs', position: 'RB', teamId: 'packers' },
      { id: 'p35', name: 'Jayden Reed', position: 'WR', teamId: 'packers' },
      { id: 'p36', name: 'Tucker Kraft', position: 'TE', teamId: 'packers' },
    ],
    draftPicks: [
      { id: 'dp46', year: 2026, round: 1, originalTeamId: 'packers', currentTeamId: 'packers' },
      { id: 'dp47', year: 2026, round: 2, originalTeamId: 'packers', currentTeamId: 'packers' },
      { id: 'dp48', year: 2026, round: 3, originalTeamId: 'packers', currentTeamId: 'packers' },
      { id: 'dp49', year: 2027, round: 1, originalTeamId: 'packers', currentTeamId: 'packers' },
      { id: 'dp50', year: 2027, round: 2, originalTeamId: 'packers', currentTeamId: 'packers' },
      { id: 'dp51', year: 2027, round: 3, originalTeamId: 'packers', currentTeamId: 'packers' },
    ],
  },
  {
    id: 'bills',
    name: 'Team Bills',
    color: 'bg-pink-500',
    players: [
      { id: 'p37', name: 'Josh Gordon', position: 'WR', teamId: 'bills' },
      { id: 'p38', name: 'James Cook', position: 'RB', teamId: 'bills' },
      { id: 'p39', name: 'Stefon Diggs', position: 'WR', teamId: 'bills' },
      { id: 'p40', name: 'Dawson Knox', position: 'TE', teamId: 'bills' },
    ],
    draftPicks: [
      { id: 'dp52', year: 2026, round: 1, originalTeamId: 'bills', currentTeamId: 'bills' },
      { id: 'dp53', year: 2026, round: 2, originalTeamId: 'bills', currentTeamId: 'bills' },
      { id: 'dp54', year: 2026, round: 3, originalTeamId: 'bills', currentTeamId: 'bills' },
      { id: 'dp55', year: 2027, round: 1, originalTeamId: 'bills', currentTeamId: 'bills' },
      { id: 'dp56', year: 2027, round: 2, originalTeamId: 'bills', currentTeamId: 'bills' },
      { id: 'dp57', year: 2027, round: 3, originalTeamId: 'bills', currentTeamId: 'bills' },
    ],
  },
];

// Initial rankings for each year (Team Warry is #1 for 2025 as per example)
export const INITIAL_RANKINGS: RankingData[] = [
  {
    year: 2025,
    rankings: ['warry', 'shark', 'eagles', 'lions', 'cowboys', 'chiefs', 'ravens', 'steelers', 'packers', 'bills'],
  },
  {
    year: 2026,
    rankings: ['warry', 'shark', 'eagles', 'lions', 'cowboys', 'chiefs', 'ravens', 'steelers', 'packers', 'bills'],
  },
  {
    year: 2027,
    rankings: ['warry', 'shark', 'eagles', 'lions', 'cowboys', 'chiefs', 'ravens', 'steelers', 'packers', 'bills'],
  },
];