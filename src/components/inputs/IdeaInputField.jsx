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

export default function IdeaInputField(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    multiline: 'Controlled',
    showMessage: false,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function registerIdea() {
    fetch('/api/idea', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        date: addDate(),
        team: props.memberOfTeam,
        completed: false,
      }),
    }).then((response) => {
      if(response.status === 200){
        setValues({...values, showMessage: true});
        props.addIdea(values.name);
      }
    });
  }

  function addDate(){
    const today = Date.now();
    return (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today));
  }
  
  return (
    <form className={classes.container} key="createTeamForm" noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label="Idea description"
        helperText = "Decription"
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
        onClick={() => registerIdea()}
      >
        Add new Idea
      </Button>
      {values.showMessage === true ? <SimpleSnackbar msg="New Idea created" /> : ""}
    </form>
  );
}