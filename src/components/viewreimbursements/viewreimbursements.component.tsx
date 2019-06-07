import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import { History } from 'history';
import { FullReimbursement, ReimbursementStatus, ReimbursementType } from '../../models/reimbursement';
import ReimbursementCard from '../reimbursementcard/reimbursementcard.component';
import { checkUserPermission } from '../../utilities/handle';
import { fetchReimbursementsByStatusId, fetchReimbursementsByAuthorId } from '../../actions/reimbursement.actions';

interface IViewReimbursementsState {
  dropdown: JSX.Element;
  sort: string;
}

interface IViewReimbursementsProps {
  currentUser: User;
  history: History;
  statuses: ReimbursementStatus[];
  types: ReimbursementType[];
  users: User[];
  reimbursements: FullReimbursement[];
  fetchReimbursementsByStatusId: (id: number, statuses: ReimbursementStatus[], types: ReimbursementType[]) => void;
  fetchReimbursementsByAuthorId: (id: number, statuses: ReimbursementStatus[], types: ReimbursementType[]) => void;
}

class ViewReimbursements extends Component<IViewReimbursementsProps, IViewReimbursementsState> {
  constructor(props: IViewReimbursementsProps) {
    super(props);
    this.state = {
      dropdown: <select></select>,
      sort: 'status'
    }
  }

  setStatusDropdown = () => {
    let dropdown = <select defaultValue="0">
      <option value="0">-- Select a status --</option>
      {this.props.statuses.map((status) => {
        return <option key={"status-" + status.statusId} value={status.statusId} onClick={() => this.props.fetchReimbursementsByStatusId(status.statusId, this.props.statuses, this.props.types)}>{status.status}</option>
      })}
    </select>;
    this.setState({
      dropdown,
      sort: 'status'
    });
  }

  setAuthorDropdown = () => {
    let dropdown = <select defaultValue="0">
      <option value="0">-- Select an author --</option>
      {this.props.users.map((user) => {
        return <option key={"author-" + user.userId} value={user.userId} onClick={() => this.props.fetchReimbursementsByAuthorId(user.userId, this.props.statuses, this.props.types)}>{user.firstName + " " + user.lastName}</option>
      })}
    </select>;
    this.setState({
      dropdown,
      sort: 'author'
    });
  }

  componentDidMount() {
    checkUserPermission(this.props.history, this.props.currentUser.role.role, ['admin', 'finance-manager']);
    this.props.fetchReimbursementsByStatusId(1, this.props.statuses, this.props.types);
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
        {this.props.reimbursements.map((item) => <ReimbursementCard key={"reimbursement" + item.reimbursementId} history = {this.props.history} reimbursement={item} sort={this.state.sort} />)}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser,
    statuses: state.reimbursement.statuses,
    types: state.reimbursement.types,
    users: state.user.users,
    reimbursements: state.reimbursement.reimbursements
  }
}

const mapDispatchToProps = {
  fetchReimbursementsByStatusId: fetchReimbursementsByStatusId,
  fetchReimbursementsByAuthorId: fetchReimbursementsByAuthorId
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewReimbursements);