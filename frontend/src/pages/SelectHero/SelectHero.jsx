import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectHero.css';
import HeroDetails from '../../components/HeroDetails/HeroDetails';
import getCreatures from '../../services/fetchCreatures';
import { getHero } from '../../services/fetchHero';

export default function SelectHero() {

  const navigate = useNavigate();

  const [creatures, setCreatures] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [activeHero, setActiveHero] = useState(null);

  useEffect(() => {
    async function useEffectHandler() {
      setCreatures(await getCreatures());
      setActiveHero((await getHero()));
    }
    useEffectHandler();
  }, []);

  const handleSelectHero = async (e) => {
    e.preventDefault();
    const hero = selectedHero;

    hero.userinput = {};
    hero.userinput.name = e.target.heroName.value;
    hero.userinput.gender = e.target.heroGender.value;
    setSelectedHero(hero);

    try {
      const res = await fetch('/api/v1/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedHero)
      })
      if (res.ok || selectedHero) {
        alert(`You selected ${selectedHero.userinput.name} as your hero!`)
        navigate('/herodashboard');
      }
    } catch (err) {
      console.error(`Error saving selected hero! ${err}`);
    }
  };

  return (
    <>
      {selectedHero === null && (activeHero === null || !activeHero.length > 0) ?
        <div>
          <h1>Select A Hero!</h1>

          <div className='heroes-container'>
            {creatures.map(creature => <HeroDetails key={creature.creature.species} creature={creature} setSelectedHero={setSelectedHero} />)}
          </div>
        </div>
        :
        selectedHero !== null && (activeHero === null || !activeHero.length > 0) ?
          <div className='hero-selection'>
            <HeroDetails creature={selectedHero} />
            <div className='hero-form-container'>
              <form action="submit" onSubmit={(e) => handleSelectHero(e)}>
                <label htmlFor="heroName">
                  Name:
                  <input type="text" id='heroName' name='heroName' required={true} />
                </label>
                <label htmlFor="heroGender">
                  Gender:
                  <select name="heroGender" id="heroGender">
                    <option value="Male" name="herGender">Male</option>
                    <option value="Female" name="heroGender">Female</option>
                  </select>
                </label>
                <div className='form-button-container'>
                  <button type='submit'>Select Hero</button>
                  <button type='button' onClick={() => setSelectedHero(null)}>Back</button>
                </div>
              </form>
            </div>
          </div>
          :
          (activeHero !== null || activeHero.length > 0) ?
            <div className='redirect-message'>
              <h1>You already have a hero!</h1>
              <button onClick={() => navigate('/herodashboard')}>Go To Dashboard</button>
            </div>
            :
            null}
    </>
  )
}
