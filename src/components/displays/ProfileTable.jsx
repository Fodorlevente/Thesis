import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
    margin: 10,
  },
  button: {
    margin: theme.spacing(1),
    alignContent: 'right'
  },
}));


export default function ProfileTable(props) {
  const classes = useStyles();
  const userData = props.userData;

  function setScrumMaster() {
    fetch('/api/setProfile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rank: "Scrum Master",
        user: userData.name
      }),
    })
  }

  function generateSetScrumMasterButton(data,team){
    return (
      <div>
        <p>{data}</p>
        <Button variant="contained" color="secondary" className={classes.button} onClick={() => setScrumMaster()}>
            Set me as a scrum master of {team}
        </Button>
      </div>
    )
  }

  return (
    Object.keys(userData).map((key) => (
    <Paper className={classes.root} key={key}>
      <Typography component="p" color="primary">
        {key}
      </Typography>
      <Typography component="div" color="textSecondary">
        {userData[key] === "Developer" && userData.team !== "" ? generateSetScrumMasterButton(userData[key], userData.team) : userData[key]}
      </Typography>
    </Paper>
    ))
  );
}