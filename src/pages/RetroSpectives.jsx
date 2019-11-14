import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RetroCard from "../components/cards/RetroCard";
import RetroInputField from '../components/inputs/RetroInputField';
import UserProvider from "../contexts/UserProvider";
import _ from "lodash";
import RetroCreator from "../components/inputs/RetroCreator";
import RetroRoomCard from "../components/cards/RetroRoomCard";
import Button from '@material-ui/core/Button';
import { copyFile } from 'fs';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: 20,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: "#B3E3B5"
  },
  button: {
    margin: theme.spacing(2),
    padding: '0 30px',
  },
}));

export default function RetroSpectives() {
  const classes = useStyles();
  const userData = useContext(UserProvider.context);

  const [retros, setRetros] = useState({});
  const [activeRetro, setActiveRetro] = useState({});
  let [issues, setIssues] = useState([]);

  useEffect(() => {
      fetch(`/retrospective/${userData.teamId}`)
      .then(response => response.json())
      .then(data => {
        setRetros(data);
      })
      .catch(error => {
          console.log(error)
      })
    }, []);

    function generateListOfRooms(){
      return(
        Object.keys(retros).map((key) => (
          <RetroRoomCard data={retros[key]} onClickEvent={onClickEvent}/>
        ))
      );
    }

    function getIssues(retroId){
        fetch(`/api/issues/${retroId}`)
        .then( res => res.json())
        .then(res => {
          setIssues(res);
          console.log(`issues: ${JSON.stringify(issues)}`);
          });
    }

    function onClickEvent(e){
      setActiveRetro({
        retroName: e.currentTarget.textContent,
        retroId: e.currentTarget.id,
      });
      getIssues(e.currentTarget.id);
    }

    function generateIssueItems(evalType){
      return(
        _.isEmpty(issues) ?
          <p>There is no comment for this section</p> :
          (issues).map((issue) =>(
            issue.evaluation === evalType ?
          <RetroCard description={issue.description} numberOfLikes={issue.value} /> : null
        ))
      )
    }

    function issuesView(){
      return(
        <div>
          <Grid container spacing={3} border={1} alignItems="center">
          <Grid item xs>
            <Paper className={classes.paper}>Worked well</Paper>
            {generateIssueItems("Worked well")}
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper} >To be improved</Paper>
            {generateIssueItems("To be improved")}
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>Want to do in next sprint</Paper>
            {generateIssueItems("Want to do in next sprint")}
          </Grid>
        </Grid>
        <RetroInputField getIssues={getIssues} retroId={activeRetro.retroId}/>
      </div>
      )
    }

    function clearRetro(){
      setIssues([]);
      setActiveRetro({})
    }

    function backButtonToRetro(){
      return (
        <Button
        variant="contained"
        color="secondary"
        size="large"
        className={classes.button}
        onClick={() => clearRetro()}
      >
        Back
      </Button>
      )
    }
  

  return (
    <div className={classes.root}>
      <p className="page-title" style={{ textAlign: "center" }}>
                {userData.team} retrospective board
      </p>
      {_.isEmpty(activeRetro) ? 
      <div>
      <RetroCreator memberOfTeam={userData.team} />
      <Grid container justify="center"> 
        {generateListOfRooms()}
      </Grid> 
      </div> 
      : 
      <div>
        {backButtonToRetro()}
        {issuesView()}
    </div>
  }
</div>
  );
}