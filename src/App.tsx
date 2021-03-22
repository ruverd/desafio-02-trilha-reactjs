import { useEffect, useState } from 'react';


import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';


export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar onItemClick={handleClickButton} selectedGenreId={selectedGenreId} />

      <Content selectedGenreId={selectedGenreId} />
    </div>
  )
}