import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import { useAuth } from '../Contexts/AuthContext';
import HomeItems from './HomeItems';
import HomeDashboard from './HomeDashboard';
import HomeFooter from './HomeFooter';

export default function Home() {
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
        {items && <HomeItems items={items} />}
      </main>
      <HomeFooter />
    </React.Fragment>
  );
}