import React, { useContext, useState } from "react";
import CompetencyProvider from "../../contexts/CompetencyProvider";
import RadarChart from "../displays/RadarChart";

import _ from "lodash";

const ChartDisplay = (props) => {
    const teamData = useContext(CompetencyProvider.context);

    function generateLabels(){
        let ret = {};
        teamData.competencies.map(competency=>( ret[competency.id] = competency.name));
        return ret;
    }
   
    while(_.isEmpty(teamData)){
    return (
        <div className="page">            
           Loading....
        </div>
    );
    };
    return(
        <div>
             <RadarChart teamId={props.teamId} teamData={_.isEmpty(teamData) ? {} : generateLabels()}/>
        </div>
    );
};

export default ChartDisplay;