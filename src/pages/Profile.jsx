import React, { useContext, useState } from "react";
import UserProvider from "../contexts/UserProvider";
import _ from "lodash";
import ProfileTable from "../components/displays/ProfileTable";

const LoginMsg = "Uh oh, there's nothing to show! " +
    "Login to see how much of your invaluable personal " +
    "data tech companies have at their disposal.";

const Profile = () => {
    const userData = useContext(UserProvider.context);
    const text = _.isEmpty(userData) ? LoginMsg: `Explore ${userData.name} Data`;

    return (
        <div className="page">
            <p className="page-title" style={{ textAlign: "center" }}>
                {text}
            </p>
            <ProfileTable userData={userData} />
            {console.dir(UserProvider)}
            <div style={{ marginBottom: 20 }} />
        </div>
    );
};

export default Profile;