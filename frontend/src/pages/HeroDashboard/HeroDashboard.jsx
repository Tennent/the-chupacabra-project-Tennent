import React, { useState, useEffect } from 'react';
import HeroInteraction from '../../components/HeroInteraction/HeroInteraction';
import './HeroDashboard.css'
import { getHero } from '../../services/fetchHero';

export default function HeroDashboard({ user }) {

  const [hero, setHero] = useState(null);

  useEffect(() => {
    const saveHero = async () => {
      console.log(user._id);
      console.log(user.loggedIn);
      const hero = await getHero(user.loggedIn, user._id);
      console.log(hero);
      setHero(hero);
    }
    saveHero();
  }, [])

  return (
    <>
      {hero !== null || hero ?
        <div className='selected-hero-container'>
          <HeroInteraction hero={hero} setHero={setHero} user={user} />
        </div>
        :
        null
      }
    </>
  )
}
