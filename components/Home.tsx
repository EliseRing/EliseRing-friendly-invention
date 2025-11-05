import { useState } from 'react';
import { ActivityCard } from './ActivityCard';
import { MapPin, TrendingUp, Sparkles } from './Icons';
import { activities } from '../data/activities';

export function Home() {
  const [location, setLocation] = useState('Molde');
  const [savedActivities, setSavedActivities] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedActivities(prev =>
      prev.includes(id) ? prev.filter(activityId => activityId !== id) : [...prev, id]
    );
  };

  const nearbyActivities = activities.filter(a => a.city === location).slice(0, 3);
  const popularActivities = activities.filter(a => a.rating >= 4.5).slice(0, 3);

  return (
    <div className="min-h-screen p-8 pb-32">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Hei! 👋
        </h1>
        <p className="text-gray-600 mb-2">La oss skape fine øyeblikk og minner sammen med den lille</p>
        <p className="text-sm text-gray-500">Finn babysvømming, babysang, babymassasje og andre aktiviteter i ditt område</p>
      </div>

      {/* Location Selector */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-8">
        <div className="flex items-center gap-4 mb-4">
          <MapPin className="w-6 h-6 text-teal-600" />
          <span className="text-gray-700">Din lokasjon</span>
        </div>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full pl-4 pr-10 py-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border-2 border-teal-200 focus:border-teal-400 outline-none transition-all cursor-pointer"
          style={{ backgroundPosition: 'right 8px center' }}
        >
          <option value="Oslo">Oslo</option>
          <option value="Bergen">Bergen</option>
          <option value="Trondheim">Trondheim</option>
          <option value="Stavanger">Stavanger</option>
          <option value="Tromsø">Tromsø</option>
          <option value="Drammen">Drammen</option>
          <option value="Kristiansand">Kristiansand</option>
          <option value="Molde">Molde</option>
        </select>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="mb-2">{nearbyActivities.length}</div>
          <div className="text-sm">Aktiviteter i nærheten</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-3xl p-6 text-white shadow-lg">
          <div className="mb-2">{savedActivities.length}</div>
          <div className="text-sm">Lagrede favoritter</div>
        </div>
      </div>

      {/* Nearby Activities */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Sparkles className="w-6 h-6 text-teal-600" />
          <h2>I nærheten</h2>
        </div>
        <div className="space-y-4">
          {nearbyActivities.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              isSaved={savedActivities.includes(activity.id)}
              onToggleSave={() => toggleSave(activity.id)}
            />
          ))}
        </div>
      </div>

      {/* Popular Activities */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <TrendingUp className="w-6 h-6 text-cyan-600" />
          <h2>Populært nå</h2>
        </div>
        <div className="space-y-4">
          {popularActivities.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              isSaved={savedActivities.includes(activity.id)}
              onToggleSave={() => toggleSave(activity.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
