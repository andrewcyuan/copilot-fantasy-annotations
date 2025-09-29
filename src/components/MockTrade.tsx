import { useState } from 'react';
import type { Team, Player, DraftPick } from '../types';
import { POSITION_COLORS } from '../utilities/data';
import { getPicksByTeam } from '../utilities/tradeLogic';

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  onToggle: () => void;
}

const PlayerCard = ({ player, isSelected, onToggle }: PlayerCardProps) => {
  const positionColor = POSITION_COLORS[player.position];
  
  return (
    <div
      className={`${positionColor} p-3 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected ? 'border-blue-500 bg-opacity-80' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onToggle}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-gray-800">{player.name}</div>
          <div className="text-sm text-gray-600">{player.position}</div>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
        }`}>
          {isSelected && <div className="w-3 h-3 bg-white rounded-full"></div>}
        </div>
      </div>
    </div>
  );
};

interface DraftPickCardProps {
  pick: DraftPick;
  teams: Team[];
  isSelected: boolean;
  onToggle: () => void;
}

const DraftPickCard = ({ pick, teams, isSelected, onToggle }: DraftPickCardProps) => {
  const originalTeam = teams.find(t => t.id === pick.originalTeamId);
  const pickNumber = pick.projectedPickNumber || 'TBD';
  
  return (
    <div
      className={`${originalTeam?.color || 'bg-gray-500'} text-white p-3 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected ? 'border-yellow-400 bg-opacity-80' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onToggle}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">{pick.year} Round {pick.round}</div>
          <div className="text-sm text-gray-200">Pick #{pickNumber}</div>
          <div className="text-xs text-gray-300">from {originalTeam?.name}</div>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          isSelected ? 'bg-yellow-400 border-yellow-400' : 'border-gray-300'
        }`}>
          {isSelected && <div className="w-3 h-3 bg-white rounded-full"></div>}
        </div>
      </div>
    </div>
  );
};

interface TeamAssetsProps {
  team: Team;
  teams: Team[];
  selectedPlayers: Set<string>;
  selectedPicks: Set<string>;
  onPlayerToggle: (playerId: string) => void;
  onPickToggle: (pickId: string) => void;
}

