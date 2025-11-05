import { useState } from 'react';
import { ActivityCard } from './ActivityCard';
import { Heart, Info } from './Icons';

export function Saved() {
  const [savedActivities, setSavedActivities] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedActivities(prev =>
      prev.includes(id) ? prev.filter(activityId => activityId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen p-8 pb-32">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Heart className="w-8 h-8 text-teal-600 fill-teal-600" />
          <h1>Mine favoritter</h1>
        </div>
        <p className="text-gray-600">Dine lagrede aktiviteter</p>
      </div>

      {savedActivities.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center shadow-lg">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="w-12 h-12 text-teal-600" />
          </div>
          <h2 className="mb-4">Ingen favoritter ennå</h2>
          <p className="text-gray-600 mb-8">
            Trykk på hjertet på aktiviteter du vil lagre
          </p>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 flex gap-4">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 text-left">
              Tips: Lagre favorittene dine for å enkelt finne dem igjen senere!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Placeholder for saved activities - in real app these would be filtered from activities data */}
          <p className="text-gray-500 text-center py-8">
            Lagrede aktiviteter vil vises her
          </p>
        </div>
      )}
    </div>
  );
}
