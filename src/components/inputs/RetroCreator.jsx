import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },fab: {
    margin: theme.spacing(1),
    justifyContent: 'center'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    justifyContent: 'center'
  },
}));

export default function RetroCreator() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <div>
        <TextField
          id="create-retro-name"
          className={classes.textField}
          label="Name of the room"
          margin="normal"
          variant="outlined"
          fullWidth
          required
        />
        <Fab color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
        </Fab>
      </div>
    </form>
  );
}