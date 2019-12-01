import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MoodBadTwoToneIcon from '@material-ui/icons/MoodBadTwoTone';
import MoodTwoToneIcon from '@material-ui/icons/MoodTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';

const useStyles = makeStyles(theme => ({
  icon: {
    width: 60,
    height: 60,
    "&:hover": {
      color: '#A2AB2C'
    },
  }
}));


export default function Smiley(props) {
  const classes = useStyles();
  
  return (
      <div>
        <MoodBadTwoToneIcon className={classes.icon} onClick={(e) => props.postNicoNico(e,1)} />
        <FaceTwoToneIcon className={classes.icon} onClick={(e) => props.postNicoNico(e,3)} />
        <MoodTwoToneIcon className={classes.icon} onClick={(e) => props.postNicoNico(e,5)} />
      </div>
  );
}