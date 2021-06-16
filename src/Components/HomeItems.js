import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '133%', // 4:3
    margin: '5px'
  },
  cardContent: {
    flexGrow: 1,
  },

}));

export default function HomeItems({ items }) {
  const classes = useStyles();
  const num = items.size

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {[...Array(num)].map((_, id) => (
          < Grid item key={id} xs={12} sm={6} md={4} >
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={items.docs[id].data().url}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {items.docs[id].data().heading}
                </Typography>
                <Typography variant='body2' color="textSecondary">
                  {items.docs[id].data().details}
                </Typography>
                <Typography style={{ marginTop: '12px' }} variant="h5" component='h1'>
                  {'₹ ' + items.docs[id].data().price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Add to Cart
                </Button>
                <Button size="small" color="primary">
                  Buy Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
