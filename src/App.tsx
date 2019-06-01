import React from 'react';
import './include/bootstrap';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.css';
import Login from './components/login/login.component';
import Landing from './components/landing/landing.component';
import Logout from './components/logout/logout.component';
import Users from './components/users/users.component';
import { Provider } from 'react-redux';
import { store } from './Store';
import Dashboard from './components/dashboard/dashboard.component';



const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/landing" />
            <Route
              path="/landing"
              component={Landing}
            />
            <Route
              path="/login" // Login page
              component={Login}
            />
            <Route
              path="/logout"
              component={Logout}
            />
            <Route
              path="/dashboard"
              component={Dashboard}
            />
            <Route
              path="/users"
              component={Users}
            />
            <Route 
              path="/401"
              render={() => <h1>401: Unauthorized</h1>} 
            />
            <Route
              path="/403"
              render={() => <h1>403: Forbidden</h1>} 
            />
            <Route 
              render={() => <h1>404: Not Found</h1>} 
            />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
