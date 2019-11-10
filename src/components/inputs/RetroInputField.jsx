import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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

export default function RetroInputField(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    multiline: 'Controlled',
    showMessage: false,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function registerCommentForRetro() {
    fetch('/api/sendRetroSpective', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: values.name,
        date: addDate(),
        team: props.memberOfTeam,
        roomName: props.roomName,
        evaluation: props.label,
      }),
    }).then((response) => {
      if(response.status === 200){
        setValues({...values, showMessage: true});
        props.addMessage(values.name,props.label);
      }
    });
  }

  function addDate(){
    const today = Date.now();
    return (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today));
  }
  
  return (
    <form className={classes.container} key="createRetroSpectiveForm" noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label={props.label}
        helperText = {props.label}
        required
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
        variant="outlined"
        fullWidth
      />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        disabled={!values.name}
        className={classes.button}
        onClick={() => registerCommentForRetro()}
      >
        Send
      </Button>
    </form>
  );
}