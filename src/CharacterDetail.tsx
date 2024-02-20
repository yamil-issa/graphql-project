import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCharacterQuery } from './generated/graphql';

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
            <h2>Character Details</h2>
            {character && (
                <>
                    <img src={character.image ?? ''} alt={character.name ?? ''} />
                    <p>Name: {character.name}</p>
                    <p>Status: {character.status}</p>
                    <p>Species: {character.species}</p>
                    <p>Gender: {character.gender}</p>
                    <p>Location: {character.location?.name}</p>
                </>
            )}
        </div>
    );
}

export default CharacterDetail;
