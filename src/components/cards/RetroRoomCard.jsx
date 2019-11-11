import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: 275,
    margin: 20,
    '&:hover': {
        background: "#c7efcf",
     },
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

export default function RetroRoomCard(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root} >
      <Typography variant="h5" component="h3" className={classes.text}>
        {props.name}
      </Typography>
    </Paper>
  );
}