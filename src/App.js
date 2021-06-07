import React from 'react'
import Home from "./Components/Home";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import { AuthProvider } from './Contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
