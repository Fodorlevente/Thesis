import React, { useContext, useState } from "react";
import UserProvider from "../contexts/UserProvider";
import _ from "lodash";
import DashBoardStepper from "../components/stepper/DashBoardStepper";

const DashBoard = () => {
    const userData = useContext(UserProvider.context);

    return (
        <div className="page">
           <DashBoardStepper />
        </div>
    );
};

export default DashBoard;