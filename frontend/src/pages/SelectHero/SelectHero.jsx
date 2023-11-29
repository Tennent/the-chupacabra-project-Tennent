import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectHero.css';
import HeroDetails from '../../components/HeroDetails/HeroDetails';

export default function SelectHero() {
  const [animals, setAnimals] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [hero, setHero] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getAnimals = async () => {
      try {
        const res = await fetch('/api/animals');
        setAnimals(await res.json());
      } catch (err) {
        console.error(`Error fetching animals! ${err}`);
      }
    }
    getAnimals();
  }, []);

  useEffect(() => {
    const getHero = async () => {
      try {
        const res = await fetch('/api/hero');
        setHero(await res.json());
      } catch (err) {
        console.error(`Error fetching hero! ${err}`);
      }
    }
    getHero();
  }, []);

  const handleSelectHero = async (e) => {
    e.preventDefault();
    const hero = selectedHero;

    hero.userinput.name = e.target.heroName.value;
    hero.userinput.gender = e.target.heroGender.value;
    setSelectedHero(hero);

    try {
      const res = await fetch('/api/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedHero)
      })
      if (res.ok || selectedHero) {
        alert(`You selected ${selectedHero.userinput.name} as you hero!`)
      }
    } catch (err) {
      console.error(`Error saving selected hero! ${err}`);
    }
  };

  // console.log(selectedHero);

  return (
    <>
      {hero ?
        <div>
          <h1>Hero alrady selected!</h1>
          <button onClick={navigate('/herodashboard')}>Go To Hero</button>
        </div>
        :
        selectedHero && !hero ?
          <div className='hero-selection'>
            <HeroDetails animal={selectedHero} />
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
                <button type='submit'>Select Hero</button>
                <button type='button' onClick={() => setSelectedHero(null)}>Back</button>
              </form>
            </div>
          </div>
          :
          <div>
            <h1>Select A Hero!</h1>

            <div className='heroes-container'>
              {animals.map(animal => <HeroDetails key={animal.breed.type} animal={animal} setSelectedHero={setSelectedHero} />)}
            </div>
          </div>}
    </>
  )
}
