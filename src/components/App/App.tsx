import { useState } from 'react';
import css from './App.module.css';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import toast from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      const results = await fetchMovies(query);
      if (results.length === 0) {
        toast('No movies found for your request.');
        return;
      }
      setMovies(results);
    } catch (error) {
      console.error('Error fetching movies:', error);
      // тут пізніше можна буде показувати ErrorMessage-компонент,
      // а поки що хоча б toast:
      toast('There was an error, please try again...');
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
    </div>
  );
}
