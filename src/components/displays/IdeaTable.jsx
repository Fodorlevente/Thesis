import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginBottom: 25,
  },
  button: {
    margin: 2,
  },
  fab: {
    margin: 0,
  },
});

function generateTableContent(content, removeIdea, setComplete){
  return (
    Object.keys(content).map((key) => (
      <TableRow key={content[key].name}>
        <TableCell component="th" scope="row">
          {content[key].message}
        </TableCell>
        <TableCell align="right">
          {content[key].team}
        </TableCell>
        <TableCell>
            {content[key].date}
        </TableCell>
        {generateCompletedButton(content[key].completed, content[key].message, setComplete)}
        <TableCell align="right">
          {generateDeleteButton(content[key].message, removeIdea)}
        </TableCell>
      </TableRow>
    ))
  );
}

function generateCompletedButton(completed,ideaName, setComplete){
  return(
    <TableCell align="right">
            <Fab color={completed ? "primary" : "secondary"} aria-label="edit" className={useStyles.fab}  onClick={() => completeIdea(ideaName, setComplete) }>
                {completed ? <CheckIcon /> : <PriorityHighIcon />}
            </Fab>
      </TableCell>
  )
}

function generateDeleteButton(ideaName, removeIdea){
  return (
    <IconButton  className={useStyles.button} aria-label="delete" onClick={() => deleteIdea(ideaName, removeIdea) } >
      <DeleteIcon />
    </IconButton>
  )
}

function deleteIdea(ideaName, removeIdea) {
  fetch('/api/deleteidea', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: ideaName,
    }),
  }).then((response) => {
    if(response.status === 200){
      removeIdea(ideaName);
      console.log(`${ideaName} idea deleted`);
    }
  });
}

function completeIdea(ideaName, setComplete) {
  fetch('/api/completeidea', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: ideaName,
    }),
  }).then((response) => {
    if(response.status === 200){
      setComplete(ideaName);
      console.log(`${ideaName} idea set to Completed`);
    }
  });
}

export default function IdeaTable(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="team table">
        <TableHead>
          <TableRow>
            <TableCell>Message</TableCell>
            <TableCell>Responsible</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Completed</TableCell>
            <TableCell align="right">Delete Idea</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {props.ideas !== {} ? generateTableContent(props.ideas, props.removeIdea, props.setComplete) : "" }
        </TableBody>
      </Table>  
    </Paper>
  );
}