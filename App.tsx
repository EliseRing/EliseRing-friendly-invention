import { useState } from 'react';
import { Home } from './components/Home';
import { Search } from './components/Search';
import { Saved } from './components/Saved';
import { Calendar } from './components/CalendarView';
import { Profile } from './components/Profile';
import { AddActivity } from './components/AddActivity';
import { Toaster } from './components/ui/sonner';
import { HomeIcon, SearchIcon, Heart, CalendarDays, User } from './components/Icons';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'search':
        return <Search />;
      case 'saved':
        return <Saved />;
      case 'calendar':
        return <Calendar />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {renderContent()}
      </div>

      {/* Add Activity FAB */}
      <AddActivity />

      {/* Toast Notifications */}
      <Toaster position="top-center" />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center h-24 px-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all ${
              activeTab === 'home'
                ? 'bg-gradient-to-br from-teal-500 to-cyan-500 text-white scale-110'
                : 'text-gray-500'
            }`}
          >
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs mt-2">Hjem</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all ${
              activeTab === 'search'
                ? 'bg-gradient-to-br from-teal-500 to-cyan-500 text-white scale-110'
                : 'text-gray-500'
            }`}
          >
            <SearchIcon className="w-6 h-6" />
            <span className="text-xs mt-2">Søk</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all ${
              activeTab === 'saved'
                ? 'bg-gradient-to-br from-teal-500 to-cyan-500 text-white scale-110'
                : 'text-gray-500'
            }`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-xs mt-2">Lagret</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all ${
              activeTab === 'calendar'
                ? 'bg-gradient-to-br from-teal-500 to-cyan-500 text-white scale-110'
                : 'text-gray-500'
            }`}
          >
            <CalendarDays className="w-6 h-6" />
            <span className="text-xs mt-2">Kalender</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-br from-teal-500 to-cyan-500 text-white scale-110'
                : 'text-gray-500'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-2">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
