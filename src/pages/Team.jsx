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
        fetchTeamsFromDB()
      }, []);

      function fetchTeamsFromDB(){
        fetch('/team')
        .then(response => response.json())
        .then(data => {
            setTeams(data);
        })
        .catch(error => {
            console.log(error)
        })
      }

    return (
        <div className="page">
            <p className="page-title" style={{ textAlign: "center" }}>
                Find or create Teams
            </p>
            <CreateTeamInputField fetchTeamsFromDB={fetchTeamsFromDB}/>
            {_.isEmpty(teams) ? 
                <p className="page-title" style={{ textAlign: "center" }}>
                    {text}
                </p> : 
                <TeamTable 
                    teams={teams} 
                    memberOfTeam={userData.teamId} 
                    fetchTeamsFromDB={fetchTeamsFromDB}
                    userName={userData.name}
                    userId={userData.id}
                    rank={userData.rank}
                />}
        </div>
    );
};
