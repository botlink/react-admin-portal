import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Home from './components/home/home';
import Success from './components/success/success';
import About from './components/success/success';
import Login from './components/login/login';



const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 1000); // fake async
  }
};

const login = () => {
  fakeAuth.authenticate(() => {});
};

const LoginWithProps = () => {
  return (
    <Login onLogin={login}/>
  );
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{""}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Log Out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

const rootReducer = combineReducers({
  form: formReducer
});

const BasicExample = () => (
  <Router>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <a className="navbar-brand" href="#">
          <img src="./public/botlink_logo.png" width="30" height="34" className="d-inline-block align-top" alt="" />
          Newer Admin Portal&trade;
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/protected">Protected</Link>
            </li>
              <AuthButton className="my-lg-0"/>
          </ul>
        </div>
      </nav>

      <div className="container">
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/login" component={LoginWithProps} />
        <PrivateRoute path="/success" component={Success}/>
        <PrivateRoute path="/about" component={About}/>
        <PrivateRoute path="/protected" component={Protected} />
      </div>
    </div>
  </Router>
);

export default BasicExample;
