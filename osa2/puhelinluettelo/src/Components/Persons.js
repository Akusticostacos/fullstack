import React from 'react';

const Persons = (props) => {

    const namesToShow = props.namesToShow
    
    return (
        <div>
            <ul>
                {namesToShow.map((person) =>
                <li key={person.name}> {person.name} {person.number} <button onClick={ () => props.onDelete(person.id) }>Delete</button> </li>)}             
            </ul>
        </div>
    )
}

export default Persons