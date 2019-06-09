import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Employee from '../employee/employee.component';
import FinanceManager from '../finance-manager/finance-manager.component'
import Admin from '../admin/admin.component';
import { User } from '../../models/user';
import { History } from 'history';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import NavbarComponent from '../navbar/navbar.component';
import EditUser from '../edituser/edituser.component';
import ViewUser from '../viewuser/viewuser.component';
import ViewReimbursements from '../viewreimbursements/viewreimbursements.component';
import UserReimbursements from '../user-reimbursements/user-reimbursements.component';
import UpdateReimbursement from '../update-reimbursement/update-reimbursement.component';
import SubmitReimbursement from '../submit-reimbursement/submit-reimbursement.component';

interface IDashboardProps {
  currentUser: User;
  history: History;
}

class Dashboard extends Component<IDashboardProps, any> {

  render() {
    return (
      <div className='dashboard'>
        <NavbarComponent history={this.props.history}/>
        <Route
          exact path='/dashboard' 
          component={Employee}
        />
        <Route
          path='/dashboard/employee'
          render={() => <Redirect to='/dashboard' />}
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
          path='/dashboard/user-reimbursements'
          component={UserReimbursements}
        />
        <Route
          path="/dashboard/edituser/:id"
          component={EditUser}
        />
        <Route
          path="/dashboard/viewuser/:id"
          component={ViewUser}
        />
        <Route
          exact path="/dashboard/reimbursements"
          component={ViewReimbursements}
        />
        <Route
          path="/dashboard/update-reimbursement/:id"
          component={UpdateReimbursement}
        />
        <Route
          path="/dashboard/submit-reimbursement"
          component={SubmitReimbursement}
        />
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