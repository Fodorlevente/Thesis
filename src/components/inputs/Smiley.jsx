import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';
import MoodBadTwoToneIcon from '@material-ui/icons/MoodBadTwoTone';
import MoodTwoToneIcon from '@material-ui/icons/MoodTwoTone';
import FaceTwoToneIcon from '@material-ui/icons/FaceTwoTone';

const useStyles = makeStyles(theme => ({
  icon: {
    width: 60,
    height: 60,
  }
}));


export default function Smiley(props) {
  const classes = useStyles();
  
  return (
      <div>
        <MoodBadTwoToneIcon className={classes.icon} value="1" />
        <FaceTwoToneIcon className={classes.icon} value="3" />
        <MoodTwoToneIcon className={classes.icon} value="5" />
      </div>
  );
}