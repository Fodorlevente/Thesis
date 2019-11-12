// mini store, lifecicle stb...
import React, {createContext, useState, useEffect } from "react";
const context = createContext(null);

const TeamProvider = ({ children }) => {
    const [team, setTeam] = useState({});

    useEffect( () => {
        fetch("/teamProvider")
            .then( res => res.json())
            .then(res => setTeam(res))
            .catch( err => {
                console.log(err);
            });
    },/*deps:*/ [])
    console.log(team);
    return (
        <context.Provider value={team}>
            {children}
        </context.Provider>
    );
        
};

TeamProvider.context = context;

// Exports data from API endpoint
export default TeamProvider;