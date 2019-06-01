import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Employee from '../employee/employee.component';
import FinanceManager from '../finance-manager/finance-manager.component'
import Admin from '../admin/admin.component';
import { User } from '../../models/user';
import { History } from 'history';
import { IState } from '../../reducers';
import { connect } from 'react-redux';

interface IDashboardProps {
  currentUser: User;
  history: History;
}

class Dashboard extends Component<IDashboardProps, any> {

  render() {
    return (
      <div className='dashboard'>
        <BrowserRouter>
          <Switch>
            <Route
              path='/employee' 
              component={Employee}
            />
            <Route 
              path='/finance-manager'
              component={FinanceManager}
            />
            <Route
              path='/admin'
              component={Admin}
            />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser
  }
}

export default connect(mapStateToProps)(Dashboard);