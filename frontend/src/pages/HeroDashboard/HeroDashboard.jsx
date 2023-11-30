import React, { useState, useEffect } from 'react';
import HeroInteraction from '../../components/HeroInteraction/HeroInteraction';
import './HeroDashboard.css'
import { getHero } from '../../services/fetchHero';

export default function HeroDashboard() {

  const [hero, setHero] = useState(null);

  useEffect(() => {
    const saveHero = async () => {
      setHero(await getHero());
    }
    saveHero();
  }, [])

  return (
    <>
      {hero ?
        <div className='selected-hero-container'>
          <HeroInteraction hero={hero[0]} setHero={setHero} />
        </div>
        :
        null
      }
    </>
  )
}
