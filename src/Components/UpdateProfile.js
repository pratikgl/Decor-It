import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
import ConfirmPassword from './ConfirmPassword';

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

export default function UpdateProfile() {
  const classes = useStyles();

  const fnameRef = useRef()
  const lnameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const cnfpasswordRef = useRef()
  const { currentUser, updatePassword, updateEmail, getData, addUserDb } = useAuth()
  const [confirmPasswordOpen, setConfirmPasswordOpen] = useState(false)
  const [error, setError] = useState('')
  const [verifyPassword, setVerifyPassword] = useState(false)
  const [updateMessage, setUpdateMessage] = useState('')
  const history = useHistory()
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== cnfpasswordRef.current.value) {
      setError('Passwords do not match')
    } else {
      setConfirmPasswordOpen(true)
    }

  }

  if (verifyPassword) {
    setVerifyPassword(false)
    setUpdateMessage('')
    const promises = []

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }
    if (fnameRef.current.value === '') {
      fnameRef.current.value = fname
    }
    if (lnameRef.current.value === '') {
      lnameRef.current.value = lname
    }
    promises.push(addUserDb(
      fnameRef.current.value,
      lnameRef.current.value,
      emailRef.current.value,
      currentUser.uid
    ))
    Promise.all(promises)
      .then(() => {
        setUpdateMessage('success')
      })
      .catch(() => {
        setUpdateMessage('error')
      })
  }

  // get the access to the database
  getDoc()
  async function getDoc() {
    if (currentUser) {
      const doc = await getData()
      setFname(doc.data().fname)
      setLname(doc.data().lname)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>

        {/* Show the error in an alert view */}
        {
          error &&
          <Alert severity="error" style={{ marginTop: 10, alignSelf: 'normal' }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        }

        {/* Alert for profile updation */}
        {
          updateMessage &&
          <Alert severity={updateMessage} style={{ marginTop: 10, alignSelf: 'normal' }}>
            {updateMessage === 'error' ? 'Failed to update profile' : 'Profile updated'}
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
                fullWidth
                id="firstName"
                label="First Name"
                placeholder={fname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={lnameRef}
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                placeholder={lname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={emailRef}
                defaultValue={currentUser && currentUser.email}
                error={error === "Invalid Email Address" ? true : false}
                variant="outlined"
                fullWidth
                id="email"
                label="New Email Address"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={passwordRef}
                error={error === "Passwords do not match" ? true : false}
                variant="outlined"
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={cnfpasswordRef}
                error={error === "Passwords do not match" ? true : false}
                variant="outlined"
                fullWidth
                name="cnfpassword"
                label="Confirm New Password"
                type="password"
                id="cnfpassword"
              />
            </Grid>
          </Grid>

          {/* show a dialog box for password confirmation */}
          <ConfirmPassword
            confirmPasswordOpen={confirmPasswordOpen}
            toggleOpen={() => setConfirmPasswordOpen(false)}
            toggleVerification={() => setVerifyPassword(true)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          // disable the submit button when the status is loading
          >
            Update Profile
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}