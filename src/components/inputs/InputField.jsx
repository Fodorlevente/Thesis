import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CreateTeamButton from '../buttons/CreateTeamButton';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2),
  },
}));

export default function CreateTeamInputField() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    age: '',
    multiline: 'Controlled',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function registerTeam() {
    fetch('/api/team', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
      }),
    });
  }

  return (
    <form className={classes.container} key="createTeamForm" noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label="Team Name"
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        onClick={() => registerTeam()}
      >
        Create a new team
      </Button>
    </form>
  );
}