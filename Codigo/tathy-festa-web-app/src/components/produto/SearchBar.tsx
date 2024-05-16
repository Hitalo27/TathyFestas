import { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

interface SearchBarProps {
  onInstantSearch: (query: string) => void;
  onSearch: (query: string) => void;
}

export default function SearchBar({ onInstantSearch, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');

  const handleInstantSearch = (searchQuery: string) => {
    if (onInstantSearch) {
      onInstantSearch(searchQuery);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <Box mb={3} display="flex" alignItems="center">
      <TextField
        fullWidth
        label="Pesquisar Decoração"
        variant="outlined"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleInstantSearch(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Button 
        onClick={handleSearch} 
        variant="contained" 
        color="primary" 
        style={{ marginLeft: '10px' , backgroundColor: '#1976d2' }}>
        Buscar Decoração
      </Button>
    </Box>
  );
}
