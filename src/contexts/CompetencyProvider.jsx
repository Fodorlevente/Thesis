import React, {createContext, useState, useEffect, useContext} from "react";
import UserProvider from "./UserProvider";

const context = createContext(null);

const CompetencyProvider = ({ children }) => {
    const [teamCompetencies, setTeamCompetencies] = useState({});
    const userData = useContext(UserProvider.context);

    useEffect( () => {
        fetch(`/api/teamCompetencies/${userData.teamId}`)
            .then( res => res.json())
            .then(res => setTeamCompetencies(res))
            .catch( err => {
                console.log(err);
            });
    }, [])
    return (
        <context.Provider value={teamCompetencies}>
            {children}
        </context.Provider>
    );

};

CompetencyProvider.context = context;

export default CompetencyProvider;