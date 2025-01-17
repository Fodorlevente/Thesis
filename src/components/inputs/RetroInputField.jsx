import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RetroSelect from "./RetroSelect";

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
  const [issueTpye, setIssueTpye] = React.useState('');

  const handleChangeInSelect = event => {
    setIssueTpye(event.target.value);
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function registerCommentForRetro() {
    fetch('/api/createIssue', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: values.name,
        evaluation: issueTpye,
        RetrospectiveId: props.retroId
      }),
    }).then((response) => {
      if(response.status === 200){
        setValues({...values, showMessage: true});
        props.getIssues(props.retroId);
      }
    });
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
      <RetroSelect handleChange={handleChangeInSelect} issueTpye={issueTpye} />
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