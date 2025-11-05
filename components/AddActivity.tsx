import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Plus, Upload } from './Icons';
import { toast } from 'sonner';

interface AddActivityProps {
  trigger?: React.ReactNode;
}

export function AddActivity({ trigger }: AddActivityProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    address: '',
    ageGroup: '',
    price: '',
    schedule: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Her ville man sendt data til backend/Supabase i en ekte app
    console.log('Ny aktivitet:', formData);
    
    toast.success('Aktivitet lagt til!', {
      description: 'Din aktivitet er nå synlig for andre foreldre i området.',
    });
    
    // Nullstill skjema
    setFormData({
      name: '',
      description: '',
      city: '',
      address: '',
      ageGroup: '',
      price: '',
      schedule: '',
    });
    
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="fixed bottom-32 right-8 w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full shadow-2xl flex items-center justify-center text-white active:scale-95 transition-transform z-50">
            <Plus className="w-8 h-8" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Legg til ny aktivitet</DialogTitle>
          <DialogDescription>
            Fyll ut informasjonen under for å dele en aktivitet med andre foreldre
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Navn */}
          <div className="space-y-2">
            <Label htmlFor="name">Aktivitetsnavn *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="F.eks. Babysvømming, Babysang, Lekegruppe..."
              required
              className="h-12"
            />
          </div>

          {/* Beskrivelse */}
          <div className="space-y-2">
            <Label htmlFor="description">Beskrivelse *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Beskriv aktiviteten..."
              required
              className="min-h-24"
            />
          </div>

          {/* By og Adresse */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">By *</Label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full h-12 pl-4 pr-10 bg-white rounded-lg border-2 border-gray-200 focus:border-teal-400 outline-none cursor-pointer"
                style={{ backgroundPosition: 'right 8px center' }}
              >
                <option value="">Velg by</option>
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
            
            <div className="space-y-2">
              <Label htmlFor="address">Adresse *</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Gate/sted"
                required
                className="h-12"
              />
            </div>
          </div>

          {/* Aldersgruppe */}
          <div className="space-y-2">
            <Label htmlFor="ageGroup">Aldersgruppe *</Label>
            <select
              id="ageGroup"
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleChange}
              required
              className="w-full h-12 pl-4 pr-10 bg-white rounded-lg border-2 border-gray-200 focus:border-teal-400 outline-none cursor-pointer"
              style={{ backgroundPosition: 'right 8px center' }}
            >
              <option value="">Velg aldersgruppe</option>
              <option value="0-6 mnd">0-6 måneder</option>
              <option value="6-12 mnd">6-12 måneder</option>
              <option value="1-2 år">1-2 år</option>
              <option value="2-3 år">2-3 år</option>
            </select>
          </div>

          {/* Pris og Tidspunkt */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Pris *</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="200 kr/time"
                required
                className="h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="schedule">Tidspunkt *</Label>
              <Input
                id="schedule"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                placeholder="Mandager 10:00"
                required
                className="h-12"
              />
            </div>
          </div>

          {/* Bilde (valgfritt) */}
          <div className="space-y-2">
            <Label htmlFor="image">Bilde (valgfritt)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-teal-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Klikk for å laste opp bilde</p>
              <p className="text-xs text-gray-400 mt-1">JPEG, PNG eller JPG (maks 5MB)</p>
            </div>
          </div>

          {/* Infomelding */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 text-sm text-blue-800">
            <p className="mb-2">💡 Tips for en god aktivitet:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Vær så detaljert som mulig i beskrivelsen</li>
              <li>Inkluder kontaktinformasjon hvis mulig</li>
              <li>Hold priser oppdatert</li>
            </ul>
          </div>

          {/* Knapper */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 h-12"
            >
              Avbryt
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
            >
              Publiser aktivitet
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
