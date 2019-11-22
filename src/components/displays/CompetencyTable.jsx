import React, { useState, useEffect } from 'react';
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

function generateTableContent(content, teamId){
  return (
    Object.keys(content).map((key) => (
      <TableRow key={content[key].name}>
        <TableCell component="th" scope="row">
          {content[key].name}
        </TableCell>
        <TableCell align="right">
          {generateAddToTeamButton(teamId, content[key].id)}
        </TableCell>
      </TableRow>
    ))
  );
}

function generateAddToTeamButton(teamId, actualId){
  return (
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className={useStyles.button}
        onClick={() => addCompetencyToTeam(actualId, teamId) }
      >
        {/* {memberOfTeam == actualId ? "Remove" : "Add" } */}
        Add
      </Button>
  )
}

//add to team
function addCompetencyToTeam(_teamId, _competencyId) {
  fetch('/api/addTeamCompetency', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      competencyId: _competencyId ,
      teamId: _teamId,
    }),
  }).then((response) => {
    if(response.status === 200){
      console.log("kiscucaaa");
    }
  });
}

export default function CompetencyTable(props) {
  const classes = useStyles();
  const [competencies, setCompetencies] = useState([]);

  useEffect(() => {
    fetch('/api/competencies')
      .then(response => response.json())
      .then(data => {
        setCompetencies(data);
      })
      .catch(error => {
          console.log(error)
      })
  }, []);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="team table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Add to my team</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.teams !== {} ? generateTableContent(competencies, props.teamId) : "" }
        </TableBody>
      </Table>  
    </Paper>
  );
}