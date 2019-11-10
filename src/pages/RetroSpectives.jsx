import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RetroCard from "../components/cards/RetroCard";
import RetroInputField from '../components/inputs/RetroInputField';
import UserProvider from "../contexts/UserProvider";
import _ from "lodash";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: 20,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: "#FB6542"
    // background: "#f9ccaa"
  },
}));

export default function RetroSpectives() {
  const classes = useStyles();
  const userData = useContext(UserProvider.context);
  const [retros, setRetros] = useState({});

  useEffect(() => {
      fetch('/retrospective')
      .then(response => response.json())
      .then(data => {
        setRetros(data);
      })
      .catch(error => {
          console.log(error)
      })
    }, []);

    function addMessage(messageName, _evaluation){
      // console.log(JSON.stringify(retros));
      setRetros([...retros, {id: Math.floor(Math.random()*100) , description: messageName, value: 0, evaluation: _evaluation, team: userData.team}]);
    }


  return (
    <div className={classes.root}>
        <Grid container spacing={3} border={1} alignItems="center">
        <Grid item xs>
          <Paper className={classes.paper}>Worked well</Paper>
          {_.isEmpty(retros) ?
            <p>There is no comment for this section</p> :
            Object.keys(retros).map((key) =>(
            retros[key].team === userData.team && retros[key].evaluation === "Worked well" ?
            <RetroCard description={retros[key].description} numberOfLikes={retros[key].value} /> : null
          ))}
          <RetroInputField label="Worked well" memberOfTeam={userData.team} roomName="PI1932" addMessage={addMessage} />
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper} >To be improved</Paper>
          {_.isEmpty(retros) ?
            <p>There is no comment for this section</p> :
            Object.keys(retros).map((key) =>(
            retros[key].team === userData.team && retros[key].evaluation === "To be improved" ?
            <RetroCard description={retros[key].description} numberOfLikes={retros[key].value}/> : null
          ))}
          <RetroInputField  label="To be improved" memberOfTeam={userData.team} roomName="PI1932" addMessage={addMessage}/>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>Want to do in next sprint</Paper>
          {_.isEmpty(retros) ?
            <p>There is no comment for this section</p> :
            Object.keys(retros).map((key) =>(
            retros[key].team === userData.team && retros[key].evaluation === "Want to do in next sprint" ?
            <RetroCard description={retros[key].description} numberOfLikes={retros[key].value}/> : null
          ))}
          <RetroInputField  label="Want to do in next sprint" memberOfTeam={userData.team} roomName="PI1932" addMessage={addMessage}/>
        </Grid>
      </Grid>
    </div>
  );
}