import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import { History } from 'history';
import { apiClient } from '../../axios/user-api-client';
import { FullReimbursement, Reimbursement, ReimbursementStatus, ReimbursementType } from '../../models/reimbursement';
import { fullReimbursement } from '../../utilities/construct';
import ReimbursementCard from '../reimbursementcard/reimbursementcard.component';
import { checkUserPermission } from '../../utilities/handle';

interface IViewReimbursementsState {
  reimbursements: FullReimbursement[];
  dropdown: JSX.Element;
}

interface IViewReimbursementsProps {
  currentUser: User;
  history: History;
  statuses: ReimbursementStatus[];
  types: ReimbursementType[];
  users: User[];
}

class ViewReimbursements extends Component<IViewReimbursementsProps, IViewReimbursementsState> {
  constructor(props: IViewReimbursementsProps) {
    super(props);
    this.state = {
      reimbursements: [],
      dropdown: <select></select>
    }
  }

  getReimbursementsByStatusId = (id: number) => {
    return this.getReimbursements(`/reimbursements/status/${id}`);
  }

  getReimbursementsByAuthorId = (id: number) => {
    return this.getReimbursements(`/reimbursements/author/userId/${id}`);
  }

  getReimbursements = async (endpoint: string) => {
    let response = await apiClient(endpoint);
    let rements: FullReimbursement[] = [];
    let raw: Reimbursement[] = response.data;
    for (let item of raw) {
      rements.push(fullReimbursement(item,this.props.statuses, this.props.types));
    }
    this.setState({
      reimbursements: rements
    });
  }

  setStatusDropdown = () => {
    let dropdown = <select defaultValue="0">
      <option value="0">-- Select a status --</option>
      {this.props.statuses.map((status) => {
        return <option key={"status-" + status.statusId} value={status.statusId} onClick={() => this.getReimbursementsByStatusId(status.statusId)}>{status.status}</option>
      })}
    </select>;
    this.setState({dropdown});
  }

  setAuthorDropdown = () => {
    let dropdown = <select defaultValue="0">
      <option value="0">-- Select an author --</option>
      {this.props.users.map((user) => {
        return <option key={"author-" + user.userId} value={user.userId} onClick={() => this.getReimbursementsByAuthorId(user.userId)}>{user.firstName + " " + user.lastName}</option>
      })}
    </select>;
    this.setState({dropdown});
  }

  componentDidMount() {
    checkUserPermission(this.props.history, this.props.currentUser.role.role, ['admin', 'finance-manager']);
    this.getReimbursementsByStatusId(1);
    this.setStatusDropdown();
  }

  render() {
    return (
      <div className="ViewReimbursements">
        <div className="reimbursement-select">
          <select defaultValue="1">
            <option value="1" onClick={this.setStatusDropdown}>Search by status</option>
            <option value="2" onClick={this.setAuthorDropdown}>Search by author</option>
          </select>
          &nbsp;
          {this.state.dropdown}
        </div>
        {this.state.reimbursements.map((item) => <ReimbursementCard key={"reimbursement" + item.reimbursementId} reimbursement={item} />)}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser,
    statuses: state.reimbursement.statuses,
    types: state.reimbursement.types,
    users: state.user.users
  }
}

const mapDispatchToProps = {
  // imported dispatch props need to be mapped here
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewReimbursements);