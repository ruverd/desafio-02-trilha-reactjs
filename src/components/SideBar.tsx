import { useEffect, useState } from 'react';

import { Button } from './Button';

import { api } from '../services/api';

import '../styles/sidebar.scss';

interface GenreData {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  onItemClick: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({ onItemClick, selectedGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreData[]>([]);

  useEffect(() => {
    api.get<GenreData[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onItemClick(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}