import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

const media = {
  mobile: "@media(max-width: 768px)"
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  paper: {
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(4),
    height: 400,
    width: 450,
    [media.mobile]: {
      margin: theme.spacing(1, 1, 1),
      width: "85%",
      height: "70%"
    }
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item>
        <Paper className={classes.paper}>
          <Card>
            <CardActionArea href="https://www.linkedin.com/in/arjun-rajasekharan/" target="#">
              <CardMedia
                component="img"
                height="340"
                image="https://i.ibb.co/kH5HGCf/1594222573417.jpg"
              />
              <CardContent>
                <Typography variant="h5">
                  Arjun Rajasekharan
                </Typography>
                <Typography variant="p">
                  COE18B063
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Paper>
      </Grid>
      <Grid item>
      <Paper className={classes.paper}>
          <Card>
            <CardActionArea href="https://www.instagram.com/cd_darth_tyranus/?igshid=uxv3bq3ie3ok" target="#">
              <CardMedia
                component="img"
                height="340"
                image="https://i.ibb.co/KsvZKdR/66430229-1179925775464397-7650617272905498624-n.jpg"
              />
              <CardContent>
                <Typography variant="h5">
                  Dhananjay Nechikkat
                </Typography>
                <Typography variant="p">
                  CED18I016
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Paper>
      </Grid>
      <Grid item>
      <Paper className={classes.paper}>
          <Card>
            <CardActionArea href="https://www.linkedin.com/in/shakkirmln/" target="#">
              <CardMedia
                component="img"
                height="340"
                image="https://i.ibb.co/Qf063wD/1572434679654.jpg"
              />
              <CardContent>
                <Typography variant="h5">
                  Shakkir Moulana
                </Typography>
                <Typography variant="p">
                  CED18I043
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
}
