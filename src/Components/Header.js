import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import logo from './../Assets/img/logo.png';
import Image from 'react-bootstrap/Image'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  logo: {
    marginTop: 6,
    height: 50,
  }
}));

export default function Header(props) {
  const classes = useStyles();
  return (
    <React.Fragment>

      <Toolbar className={classes.toolbar}>

        {/* logo */}
        <Image src={logo} alt={'logo'} className={classes.logo} />

        {/* empty div */}
        <div style={{ flex: 1 }}></div>

        {/* Profile : Login */}
        <IconButton>
          <PersonIcon />
        </IconButton>


        {/* Bucket */}
        <IconButton>
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>

    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};