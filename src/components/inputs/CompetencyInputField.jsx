import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SimpleSnackbar from '../displays/SnackBar';

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

export default function CompetencyInputField(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    multiline: 'Controlled',
    showMessage: false,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function registerCompetency() {
    fetch('/api/createCompetency', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
      }),
    }).then((response) => {
      if(response.status === 200){
        console.log("Competency added");
      }
    });
  }
  
  return (
    <form className={classes.container} key="createTeamForm" noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label="Name of the competency"
        helperText = "Name of the competency"
        required
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
        disabled={!values.name}
        className={classes.button}
        onClick={() => registerCompetency()}
      >
        Create new competency
      </Button>
      {values.showMessage === true ? <SimpleSnackbar msg="New competency registered" /> : ""}
    </form>
  );
}