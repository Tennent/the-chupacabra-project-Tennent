import React, { useState, useEffect } from 'react';
import HeroInteraction from '../../components/HeroInteraction/HeroInteraction';
import './HeroDashboard.css'

export default function HeroDashboard() {

  const [hero, setHero] = useState(null);

  useEffect(() => {
    const getHero = async () => {
      try {
        const res = await fetch('/api/v1/hero')
        setHero(await res.json());
      } catch (err) {
        console.error(`Error fetching hero! ${err}`);
      }
    }
    getHero();
  }, [])

  return (
    hero ?
      <div className='selected-hero-container'>
        <HeroInteraction hero={hero[0]} />
      </div>
      :
      null
  )
}
