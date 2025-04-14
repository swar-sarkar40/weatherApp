
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <Input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="flex-1 bg-white/80 focus:ring-2 focus:ring-sky-300 transition-all duration-300"
      />
      <Button 
        type="submit" 
        className="bg-sky-500 hover:bg-sky-600 transition-colors duration-300 group"
      >
        <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
      </Button>
    </form>
  );
};

export default SearchBar;
