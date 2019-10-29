import React, { useContext } from "react";
import UserProvider from "../contexts/UserProvider";
import _ from "lodash";
import CreateTeamInputField from '../components/inputs/InputField';
import TeamTable from '../components/displays/TeamTable';

const LoginMsg = "Uh oh, there's nothing to show! " +
    "You can create a team easily ";

let teams = {};

fetch('/team')
.then(response => response.json())
.then(data => {
    teams = data;
})
.catch(error => {
    console.log(error)
})

const Team = () => {
    const userData = useContext(UserProvider.context);
    const text = _.isEmpty(userData.teams) ? LoginMsg: "Explore Teams";

    return (
        <div className="page">
            <p className="page-title" style={{ textAlign: "center" }}>
                {text}
            </p>
            <CreateTeamInputField />
            <TeamTable teams={teams} memberOfTeam={"DevOps"} />
        </div>
    );
};

export default Team;