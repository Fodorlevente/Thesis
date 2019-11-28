import React, { useContext, useState } from "react";
import CompetencyProvider from "../../contexts/CompetencyProvider";
import _ from "lodash";
import CompetencySlider from "../inputs/CompetencySlider";

const SliderContainer = (props) => {
    const teamData = useContext(CompetencyProvider.context);

    return (
        <div className="page">
            <div className="page-title" style={{ textAlign: "center" }}>
                {_.isEmpty(teamData) ?
                   <p>Loading...</p> :  
                   teamData.competencies.map(competency => (
                    <CompetencySlider name={competency.name} competencyId={competency.id} userData={props.userData}/>
                ))
                }
             
            </div>
            <div style={{ marginBottom: 20 }} />
        </div>
    );
};

export default SliderContainer;