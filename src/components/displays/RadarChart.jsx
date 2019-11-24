
import React, { useState, useEffect, useContext } from 'react';
import {Radar} from 'react-chartjs-2';
import _ from "lodash";

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
  }

export default function RadarChart(props) {
  const [userCompetency, setUserCompetency] = useState({});
  let labels = {};

    let data = {
        labels: Object.values(props.teamData),
        datasets: userCompetency,
    };

   

    useEffect(() => {
      fetch(`/api/usercompetency/${props.teamId}`)
        .then(response => response.json())
        .then(data => {
          addDatasets(data);
        })
        .catch(error => {
            console.log(error)
        })
    }, []);

function addDatasets(users){
    let sets = [];
    users.map(_user => {
        sets.push(
            {
                label: _user.name,
                backgroundColor: random_rgba(),
                borderColor: random_rgba(),
                pointBackgroundColor: random_rgba(),
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: random_rgba(),
                data: generateCompetencyValues(_user.UserCompetencies)
            }
        )
    }) 
    setUserCompetency(sets);
}

function generateCompetencyValues(userCompetencies){
  let ret = [];
  let objectKeys = Object.keys(props.teamData);
  for(var index in objectKeys){
    let competencyId = objectKeys[index];
    let matchingCompetency = userCompetencies.find(usercompetency => (
          usercompetency.competencyId === parseInt(competencyId)
    ));
    let competencyValue = matchingCompetency === undefined ? 0 : matchingCompetency.value;
    ret.push(competencyValue);
  }
  return ret;
}

  return (
    <div>
      {
        _.isEmpty(userCompetency) ? <p>sdadsasdsad</p> :
<Radar data={data} />
      }
      
    </div>
  );
}