import { useEffect, useState } from 'react';

import { MovieCard } from './MovieCard';

import { api } from '../services/api';

import '../styles/content.scss';

interface ContentProps {
  selectedGenreId: number;
}

interface MovieData {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreData {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function Content({ selectedGenreId }: ContentProps) {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreData>({} as GenreData);

  useEffect(() => {
    api.get<MovieData[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreData>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}