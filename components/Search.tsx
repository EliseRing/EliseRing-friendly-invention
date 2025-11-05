import { useState } from 'react';
import { ActivityCard } from './ActivityCard';
import { SearchIcon, SlidersHorizontal, X } from './Icons';
import { activities } from '../data/activities';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';

export function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('');
  const [savedActivities, setSavedActivities] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedActivities(prev =>
      prev.includes(id) ? prev.filter(activityId => activityId !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedCity('');
    setSelectedType('');
    setSelectedAgeGroup('');
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || activity.city === selectedCity;
    const matchesType = !selectedType || activity.type === selectedType;
    const matchesAgeGroup = !selectedAgeGroup || activity.ageGroup === selectedAgeGroup;

    return matchesSearch && matchesCity && matchesType && matchesAgeGroup;
  });

  const activeFiltersCount = [selectedCity, selectedType, selectedAgeGroup].filter(Boolean).length;

  return (
    <div className="min-h-screen p-8 pb-32">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-4">Søk aktiviteter</h1>
        <p className="text-gray-600">Finn det perfekte for deg og babyen</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
        <input
          type="text"
          placeholder="Søk etter aktiviteter..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-16 pr-6 py-6 bg-white rounded-3xl border-2 border-gray-200 focus:border-teal-400 outline-none transition-all shadow-lg"
        />
      </div>

      {/* Filter Button */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="w-full mb-8 p-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-3xl shadow-lg flex items-center justify-center gap-4 active:scale-95 transition-transform">
            <SlidersHorizontal className="w-6 h-6" />
            <span>Filtrer resultater</span>
            {activeFiltersCount > 0 && (
              <Badge className="bg-white text-teal-600">{activeFiltersCount}</Badge>
            )}
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
          <SheetHeader>
            <SheetTitle>Filtrer aktiviteter</SheetTitle>
          </SheetHeader>
          <div className="mt-8 space-y-8">
            {/* City Filter */}
            <div>
              <label className="block mb-4 text-gray-700">By</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-4 pr-10 py-4 bg-gray-50 rounded-2xl border-2 border-gray-200 focus:border-teal-400 outline-none cursor-pointer"
                style={{ backgroundPosition: 'right 8px center' }}
              >
                <option value="">Alle byer</option>
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

            {/* Type Filter */}
            <div>
              <label className="block mb-4 text-gray-700">Type aktivitet</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-4 pr-10 py-4 bg-gray-50 rounded-2xl border-2 border-gray-200 focus:border-teal-400 outline-none cursor-pointer"
                style={{ backgroundPosition: 'right 8px center' }}
              >
                <option value="">Alle typer</option>
                <option value="Svømming">Svømming</option>
                <option value="Sang">Sang</option>
                <option value="Massasje">Massasje</option>
                <option value="Dans">Dans</option>
                <option value="Yoga">Yoga</option>
                <option value="Lek">Lek</option>
                <option value="Musikk">Musikk</option>
              </select>
            </div>

            {/* Age Group Filter */}
            <div>
              <label className="block mb-4 text-gray-700">Aldersgruppe</label>
              <select
                value={selectedAgeGroup}
                onChange={(e) => setSelectedAgeGroup(e.target.value)}
                className="w-full pl-4 pr-10 py-4 bg-gray-50 rounded-2xl border-2 border-gray-200 focus:border-teal-400 outline-none cursor-pointer"
                style={{ backgroundPosition: 'right 8px center' }}
              >
                <option value="">Alle aldre</option>
                <option value="0-6 mnd">0-6 måneder</option>
                <option value="6-12 mnd">6-12 måneder</option>
                <option value="1-2 år">1-2 år</option>
                <option value="2-3 år">2-3 år</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="w-full p-4 bg-gray-100 text-gray-700 rounded-2xl flex items-center justify-center gap-4 active:scale-95 transition-transform"
              >
                <X className="w-6 h-6" />
                Nullstill filtre
              </button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Results */}
      <div className="mb-8">
        <p className="text-gray-600">
          {filteredActivities.length} aktiviteter funnet
        </p>
      </div>

      <div className="space-y-4">
        {filteredActivities.map(activity => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            isSaved={savedActivities.includes(activity.id)}
            onToggleSave={() => toggleSave(activity.id)}
          />
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Ingen aktiviteter funnet</p>
          <p className="text-gray-400 mt-2">Prøv å justere søket eller filtrene</p>
        </div>
      )}
    </div>
  );
}
