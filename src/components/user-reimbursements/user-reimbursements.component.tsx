import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import { epochDateToStringDate } from '../../utilities/convert';
import './user-reimbursements.component.css';
import { apiClient } from '../../axios/user-api-client';
import { fullReimbursement } from '../../utilities/construct';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { ReimbursementStatus, ReimbursementType } from '../../models/reimbursement';
import { User } from '../../models/user';

interface IUserReimbursementsProps {
  currentUser: User;
  statuses: ReimbursementStatus[];
  types: ReimbursementType[];
}

class UserReimbursements extends Component<IUserReimbursementsProps, any> {
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
      <div className="UserReimbursements">
        <div className="container employee-reimbursements">
          <h3>Reimbursements</h3><hr />
          {this.state.reimbursements.map((item) => {
            return (
              <div className="container receipt" key={"r-" + item.reimbursementId}>
                <Card>
                  <CardHeader tag="h4">Receipt from {epochDateToStringDate(item.dateSubmitted)}</CardHeader>
                  <CardBody className='receipt-body'>
                    <b>Amount:&nbsp;</b>${item.amount.toFixed(2)}<br />
                    <b>Type:&nbsp;</b>{item.type.type}<br />
                    <hr />
                    <b>Description:<br /></b>{item.description}<br />
                    <hr />
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
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser,
    statuses: state.reimbursement.statuses,
    types: state.reimbursement.types
  }
}

export default connect(mapStateToProps)(UserReimbursements);