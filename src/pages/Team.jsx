import React, { useContext } from "react";
import UserProvider from "../contexts/UserProvider";
import _ from "lodash";
import CreateTeamInputField from '../components/inputs/InputField';
import TeamTable from '../components/displays/TeamTable';

const LoginMsg = "Uh oh, there's nothing to show! " +
    "You can create a team easily ";

const Team = () => {
    const userData = useContext(UserProvider.context);
    const text = _.isEmpty(userData.teams) ? LoginMsg: "Explore Teams";
    

    return (
        <div className="page">
            <p className="page-title" style={{ textAlign: "center" }}>
                {text}
            </p>
            <CreateTeamInputField />
            <TeamTable />
        </div>
    );
};

export default Team;