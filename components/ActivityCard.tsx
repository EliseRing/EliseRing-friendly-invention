import { Heart, MapPin, Clock, Star, Users } from './Icons';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Activity {
  id: number;
  name: string;
  type: string;
  description: string;
  city: string;
  address: string;
  ageGroup: string;
  price: string;
  schedule: string;
  rating: number;
  participants: number;
  image: string;
}

interface ActivityCardProps {
  activity: Activity;
  isSaved: boolean;
  onToggleSave: () => void;
}

export function ActivityCard({ activity, isSaved, onToggleSave }: ActivityCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
      {/* Image */}
      <div className="relative h-64">
        <ImageWithFallback
          src={activity.image}
          alt={activity.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          className={`absolute top-4 right-4 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm transition-all active:scale-95 ${
            isSaved
              ? 'bg-teal-500 text-white'
              : 'bg-white/80 text-gray-600'
          }`}
        >
          <Heart className={`w-6 h-6 ${isSaved ? 'fill-white' : ''}`} />
        </button>
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm">
            {activity.type}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="flex-1">{activity.name}</h3>
          <div className="flex items-center gap-2 ml-4">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm">{activity.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-6 line-clamp-2">{activity.description}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin className="w-5 h-5 text-teal-600" />
            <span>{activity.address}, {activity.city}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Clock className="w-5 h-5 text-cyan-600" />
            <span>{activity.schedule}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Users className="w-5 h-5 text-blue-500" />
            <span>{activity.participants} deltakere</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Alder</p>
            <p className="text-teal-600">{activity.ageGroup}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Pris</p>
            <p className="text-cyan-600">{activity.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
