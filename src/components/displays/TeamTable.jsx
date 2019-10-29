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
  },
  button: {
    margin: 2,
  },
});

function generateTableContent(content, memberOfTeam){
  return (
    Object.keys(content).map((key) => (
      <TableRow key={content[key].id}>
        <TableCell component="th" scope="row">
          {content[key].name}
        </TableCell>
        <TableCell align="right">
          {generateActionButton(memberOfTeam, content[key].name)}
        </TableCell>
        <TableCell align="right">
          {generateDeleteButton()}
        </TableCell>
      </TableRow>
    ))
  );
}

function generateActionButton(memberOfTeam, actualTeamName){
  return (
      <Button
        variant="contained"
        color={memberOfTeam === actualTeamName ? "primary" : "secondary" }
        size="large"
        className={useStyles.button}
        // onClick={() => registerTeam()}
      >
        {memberOfTeam === actualTeamName ? "Log out" : "Log in" }
      </Button>
  )
}

function generateDeleteButton(){
  return (
    <IconButton  className={useStyles.button} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  )
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
        {props.teams !== {} ? generateTableContent(props.teams, props.memberOfTeam) : "" }
        </TableBody>
      </Table>  
    </Paper>
  );
}