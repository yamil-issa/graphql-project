import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";

import './App.css';
import { useGetAllCharactersQuery,} from "./generated/graphql";

function App() {
    const [page, setPage] = useState<number>(1);
    const { loading, data } = useGetAllCharactersQuery({
      variables: { page: page },
    });
      
    const characters = data?.characters?.results;
   
    const prevPage = () => {
      console.log(page);
      if (page > 1) {
        setPage(page - 1);
      }
    };

    const nextPage = () => {
      setPage(page + 1);
    };

      return (
          <div className="App">
            {loading && <p>Loading...</p>}
            <h1>Rick and Morty characters</h1>
            <ul>
              {characters &&
                characters.map((character, index) => (
                  <li key={character?.id ?? index}>
                  {character && (
                    <Link to={`/character/${character.id}`}>
                      <div className="character_card">
                        <img src={character.image ?? ''} alt={character.name ?? ''} />
                        <strong>Name:</strong> {character.name}, <strong>Status:</strong> {character.status}
                      </div>
                    </Link>
                  )}
                  </li>
                ))}
            </ul>
            <div className="pagination">
              <button onClick={prevPage}>Previous</button>
              <button onClick={nextPage}>Next</button>
            </div>
          </div>
      );
}

export default App;
