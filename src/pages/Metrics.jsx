import React, { useContext, useState } from "react";
import UserProvider from "../contexts/UserProvider";
import _ from "lodash";
import Smiley from "../components/inputs/Smiley";
import DatePicker from "../components/inputs/DatePicker";
import NicoNicoTable from "../components/displays/NicoNicoTable";

const Metrics = () => {
    const userData = useContext(UserProvider.context);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [niconico, setNicoNico] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);

    function addDate(){
        const today = Date.now();
        return (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today));
      }

    function postNicoNico(event, _value) {
        //console.log(_value);
        fetch('/api/addNicoNico', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userData.id,
              date: addDate(),
              value: _value
            }),
          });
        //   .then((response) => {
        //     if(response.status === 200){
        //       ({...valuessetValues, showMessage: true});
        //       props.addTeam(values.name);
        //     }
        //   });
    }

    function getTeamMembers() {
      fetch(`/api/niconicos/users/${userData.teamId}`)
      .then(response => response.json())
      .then(data => {
        setTeamMembers(data);
      })
      .catch(error => {
          console.log(error);
      })
  }

    return (
        <div className="page">
            {/* {getNicoNicos()} */}
            {/* {getTeamMembers()} */}
            <Smiley postNicoNico={postNicoNico}/>
            <DatePicker name="Start date" selectedDate={startDate} setSelectedDate={setStartDate} />
            <DatePicker name="End date" selectedDate={endDate} setSelectedDate={setEndDate} />
            <NicoNicoTable startDate={startDate} endDate={endDate} userData={userData}/>
            {JSON.stringify(startDate)}
            {JSON.stringify(endDate)}
            {JSON.stringify(teamMembers)}
        </div>
    );
};

export default Metrics;