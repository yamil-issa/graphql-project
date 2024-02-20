import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCharacterQuery } from './generated/graphql';
import './style.css';


function CharacterDetail() {
    const { id } = useParams<{ id: string }>();

    console.log('Character ID:', id);

    const { loading, error, data } = useGetCharacterQuery({
        variables: { id: id ?? "" },
    });

    console.log('Character Data:', data); 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const character = data?.character;

    return (
        <div>
            <h1>Character Details</h1>
            {character && (
                <>
                    <img src={character.image ?? ''} alt={character.name ?? ''} />
                    <p><strong>Name:</strong> {character.name}</p>
                    <p><strong>Status:</strong>{character.status}</p>
                    <p><strong>Species: </strong> {character.species}</p>
                    <p><strong>Gender: </strong> {character.gender}</p>
                    <p><strong>Location:</strong> {character.location?.name}</p>
                </>
            )}
        </div>
    );
}

export default CharacterDetail;
