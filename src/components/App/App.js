import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import ShelterListingPage from '../ShelterListingPage/ShelterListingPage';
import ShelterDetails from '../ShelterListingPage/ShelterDetails/ShelterDetails';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import AllSettings from '../UserPortal/Settings/AllSettings'
import UserPortal from '../UserPortal/UserPortal'
import SignUp1Contact from '../UserPortal/SignUp/SignUp1Contact/SignUp1Contact'
import SignUp2Hours from '../UserPortal/SignUp/SignUp2Hours/SignUp2Hours'
import SignUp3Types from '../UserPortal/SignUp/SignUp3Types/SignUp3Types'
import SignUp4Tags from '../UserPortal/SignUp/SignUp4Tags/SignUp4Tags'
import SignUpSubmit from '../UserPortal/SignUp/SignUpSubmit/SignUpSubmit'
import Welcome from '../Welcome/Welcome'

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/about" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/explore"
              component={ShelterListingPage}
            />
            <Route
              exact
              path="/explore/:id"
              component={ShelterDetails}
            />
            <Route
              exact
              path="/about"
              component={Welcome}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              // exact
              path="/home"
              component={UserPortal}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            <ProtectedRoute
              exact
              path="/settings"
              component={AllSettings}
            />
            <ProtectedRoute
              exact
              path="/sign-up-1"
              component={SignUp1Contact}
            />
            <ProtectedRoute
              exact
              path="/sign-up-2"
              component={SignUp2Hours}
            />
            <ProtectedRoute
              exact
              path="/sign-up-3"
              component={SignUp3Types}
            />
            <ProtectedRoute
              exact
              path="/sign-up-4"
              component={SignUp4Tags}
            />
            <ProtectedRoute
              exact
              path="/sign-up-submit"
              component={SignUpSubmit}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
