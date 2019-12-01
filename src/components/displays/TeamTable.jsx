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



export default function TeamTable(props) {
  const classes = useStyles();

  function generateTableContent(content, memberOfTeam, userName){
    return (
      Object.keys(content).map((key) => (
        <TableRow key={content[key].name}>
          <TableCell component="th" scope="row">
            {content[key].name}
          </TableCell>
          <TableCell align="right">
            {generateActionButton(memberOfTeam, content[key].id, userName)}
          </TableCell>
          <TableCell align="right">
            {generateDeleteButton(content[key].id)}
          </TableCell>
        </TableRow>
      ))
    );
  }
  
  function generateActionButton(memberOfTeam, actualId, userName){
    return (
        <Button
          variant="contained"
          color={memberOfTeam === actualId ? "primary" : "secondary" }
          size="large"
          className={useStyles.button}
          onClick={() => joinTeam(actualId, userName) }
        >
          {memberOfTeam == actualId ? "Leave" : "Join" }
        </Button>
    )
  }
  
  function generateDeleteButton(actualId){
    return (
      <IconButton  className={useStyles.button} aria-label="delete" onClick={() => deleteTeam(actualId) } >
        <DeleteIcon />
      </IconButton>
    )
  }
  
  function deleteTeam(actualId) {
    fetch('/api/deleteteam', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: actualId,
      }),
    }).then((response) => {
      if(response.status === 200){
        props.fetchTeamsFromDB();
      }
    });
  }
  
  function joinTeam(actualId, userName) {
    fetch('/api/jointeam', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,
        teamId: actualId,
      }),
    }).then((response) => {
      if(response.status === 200){
        console.log(`${userName} joined ${actualId} `);
      }
    });
  }

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
        {props.teams !== {} ? generateTableContent(props.teams, props.memberOfTeam, props.userName) : "" }
        </TableBody>
      </Table>  
    </Paper>
  );
}