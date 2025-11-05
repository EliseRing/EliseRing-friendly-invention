import { Settings, MapPin, Bell, HelpCircle, Share2, Star, Plus } from './Icons';
import { AddActivity } from './AddActivity';

export function Profile() {
  return (
    <div className="min-h-screen p-8 pb-32">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-4">Profil</h1>
        <p className="text-gray-600">Dine innstillinger og preferanser</p>
      </div>

      {/* User Info */}
      <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl p-8 mb-8 text-white shadow-lg">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl">
            👶
          </div>
          <div>
            <h2 className="mb-2">Velkommen!</h2>
            <p className="text-white/80">Oslo, Norge</p>
          </div>
        </div>
      </div>

      {/* Add Activity Button */}
      <AddActivity 
        trigger={
          <button className="w-full mb-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-3xl p-6 shadow-lg flex items-center justify-center gap-4 active:scale-95 transition-transform">
            <Plus className="w-6 h-6" />
            <span>Legg til ny aktivitet</span>
          </button>
        }
      />

      {/* Settings Menu */}
      <div className="space-y-4">
        <button className="w-full bg-white rounded-3xl p-6 shadow-lg flex items-center justify-between active:scale-95 transition-transform">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-teal-600" />
            </div>
            <div className="text-left">
              <h3 className="mb-2">Standard lokasjon</h3>
              <p className="text-sm text-gray-600">Oslo</p>
            </div>
          </div>
        </button>

        <button className="w-full bg-white rounded-3xl p-6 shadow-lg flex items-center justify-between active:scale-95 transition-transform">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-cyan-600" />
            </div>
            <div className="text-left">
              <h3 className="mb-2">Varsler</h3>
              <p className="text-sm text-gray-600">Aktiver påminnelser</p>
            </div>
          </div>
        </button>

        <button className="w-full bg-white rounded-3xl p-6 shadow-lg flex items-center justify-between active:scale-95 transition-transform">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="mb-2">Innstillinger</h3>
              <p className="text-sm text-gray-600">App-preferanser</p>
            </div>
          </div>
        </button>

        <button className="w-full bg-white rounded-3xl p-6 shadow-lg flex items-center justify-between active:scale-95 transition-transform">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-left">
              <h3 className="mb-2">Vurder appen</h3>
              <p className="text-sm text-gray-600">Hjelp oss å bli bedre</p>
            </div>
          </div>
        </button>

        <button className="w-full bg-white rounded-3xl p-6 shadow-lg flex items-center justify-between active:scale-95 transition-transform">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
              <Share2 className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="mb-2">Del appen</h3>
              <p className="text-sm text-gray-600">Fortell andre om oss</p>
            </div>
          </div>
        </button>

        <button className="w-full bg-white rounded-3xl p-6 shadow-lg flex items-center justify-between active:scale-95 transition-transform">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-left">
              <h3 className="mb-2">Hjelp og support</h3>
              <p className="text-sm text-gray-600">Kontakt oss</p>
            </div>
          </div>
        </button>
      </div>

      {/* App Version */}
      <div className="mt-12 text-center text-gray-400 text-sm">
        Versjon 1.0.0
      </div>
    </div>
  );
}
