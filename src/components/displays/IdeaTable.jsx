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

export default function IdeaTable(props) {
  const classes = useStyles();

  function generateTableContent(content){
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
          {generateCompletedButton(content[key].completed, content[key].message)}
          <TableCell align="right">
            {generateDeleteButton(content[key].message)}
          </TableCell>
        </TableRow>
      ))
    );
  }
  
  function generateCompletedButton(completed,ideaName){
    return(
      <TableCell align="right">
              <Fab color={completed ? "primary" : "secondary"} aria-label="edit" className={classes.fab}  onClick={() => completeIdea(ideaName) }>
                  {completed ? <CheckIcon /> : <PriorityHighIcon />}
              </Fab>
        </TableCell>
    )
  }
  
  function generateDeleteButton(ideaName){
    return (
      <IconButton  className={classes.button} aria-label="delete" onClick={() => deleteIdea(ideaName) } >
        <DeleteIcon />
      </IconButton>
    )
  }
  
  function deleteIdea(ideaName) {
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
        props.fetchIdeasFromDB();
      }
    });
  }
  
  function completeIdea(ideaName) {
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
        props.fetchIdeasFromDB();
      }
    });
  }

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
        {props.ideas !== {} ? generateTableContent(props.ideas) : "" }
        </TableBody>
      </Table>  
    </Paper>
  );
}