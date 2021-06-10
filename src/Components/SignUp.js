import React, { useRef, useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../Contexts/AuthContext';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useHistory } from 'react-router';
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const fnameRef = useRef()
  const lnameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const cnfpasswordRef = useRef()
  const { signup, addUserDb, currentUser } = useAuth()
  const [error, setError] = useState('')
  // if loading = true : we will disable the submit button to prevent submitting again and again
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== cnfpasswordRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      const user = await signup(emailRef.current.value, passwordRef.current.value)

      await addUserDb(
        fnameRef.current.value,
        lnameRef.current.value,
        emailRef.current.value,
        user.user.uid
      )
      history.push('/')
    } catch (er) {
      if (er.code === 'auth/invalid-email') {
        setError('Invalid Email Address')
      } else {
        setError('Failed to create an account')
      }
    }

    setLoading(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {/* Show the error in an alert view */}
        {
          error &&
          <Alert severity="error" style={{ marginTop: 10, alignSelf: 'normal' }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        }
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={fnameRef}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={lnameRef}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={emailRef}
                error={error === "Invalid Email Address" ? true : false}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={passwordRef}
                error={error === "Passwords do not match" ? true : false}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={cnfpasswordRef}
                error={error === "Passwords do not match" ? true : false}
                variant="outlined"
                required
                fullWidth
                name="cnfpassword"
                label="Confirm Password"
                type="password"
                id="cnfpassword"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // disable the submit button when the status is loading
            disabled={loading}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href='./signin' variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}