import './App.css';
import SignIn from './Components/Sign/SignIn';
import Forgot from './Components/Sign/Forgot'
import Signup from './Components/Sign/Signup'
import Recover from './Components/Sign/Recover'
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import auth from './Components/auth/auth';
import UserContextProvider from './Context/userContext'

function App() {
  let title = " - BTracker";
  
  return (
    <Router>
      <UserContextProvider>
  <div className="app">
    <Switch>
      <Route exact path="/signin" component={SignIn}/>
      <Route exact path="/signup"> <Signup title={`Sign up${title}`}/> </Route>
      <Route exact path="/forgot"> <Forgot title={`Forgot${title}`}/> </Route>
      <Route exact path="/recover"> <Recover title={`Recover${title}`}/> </Route>

      <PrivateRoute exact path="/">
            
        </PrivateRoute>

      <Route exact={true} component={SignIn} />

    </Switch>
  </div>
  </UserContextProvider>
</Router>
  );
}

export default App;
