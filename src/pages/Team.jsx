import React, { useContext, useState, useEffect } from "react";
import UserProvider from "../contexts/UserProvider";
import _ from "lodash";
import CreateTeamInputField from '../components/inputs/InputField';
import TeamTable from '../components/displays/TeamTable';

export default function Team() {
    const LoginMsg = "There's nothing to show! " +
    "You can create a team easily ";
    const userData = useContext(UserProvider.context);
    const text = _.isEmpty(userData.teams) ? LoginMsg: "Explore Teams";
    const [teams, setTeams] = useState({});

    useEffect(() => {
        fetch('/team')
        .then(response => response.json())
        .then(data => {
            setTeams(data);
        })
        .catch(error => {
            console.log(error)
        })
      }, []);

      function removeTeam(teamName) {
          setTeams(teams.filter((el) => (el.name !== teamName)));
      }

      function addTeam(teamName){
       setTeams([...teams, {id: Math.floor(Math.random()*100) ,name: teamName}]);
      }

    return (
        <div className="page">
            <p className="page-title" style={{ textAlign: "center" }}>
                Find or create Teams
            </p>
            <CreateTeamInputField addTeam={addTeam}/>
            {_.isEmpty(teams) ? 
                <p className="page-title" style={{ textAlign: "center" }}>
                    {text}
                </p> : 
                <TeamTable 
                    teams={teams} 
                    memberOfTeam={userData.team} 
                    removeTeam={removeTeam}
                    userName={userData.name}
                />}
        </div>
    );
};
