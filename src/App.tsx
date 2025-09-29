import { useState, useEffect } from 'react';
import { RankingLists } from './components/RankingLists';
import { MockTrade } from './components/MockTrade';
import { TEAMS, INITIAL_RANKINGS } from './utilities/data';
import { calculatePickNumbers, executeTrade, updateRankings } from './utilities/tradeLogic';
import type { Team, RankingData } from './types';

const App = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [rankings, setRankings] = useState<RankingData[]>(INITIAL_RANKINGS);
  const [activeTab, setActiveTab] = useState<'rankings' | 'trade'>('rankings');

  // Initialize teams with calculated pick numbers
  useEffect(() => {
    const teamsWithPicks = calculatePickNumbers(TEAMS, INITIAL_RANKINGS);
    setTeams(teamsWithPicks);
  }, []);

  const handleRankingChange = (year: number, newRankings: string[]) => {
    const { teams: updatedTeams, rankings: updatedRankings } = updateRankings(
      teams,
      rankings,
      year,
      newRankings
    );
    setTeams(updatedTeams);
    setRankings(updatedRankings);
  };

  const handleExecuteTrade = (
    leftTeamId: string,
    rightTeamId: string,
    leftSelection: { players: string[], draftPicks: string[] },
    rightSelection: { players: string[], draftPicks: string[] }
  ) => {
    const updatedTeams = executeTrade(
      teams,
      leftTeamId,
      rightTeamId,
      leftSelection,
      rightSelection
    );
    
    // Recalculate pick numbers after trade
    const teamsWithUpdatedPicks = calculatePickNumbers(updatedTeams, rankings);
    setTeams(teamsWithUpdatedPicks);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Fantasy Football Annotator</h1>
          <p className="text-gray-600">Mock trades and manage dynasty league rankings</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1">
            <button
              onClick={() => setActiveTab('rankings')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'rankings'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Team Rankings
            </button>
            <button
              onClick={() => setActiveTab('trade')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'trade'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Mock Trade
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'rankings' && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Team Rankings</h2>
                <p className="text-gray-600">
                  Drag and drop teams to reorder rankings. Pick numbers are calculated based on inverse rankings.
                </p>
              </div>
              <RankingLists
                teams={teams}
                rankings={rankings}
                onRankingChange={handleRankingChange}
              />
            </div>
          )}

          {activeTab === 'trade' && (
            <MockTrade
              teams={teams}
              onExecuteTrade={handleExecuteTrade}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Dynasty Fantasy Football League Manager</p>
        </div>
      </div>
    </div>
  );
};

export default App;