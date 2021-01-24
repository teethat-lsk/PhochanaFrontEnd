import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import Agreement from "./screens/Agreement";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register">{/* <About /> */}</Route>
          <Route path="/login">{/* <About /> */}</Route>
          <Route path="/agreement">
            <Agreement />
          </Route>
          <Route path="/main">{/* <Users /> */}</Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
