import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import logo from './../Assets/img/logo.png';
import Image from 'react-bootstrap/Image'
import { Button, Container, Typography } from '@material-ui/core';
import { useAuth } from '../Contexts/AuthContext';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router';

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
  }
}));

export default function Header(props) {
  const classes = useStyles();

  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth();
  const history = useHistory()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.pushState('/')
    } catch {
      setError('Failed to log out')
    }
  }

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
            href={currentUser ? '/update_profile' : 'signin'}
          >
            <PersonIcon style={{ marginRight: 3 }} />
            <Typography >
              {currentUser ? currentUser.email : 'Sign In'}
            </Typography>
          </Button>

          {/* Bucket */}
          <Button color='primary' className={classes.button}>
            <ShoppingCartIcon style={{ marginRight: 3 }} />
            <Typography>
              Cart
            </Typography>
          </Button>

          {
            /* Log out button only is currently logged in */
            currentUser &&
            <Button color='primary' className={classes.button} onClick={handleLogout}>
              <ExitToAppIcon style={{ marginRight: 3 }} />
              <Typography>
                Log Out
            </Typography>
            </Button>
          }
        </Toolbar>
      </Container>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};