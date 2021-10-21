import './App.css';
import SignIn from './Components/Sign/SignIn';
import Navbar from './Components/Navbar/Navbar';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  let title = " - BTracker";
  return (
    <Router>
  <div className="app">
      <Navbar/>

    <Switch>
    <Route exact path="/">
        <SignIn title={`Sign In${title}`} />
      </Route>

      <Route exact={true} component={SignIn} />

    </Switch>
  </div>
</Router>
  );
}

export default App;
