import React, { useContext, useState } from "react";
import UserProvider from "../contexts/UserProvider";
import _ from "lodash";
import Smiley from "../components/inputs/Smiley";

const Metrics = () => {
    const userData = useContext(UserProvider.context);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [niconico, setNicoNico] = useState([]);

    function getNicoNicos() {
        fetch(`/api/niconicos/?teamId=${userData.teamId}&startDate=${startDate}&endDate=${endDate}`)
        .then(response => response.json())
        .then(data => {
            setNicoNico(data);
        })
        .catch(error => {
            console.log(error)
        })
    }


    return (
        <div className="page">
            <Smiley />
        </div>
    );
};

export default Metrics;