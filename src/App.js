import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import Agreement from "./screens/Agreement";
import Login from "./screens/Login";
import Main from "./screens/Main";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register">{/* <About /> */}</Route>
          <Route path="/login">{<Login />}</Route>
          <Route path="/agreement">
            <Agreement />
          </Route>
          <Route path="/main">{<Main />}</Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