const TeamAssets = ({ 
  team, 
  teams, 
  selectedPlayers, 
  selectedPicks, 
  onPlayerToggle, 
  onPickToggle 
}: TeamAssetsProps) => {
  const teamPicks = getPicksByTeam(teams, team.id);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className={`${team.color} text-white p-2 rounded-t-lg font-bold text-center`}>
        {team.name}
      </h3>
      
      <div className="mt-4">
        <h4 className="font-semibold text-gray-700 mb-2">Players</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {team.players.map(player => (
            <PlayerCard
              key={player.id}
              player={player}
              isSelected={selectedPlayers.has(player.id)}
              onToggle={() => onPlayerToggle(player.id)}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-semibold text-gray-700 mb-2">Draft Picks</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {teamPicks.map(pick => (
            <DraftPickCard
              key={pick.id}
              pick={pick}
              teams={teams}
              isSelected={selectedPicks.has(pick.id)}
              onToggle={() => onPickToggle(pick.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface TradePreviewProps {
  leftTeam: Team;
  rightTeam: Team;
  teams: Team[];
  leftPlayers: Player[];
  leftPicks: DraftPick[];
  rightPlayers: Player[];
  rightPicks: DraftPick[];
  onExecuteTrade: () => void;
}

const TradePreview = ({ 
  leftTeam, 
  rightTeam, 
  teams, 
  leftPlayers, 
  leftPicks, 
  rightPlayers, 
  rightPicks, 
  onExecuteTrade 
}: TradePreviewProps) => {
  const hasLeftAssets = leftPlayers.length > 0 || leftPicks.length > 0;
  const hasRightAssets = rightPlayers.length > 0 || rightPicks.length > 0;
  const canExecute = hasLeftAssets && hasRightAssets;
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-center text-gray-800 mb-4">Trade Preview</h3>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <h4 className={`${leftTeam.color} text-white p-2 rounded text-center font-semibold mb-2`}>
            {leftTeam.name} Gives
          </h4>
          <div className="space-y-1">
            {leftPlayers.map(player => (
              <div key={player.id} className="text-sm text-gray-700">
                {player.name} ({player.position})
              </div>
            ))}
            {leftPicks.map(pick => {
              const originalTeam = teams.find(t => t.id === pick.originalTeamId);
              return (
                <div key={pick.id} className="text-sm text-gray-700">
                  {pick.year} R{pick.round} (#{pick.projectedPickNumber || 'TBD'}) from {originalTeam?.name}
                </div>
              );
            })}
            {!hasLeftAssets && <div className="text-sm text-gray-500 italic">No assets selected</div>}
          </div>
        </div>
        
        <div className="mx-4">
          <button
            onClick={onExecuteTrade}
            disabled={!canExecute}
            className={`p-3 rounded-full ${
              canExecute
                ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors`}
            title="Execute Trade"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
            </svg>
          </button>
        </div>
        
        <div className="flex-1">
          <h4 className={`${rightTeam.color} text-white p-2 rounded text-center font-semibold mb-2`}>
            {rightTeam.name} Gives
          </h4>
          <div className="space-y-1">
            {rightPlayers.map(player => (
              <div key={player.id} className="text-sm text-gray-700">
                {player.name} ({player.position})
              </div>
            ))}
            {rightPicks.map(pick => {
              const originalTeam = teams.find(t => t.id === pick.originalTeamId);
              return (
                <div key={pick.id} className="text-sm text-gray-700">
                  {pick.year} R{pick.round} (#{pick.projectedPickNumber || 'TBD'}) from {originalTeam?.name}
                </div>
              );
            })}
            {!hasRightAssets && <div className="text-sm text-gray-500 italic">No assets selected</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MockTradeProps {
  teams: Team[];
  onExecuteTrade: (
    leftTeamId: string,
    rightTeamId: string,
    leftSelection: { players: string[], draftPicks: string[] },
    rightSelection: { players: string[], draftPicks: string[] }
  ) => void;
}

export const MockTrade = ({ teams, onExecuteTrade }: MockTradeProps) => {
  const [leftTeamId, setLeftTeamId] = useState(teams[0]?.id || '');
  const [rightTeamId, setRightTeamId] = useState(teams[1]?.id || '');
  const [selectedLeftPlayers, setSelectedLeftPlayers] = useState<Set<string>>(new Set());
  const [selectedLeftPicks, setSelectedLeftPicks] = useState<Set<string>>(new Set());
  const [selectedRightPlayers, setSelectedRightPlayers] = useState<Set<string>>(new Set());
  const [selectedRightPicks, setSelectedRightPicks] = useState<Set<string>>(new Set());
  
  const leftTeam = teams.find(t => t.id === leftTeamId);
  const rightTeam = teams.find(t => t.id === rightTeamId);
  
  const handleLeftPlayerToggle = (playerId: string) => {
    const newSet = new Set(selectedLeftPlayers);
    if (newSet.has(playerId)) {
      newSet.delete(playerId);
    } else {
      newSet.add(playerId);
    }
    setSelectedLeftPlayers(newSet);
  };
  
  const handleLeftPickToggle = (pickId: string) => {
    const newSet = new Set(selectedLeftPicks);
    if (newSet.has(pickId)) {
      newSet.delete(pickId);
    } else {
      newSet.add(pickId);
    }
    setSelectedLeftPicks(newSet);
  };
  
  const handleRightPlayerToggle = (playerId: string) => {
    const newSet = new Set(selectedRightPlayers);
    if (newSet.has(playerId)) {
      newSet.delete(playerId);
    } else {
      newSet.add(playerId);
    }
    setSelectedRightPlayers(newSet);
  };
  
  const handleRightPickToggle = (pickId: string) => {
    const newSet = new Set(selectedRightPicks);
    if (newSet.has(pickId)) {
      newSet.delete(pickId);
    } else {
      newSet.add(pickId);
    }
    setSelectedRightPicks(newSet);
  };
  
  const handleExecuteTrade = () => {
    if (!leftTeam || !rightTeam) return;
    
    onExecuteTrade(
      leftTeamId,
      rightTeamId,
      { players: Array.from(selectedLeftPlayers), draftPicks: Array.from(selectedLeftPicks) },
      { players: Array.from(selectedRightPlayers), draftPicks: Array.from(selectedRightPicks) }
    );
    
    // Clear selections after trade
    setSelectedLeftPlayers(new Set());
    setSelectedLeftPicks(new Set());
    setSelectedRightPlayers(new Set());
    setSelectedRightPicks(new Set());
  };
  
  const getSelectedPlayers = (playerIds: Set<string>, allTeams: Team[]) => {
    const players: Player[] = [];
    allTeams.forEach(team => {
      team.players.forEach(player => {
        if (playerIds.has(player.id)) {
          players.push(player);
        }
      });
    });
    return players;
  };
  
  const getSelectedPicks = (pickIds: Set<string>, allTeams: Team[]) => {
    const picks: DraftPick[] = [];
    allTeams.forEach(team => {
      team.draftPicks.forEach(pick => {
        if (pickIds.has(pick.id)) {
          picks.push(pick);
        }
      });
    });
    return picks;
  };
  
  if (!leftTeam || !rightTeam) return null;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Mock Trade</h2>
      
      {/* Team Selection */}
      <div className="flex justify-center space-x-8 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Left Team</label>
          <select
            value={leftTeamId}
            onChange={(e) => {
              setLeftTeamId(e.target.value);
              setSelectedLeftPlayers(new Set());
              setSelectedLeftPicks(new Set());
            }}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {teams.map(team => (
              <option key={team.id} value={team.id} disabled={team.id === rightTeamId}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Right Team</label>
          <select
            value={rightTeamId}
            onChange={(e) => {
              setRightTeamId(e.target.value);
              setSelectedRightPlayers(new Set());
              setSelectedRightPicks(new Set());
            }}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {teams.map(team => (
              <option key={team.id} value={team.id} disabled={team.id === leftTeamId}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Trade Preview */}
      <TradePreview
        leftTeam={leftTeam}
        rightTeam={rightTeam}
        teams={teams}
        leftPlayers={getSelectedPlayers(selectedLeftPlayers, teams)}
        leftPicks={getSelectedPicks(selectedLeftPicks, teams)}
        rightPlayers={getSelectedPlayers(selectedRightPlayers, teams)}
        rightPicks={getSelectedPicks(selectedRightPicks, teams)}
        onExecuteTrade={handleExecuteTrade}
      />
      
      {/* Team Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeamAssets
          team={leftTeam}
          teams={teams}
          selectedPlayers={selectedLeftPlayers}
          selectedPicks={selectedLeftPicks}
          onPlayerToggle={handleLeftPlayerToggle}
          onPickToggle={handleLeftPickToggle}
        />
        
        <TeamAssets
          team={rightTeam}
          teams={teams}
          selectedPlayers={selectedRightPlayers}
          selectedPicks={selectedRightPicks}
          onPlayerToggle={handleRightPlayerToggle}
          onPickToggle={handleRightPickToggle}
        />
      </div>
    </div>
  );
};