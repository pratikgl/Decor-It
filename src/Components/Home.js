import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import { useAuth } from '../Contexts/AuthContext';
import HomeItems from './HomeItems';
import HomeDashboard from './HomeDashboard';
import HomeFooter from './HomeFooter';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Home() {
  const classes = useStyles();

  const { getItems } = useAuth();
  const [items, setItems] = useState()

  useEffect(() => {
    async function item() {
      const data = await getItems()
      setItems(data)
    };
    item();
  }, []);

  return (
    <React.Fragment >
      <CssBaseline />
      <Header />
      <main>
        <HomeDashboard />
        {items ?
          <HomeItems items={items} /> :
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>}
      </main>
      <HomeFooter />
    </React.Fragment>
  );
}