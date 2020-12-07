import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import places from '../static/places';
import useWindowPosition from '../hook/useWindowPosition';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
export default function () {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
    <div className={classes.root} id="Body">
      <div>
        <ImageCard place={places[1]} checked={checked} />
        <CardActions>
        <Button size="small" color="primary">
          CALENDAR LINK
        </Button>
      </CardActions>
      </div>

      <div>
        <ImageCard place={places[0]} checked={checked} />
        <CardActions>
        <Button size="small" color="primary">
         PRESCRIPTIONS LINK
        </Button>
      </CardActions>
      </div>

      <div>
        <ImageCard place={places[2]} checked={checked} /> 
        <CardActions>
        <Button size="small" color="primary">
          LOG IN LINK 
        </Button>
      </CardActions>
      </div>
    </div>
  );
}
