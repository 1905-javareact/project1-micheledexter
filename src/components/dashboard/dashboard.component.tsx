import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Employee from '../employee/employee.component';
import FinanceManager from '../finance-manager/finance-manager.component'
import Admin from '../admin/admin.component';
import { User } from '../../models/user';
import { History } from 'history';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import NavbaraltComponent from '../navbar/navbaralt.component';
import { EditUser } from '../edituser/edituser.component';

interface IDashboardProps {
  currentUser: User;
  history: History;
}

class Dashboard extends Component<IDashboardProps, any> {

  render() {
    return (
      <div className='dashboard'>
        <NavbaraltComponent history={this.props.history}/>
          <Switch>
            <Route
              path='/dashboard/employee' 
              component={Employee}
            />
            <Route 
              path='/dashboard/finance-manager'
              component={FinanceManager}
            />
            <Route
              path='/dashboard/admin'
              component={Admin}
            />
            <Route
              path="/dashboard/edituser/:id"
              component={EditUser}
            />
          </Switch>
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