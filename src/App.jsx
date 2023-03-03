import React from "react";
import { Button } from "./componenets/Button.jsx";
import Card from "./componenets/Card.jsx";
import './sass/App.scss'
import { TiArrowLeftOutline, TiArrowRightOutline } from 'react-icons/ti';
import { useState, useEffect } from "react";

const App = ()  => {

  const [pokeID, setPokeID] = useState(61);
  const [pokeEvolutions, setPokeEvolutions] = useState([]);

  const prevClic = () => pokeID == 1? setPokeID(1) : setPokeID(pokeID - 1);
  const nextClic = ()  => setPokeID(pokeID + 1);

  async function getEvolution(id){
    const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`);
    const data = await res.json();

    let pokeArray = [];

    let pokeEvol_1 = data.chain.species.name;
    let pokeEvol_1_Img = await getPokeImage(pokeEvol_1);
    pokeArray.push([pokeEvol_1, pokeEvol_1_Img]);

    if(data.chain.evolves_to.length !== 0) {
      let pokeEvol_2 = data.chain.evolves_to[0].species.name;
      let pokeEvol_2_Img = await getPokeImage(pokeEvol_2);
      pokeArray.push([pokeEvol_2, pokeEvol_2_Img]);

      if(data.chain.evolves_to[0].evolves_to.length !== 0) {
        let pokeEvol_3 = data.chain.evolves_to[0].evolves_to[0].species.name;
        let pokeEvol_3_Img = await getPokeImage(pokeEvol_3);
        pokeArray.push([pokeEvol_3, pokeEvol_3_Img]);
      }
    }
    setPokeEvolutions(pokeArray);
  }

  async function getPokeImage (name) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    const data = await res.json();
    return data.sprites.other['official-artwork'].front_default;
  }

  useEffect ( () => {
    getEvolution(pokeID);
  },[pokeID] )

  return(
    <div className="app">
      {/* Cards */}
      <div className={` card__container card_${pokeEvolutions.length}`}>
        {pokeEvolutions.map( pokemon =>
          // Cuando dibujamos elementos asi por map for etc, un error que da react puede ser pidiendo una key
          // no se repite ni se pinta solo los diferencia
          <Card key={pokemon[0]} name={pokemon[0]} img={pokemon[1]} />
        )}
      </div>
      {/* Button navigation */}
      <div className='buttons-container'>
        <Button
          icon={ <TiArrowLeftOutline />}
          handleClic = { prevClic }
        />
        {}
        <Button
          icon={ <TiArrowRightOutline />}
          handleClic = { nextClic }
        />
      </div>
    </div>
  )
}

export {App};