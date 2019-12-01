import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function RetroSelect(props) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Worked well</InputLabel>
        <Select
          id="retro-label-id"
          value={props.issueTpye}
          onChange={props.handleChange}
        >
          <MenuItem value="Worked well">Worked well</MenuItem>
          <MenuItem value="To be improved">To be improved</MenuItem>
          <MenuItem value="Want to do in next sprint">Want to do in next sprint</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}