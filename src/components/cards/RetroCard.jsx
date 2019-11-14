import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "100%",
    margin: 20,
    background: "#E3E3E3"
  }
}));

export default function RetroCard(props) {
  const classes = useStyles();
  console.log(props);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" color="secondary" >
          <FavoriteIcon />
        </IconButton>
        <Typography variant="p">
            {props.numberOfLikes}
        </Typography>
      </CardActions>
    </Card>
  );
}