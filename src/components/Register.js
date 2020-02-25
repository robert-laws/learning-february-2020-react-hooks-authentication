import React, { useState } from 'react';

import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';

import firebase from '../firebase/firebase';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing()
  },
  submit: {
    marginTop: theme.spacing(3)
  }
})

const Register = props => {
  const { classes } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [quote, setQuote] = useState('');

  return (
    <main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Register
        </Typography>
        <form className={classes.form} onSubmit={e => e.preventDefault() && false }>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input id="firstName" name="firstName" autoComplete="off" autoFocus value={firstName} onChange={e => setFirstName(e.target.value)} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input id="lastName" name="lastName" autoComplete="off" value={lastName} onChange={e => setLastName(e.target.value)} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="quote">Your Favorite Quote</InputLabel>
            <Input id="quote" name="quote" autoComplete="off" value={quote} onChange={e => setQuote(e.target.value)}  />
          </FormControl>
          <Button	type="submit"	fullWidth variant="contained" color="primary" onClick={onRegister} className={classes.submit}>
            Register
          </Button>
          <Button type="submit" fullWidth variant="contained" color="secondary" component={Link} to="/login" className={classes.submit}>
            Return to Login
          </Button>
        </form>
      </Paper>
    </main>
  )

  async function onRegister() {
    let name = `${firstName} ${lastName}`;

    try {
      await firebase.register(name, email, password);
      await firebase.addQuote(quote)
      props.history.replace('/dashboard');
    } catch(error) {
      console.log(error.message)
    }
  }
}

export default withRouter(withStyles(styles)(Register));