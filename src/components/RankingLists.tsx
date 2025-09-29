import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Team, RankingData } from '../types';

interface SortableItemProps {
  id: string;
  team: Team;
  position: number;
}

const SortableItem = ({ id, team, position }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${team.color} text-white p-3 rounded-lg shadow-md cursor-move mb-2 flex justify-between items-center hover:shadow-lg transition-shadow`}
    >
      <span className="font-semibold">{team.name}</span>
      <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded">#{position}</span>
    </div>
  );
};

interface RankingListProps {
  year: number;
  teams: Team[];
  rankings: string[];
  onRankingChange: (year: number, newRankings: string[]) => void;
}

const RankingList = ({ year, teams, rankings, onRankingChange }: RankingListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = rankings.indexOf(active.id as string);
      const newIndex = rankings.indexOf(over.id as string);

      const newRankings = arrayMove(rankings, oldIndex, newIndex);
      onRankingChange(year, newRankings);
    }
  };

  const teamsMap = new Map(teams.map(team => [team.id, team]));

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">{year} Rankings</h3>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={rankings} strategy={verticalListSortingStrategy}>
          {rankings.map((teamId, index) => {
            const team = teamsMap.get(teamId);
            if (!team) return null;
            return (
              <SortableItem
                key={teamId}
                id={teamId}
                team={team}
                position={index + 1}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
};

interface RankingListsProps {
  teams: Team[];
  rankings: RankingData[];
  onRankingChange: (year: number, newRankings: string[]) => void;
}

export const RankingLists = ({ teams, rankings, onRankingChange }: RankingListsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {rankings.map(rankingData => (
        <RankingList
          key={rankingData.year}
          year={rankingData.year}
          teams={teams}
          rankings={rankingData.rankings}
          onRankingChange={onRankingChange}
        />
      ))}
    </div>
  );
};