import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginBottom: 25,
  },
  button: {
    margin: 2,
  },
});

function generateTableContent(content, memberOfTeam, removeTeam, userName){
  return (
    Object.keys(content).map((key) => (
      <TableRow key={content[key].name}>
        <TableCell component="th" scope="row">
          {content[key].name}
        </TableCell>
        <TableCell align="right">
          {generateActionButton(memberOfTeam, content[key].name, userName)}
        </TableCell>
        <TableCell align="right">
          {generateDeleteButton(content[key].name, removeTeam)}
        </TableCell>
      </TableRow>
    ))
  );
}

function generateActionButton(memberOfTeam, actualTeamName, userName){
  return (
      <Button
        variant="contained"
        color={memberOfTeam === actualTeamName ? "primary" : "secondary" }
        size="large"
        className={useStyles.button}
        onClick={() => joinTeam(actualTeamName, userName) }
      >
        {memberOfTeam === actualTeamName ? "Leave" : "Join" }
      </Button>
  )
}

function generateDeleteButton(teamName, removeTeam){
  return (
    <IconButton  className={useStyles.button} aria-label="delete" onClick={() => deleteTeam(teamName, removeTeam) } >
      <DeleteIcon />
    </IconButton>
  )
}

function deleteTeam(teamName, removeTeam) {
  fetch('/api/deleteteam', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: teamName,
    }),
  }).then((response) => {
    if(response.status === 200){
      removeTeam(teamName);
      console.log(`${teamName} deleted`);
    }
  });
}

function joinTeam(teamName, userName) {
  fetch('/api/jointeam', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: userName,
      team: teamName,
    }),
  }).then((response) => {
    if(response.status === 200){
      // removeTeam(teamName);
      console.log(`${userName} joined ${teamName} `);
    }
  });
}

export default function TeamTable(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="team table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Action</TableCell>
            <TableCell align="right">Delete Team</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.teams !== {} ? generateTableContent(props.teams, props.memberOfTeam, props.removeTeam, props.userName) : "" }
        </TableBody>
      </Table>  
    </Paper>
  );
}