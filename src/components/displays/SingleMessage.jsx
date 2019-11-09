import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 1),
    margin: 10,
  },
}));

export default function SingleMessage(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root} style={{backgroundColor: "#C0C0DC"}}>
      <Typography component="p" >
        {props.value}
      </Typography>
      <Typography component="p" color="textSecondary">
      From: {props.sender} Date: {props.date}
      </Typography>
    </Paper>
  );
}