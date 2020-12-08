import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import places from '../static/places';
import useWindowPosition from '../hook/useWindowPosition';
import { Typography, Link } from '@material-ui/core';

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
        <Typography>
          <Link href="https://www.google.com/" target="_blank">Calendar</Link>
        </Typography>
      </div>

      <div>
        <ImageCard place={places[0]} checked={checked} />
        <Typography>
          <Link href="#" target="_blank">Prescriptions Link</Link>
        </Typography>
      </div>

      <div>
        <ImageCard place={places[2]} checked={checked} /> 
        <Typography>
          <Link href="https://www.google.com/" target="_blank">Log In Link</Link>
        </Typography>
      </div>
    </div>
  );
}
