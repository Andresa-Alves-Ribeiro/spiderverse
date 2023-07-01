'use client'

import { useEffect, useState } from 'react';

import styles from './page.module.scss';

import HeroesList from '@/components/HeroesList';
import { IHeroData } from '@/interfaces/heroes';

async function getData(): Promise<{ data: IHeroData[] }> {
  const res = await fetch('/api/heroes');

  if (!res.ok) {
    throw new Error('Falha ao buscar heróis');
  }

  return res.json();
}

export default function Home() {
  const [heroes, setHeroes] = useState<IHeroData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        setHeroes(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <HeroesList heroes={heroes} />
    </main>
  );
}
