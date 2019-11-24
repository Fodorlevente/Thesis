import React, { useContext, useState } from "react";
import UserProvider from "../contexts/UserProvider";
import CompetencyProvider from "../contexts/CompetencyProvider";
import _ from "lodash";
import Smiley from "../components/inputs/Smiley";
import DatePicker from "../components/inputs/DatePicker";
import NicoNicoTable from "../components/displays/NicoNicoTable";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CompetencyInputField from '../components/inputs/CompetencyInputField';
import CompetencyTable from "../components/displays/CompetencyTable";
import DeleteMe from "./DeleteMe";
import ChartDisplay from "../components/displays/ChartDisplay";
import RadarChart from "../components/displays/RadarChart";

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
          }).then(response =>{
            console.log("NicoNico added!");
          });
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

  const competencies = ['céplusz', 'sdasdas', 'gdhgfhg'];

    return (
        <div className="page">
          <CompetencyProvider >
            <Grid container spacing={3} style={{marginTop: 40}}>
              <Grid item xs={2}>
                <Typography component="p">
                    What is your mood today?
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Smiley postNicoNico={postNicoNico}/>
              </Grid>
            </Grid>
                <DatePicker name="Start date" selectedDate={startDate} setSelectedDate={setStartDate} />
                <DatePicker name="End date" selectedDate={endDate} setSelectedDate={setEndDate} />
                <NicoNicoTable startDate={startDate} endDate={endDate} userData={userData}/>
            <CompetencyInputField />
            <CompetencyTable teamId={userData.teamId}/>
              <DeleteMe userData={userData} />
              <ChartDisplay teamId={userData.teamId} />
              {/* <RadarChart teamId={userData.teamId} /> */}
            </CompetencyProvider>
        </div>
    );
};

export default Metrics;