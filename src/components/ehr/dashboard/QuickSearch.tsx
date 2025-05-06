
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface QuickSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const QuickSearch: React.FC<QuickSearchProps> = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() !== '') {
      toast.info(`Searching for: ${searchQuery}`);
      navigate(`/ehr/patients?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <Card className="w-full md:w-2/3">
      <CardContent className="p-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search patients, records, or diagnoses..."
            className="pl-8 pr-24"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            className="absolute right-1 top-1 h-8"
            disabled={searchQuery.trim() === ''}
          >
            Search
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuickSearch;
