import React, { useContext, useState, useEffect } from "react";
import UserProvider from "../contexts/UserProvider";
import _ from "lodash";
import CreateTeamInputField from '../components/inputs/InputField';
import TeamTable from '../components/displays/TeamTable';

// let teams = {};
// fetch('/team')
// .then(response => response.json())
// .then(data => {
//     teams = data;
// })
// .catch(error => {
//     console.log(error)
// })


export default function Team() {
    const LoginMsg = "There's nothing to show! " +
    "You can create a team easily ";
    const userData = useContext(UserProvider.context);
    const text = _.isEmpty(userData.teams) ? LoginMsg: "Explore Teams";
    const [teams, setTeams] = useState({});
    const [ids, setIds] = useState([]);

    useEffect(() => {
        fetch('/team')
        .then(response => response.json())
        .then(data => {
            setTeams(data);
            console.log("újra renderelem")
            
        })
        .catch(error => {
            console.log(error)
        })
      }, []);

      /* Kéne írnin valmait ami generál ID-t és azt hozzádni az objecthez név alapján törlünk, de így kicsit igénytelen*/
      /* Kéne a törléshez valami filter, ami kiszedi az elemeket a lsitából */

      function addTeam(teamName){
       setTeams([...teams, {id: 23232 ,name: teamName}]);
      }

      function removeTeam(teamName){
        setTeams([...teams, {id: 23232 ,name: teamName}]);
       }

    return (
        <div className="page">
            <p className="page-title" style={{ textAlign: "center" }}>
                Find or create Teams
            </p> 
            {console.log(teams)}
            <CreateTeamInputField addTeam={addTeam}/>
            {_.isEmpty(teams) ? 
                <p className="page-title" style={{ textAlign: "center" }}>
                    {text}
                </p> : 
                <TeamTable teams={teams} memberOfTeam={"DevOps"} removeTeam={removeTeam} />}
        </div>
    );
};
