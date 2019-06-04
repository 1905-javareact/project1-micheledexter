import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import { apiClient } from '../../axios/user-api-client';
import { ReimbursementStatus, ReimbursementType, FullReimbursement } from '../../models/reimbursement';
import { fullReimbursement } from '../../utilities/construct';
import { epochDateToStringDate } from '../../utilities/convert';
import { Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import './employee.component.css';

interface IEmployeeProps {
  currentUser: User;
  statuses: ReimbursementStatus[];
  types: ReimbursementType[];
}

interface IEmployeeState{
  reimbursements: FullReimbursement[]
}

class Employee extends Component<IEmployeeProps, IEmployeeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      reimbursements: []
    }
  }

  getMyReimbursements = async () => {
    try {
      const result = await apiClient(`/reimbursements/author/userId/${this.props.currentUser.userId}`);
      let reimbursements = []
      for (let item of result.data) {
        let reimbursement = fullReimbursement(item, this.props.statuses, this.props.types);
        reimbursements.push(reimbursement);
      }
      this.setState({
        reimbursements: reimbursements
      });
    } catch(e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.getMyReimbursements();
  }

  render() {
    return (
      <div className="Employee">
        <h2>Welcome, {this.props.currentUser.firstName} {this.props.currentUser.lastName}!</h2>
        <h3>Here is your current user information</h3>
        <code>Please note that we do not save your password in raw text for security purposes,</code><br />
        <code>so your password will not be viewable here. Thank you for understanding.</code>
        <div className="container">
          <table className="table table-striped">
            <tbody>
              <tr>
                <td><b>Username:</b></td>
                <td>{this.props.currentUser.username}</td>
              </tr>
              <tr>
                <td><b>First Name:</b></td>
                <td>{this.props.currentUser.firstName}</td>
              </tr>
              <tr>
                <td><b>Last Name:</b></td>
                <td>{this.props.currentUser.lastName}</td>
              </tr>
              <tr>
                <td><b>Email Address:</b></td>
                <td>{this.props.currentUser.email}</td>
              </tr>
              <tr>
                <td><b>Role:</b></td>
                <td>{this.props.currentUser.role.role}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container employee-reimbursements">
          <h3>Reimbursements</h3>
          {this.state.reimbursements.map((item) => {
            return (
              <div className="container receipt" key={"r-" + item.reimbursementId}>
                <Card>
                  <CardHeader tag="h4">Receipt from {epochDateToStringDate(item.dateSubmitted)}</CardHeader>
                  <CardBody className='receipt-body'>
                    <b>Amount:&nbsp;</b>${item.amount.toFixed(2)}<br />
                    <b>Type:&nbsp;</b>{item.type.type}<br />
                    <b>Description:<br /></b>{item.description}<br />
                    <b>Date Resolved:&nbsp;</b>{item.dateResolved !== 0 ? epochDateToStringDate(item.dateResolved) : 'Pending'}
                  </CardBody>
                  <CardFooter className="text-muted">
                    Status: {item.status.status}
                  </CardFooter>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser,
    statuses: state.reimbursement.statuses,
    types: state.reimbursement.types
  }
}

const mapDispatchToProps = {
  // imported dispatch props need to be mapped here
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee);