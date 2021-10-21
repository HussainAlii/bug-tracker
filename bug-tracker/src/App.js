import './App.css';
import SignIn from './Components/Sign/SignIn';
import Forgot from './Components/Sign/Forgot'
import Signup from './Components/Sign/Signup'
import Navbar from './Components/Navbar/Navbar';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';


function App() {
  let title = " - BTracker";
  return (
    <Router>
  <div className="app">
    <Switch>
      <Route exact path="/signin" component={SignIn}/>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/forgot" component={Forgot}/>

      <PrivateRoute exact path="/">
            
        </PrivateRoute>

      <Route exact={true} component={SignIn} />

    </Switch>
  </div>
</Router>
  );
}

export default App;
