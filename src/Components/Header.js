import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import logo from './../Assets/img/logo.png';
import Image from 'react-bootstrap/Image'
import { Button, Container, Dialog, Typography } from '@material-ui/core';
import { useAuth } from '../Contexts/AuthContext';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Alert } from '@material-ui/lab';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  logo: {
    marginTop: 6,
    height: 50,
  },
  button: {
    textTransform: 'none',
    marginRight: 10,
  },
  cookieAlert: {
    "& .MuiAlert-icon": {
      fontSize: 25
    },
    "& .MuiAlert-message": {
      fontSize: 16,
      marginRight: 10
    },
  }
}));

export default function Header() {
  const classes = useStyles();

  const [error, setError] = useState('')
  const { currentUser, logout, getData } = useAuth();
  const [open, setOpen] = useState(false)
  const [fname, setFname] = useState('Sign In')
  const [cartCount, setCartCount] = useState(0)

  async function handleLogout() {
    setError('')
    try {
      await logout()
    } catch {
      setError('Failed to log out')
    }
    setOpen(true)
  }

  useEffect(() => {
    async function getDoc() {
      const doc = await getData()
      setFname(doc.data().fname)

      var cart = doc.data().cart
      var count = 0
      Object.keys(cart).forEach(id => count += cart[id])
      setCartCount(count)
    };
    function resetUser() {
      setFname('Sign In')
      setCartCount(0)
    }
    currentUser ? getDoc() : resetUser()
  }, [currentUser]);

  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.toolbar} >
        <Toolbar>
          {/* Decor It logo */}
          <Image src={logo} alt={'logo'} className={classes.logo} />

          {/* empty div */}
          <div style={{ flex: 1 }}></div>

          {/* Profile : Login */}
          <Button
            color='primary'
            className={classes.button}
            href={currentUser ? '/update_profile' : '/signin'}
          >
            <PersonIcon style={{ marginRight: 3 }} />
            <Typography >
              {fname}
            </Typography>
          </Button>

          {/* Bucket */}
          <Button color='primary' className={classes.button}>
            <Badge color="secondary" badgeContent={cartCount}>
              <ShoppingCartIcon style={{ marginRight: 3 }} />
            </Badge>
            <Typography>
              Cart
            </Typography>
          </Button>

          {/* Log out button only is currently logged in */}
          <Button hidden={!currentUser} color='primary' className={classes.button} onClick={handleLogout}>
            <ExitToAppIcon style={{ marginRight: 3 }} />
            <Typography>
              Log Out
            </Typography>
          </Button>

          {/* show a dialog box after log out */}
          <Dialog onClose={() => setOpen(false)} open={open}>
            <Alert
              severity={error ? 'error' : 'success'}
              onClose={() => setOpen(false)}
              className={classes.cookieAlert}
            >
              {error ? error : 'Log out Successful'}
            </Alert>
          </Dialog>
        </Toolbar>
      </Container>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};