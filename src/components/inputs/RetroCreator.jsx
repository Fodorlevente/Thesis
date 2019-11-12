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


export default function RetroCreator(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    multiline: 'Controlled',
    showMessage: false,
  });

  function createRetro() {
    fetch('/api/createRetroSpective', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: addDate(),
        team: props.memberOfTeam,
        roomName: values.name,
      }),
    }).then((response) => {
      if(response.status === 200){
        setValues({...values, showMessage: true});
        props.addMessage(values.name,props.label);
      }
    });
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function addDate(){
    const today = Date.now();
    return (new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today));
  }

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <div>
        <TextField
          id="create-retro-name"
          className={classes.textField}
          label="Name of the room"
          margin="normal"
          variant="outlined"
          value={values.name}
          onChange={handleChange('name')}
          fullWidth
          required
        />
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => createRetro()}>
            <AddIcon />
        </Fab>
      </div>
    </form>
  );
}