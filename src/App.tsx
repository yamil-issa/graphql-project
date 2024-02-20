import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";
import CharacterDetail from './CharacterDetail';
import './App.css';
import { useQuery } from '@apollo/client';
import { GetAllCharactersDocument, GetAllCharactersQuery, GetAllCharactersQueryVariables,} from "./generated/graphql";

function App() {
    const [page, setPage] = useState<number>(1);
    const { loading, data } = useQuery<
      GetAllCharactersQuery,
      GetAllCharactersQueryVariables
    >(GetAllCharactersDocument, {
      variables: {
        page: page
      }
    });
  
      const characters = data?.characters?.results;
      // Function to handle moving to the previous page
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
        <Router>
          <div className="App">
            {loading && <p>Loading...</p>}
            <h1>Rick and Morty characters</h1>
            <ul>
              {characters &&
                characters.map((character, index) => (
                  <li key={character?.id ?? index}>
                  {character && (
                    <Link to={`/character/${character.id}`}>
                      <img src={character.image ?? ''} alt={character.name ?? ''} />
                      <strong>Name:</strong> {character.name}, <strong>Status:</strong> {character.status}
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
          <Routes>
            <Route path="/character/:id" element={<CharacterDetail/>}/>

          </Routes>
        </Router>
      );
}

export default App;
