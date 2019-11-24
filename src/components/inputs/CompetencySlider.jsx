import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

export default function CompetencySlider(props) {
  const classes = useStyles();
  const [value, setValue] = useState(50);

  function saveCompetency(_competencyId){
    fetch('/api/saveCompetency', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        competencyId: _competencyId,
        userId: props.userData.id,
        value: value
      }),
    });
  }

  function valuetext(value) {
    setValue(value);
    return value;
  }

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        {props.name}
      </Typography>
      <Slider
        defaultValue={50}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        onMouseUp={() => saveCompetency(props.competencyId)}
        step={10}
        marks
        min={0}
        max={100}
      />
    </div>
  );
}