import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import { History } from 'history';
import { FullReimbursement, ReimbursementStatus, ReimbursementType } from '../../models/reimbursement';
import ReimbursementCard from '../reimbursementcard/reimbursementcard.component';
import { checkUserPermission } from '../../utilities/handle';
import { fetchReimbursementsByStatusId, fetchReimbursementsByAuthorId } from '../../actions/reimbursement.actions';
import { epochDateToStringDate } from '../../utilities/convert';
import './viewreimbursements.component.css';

interface IViewReimbursementsState {
  dropdown: JSX.Element;
  sort: string;
  search: string;
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
      dropdown: <select className="form-control"></select>,
      sort: 'status',
      search: '',
    }
  }

  getNameById = (id: number) => {
    if (id === null || id <= 0) return "No Resolver";
    for (let user of this.props.users) {
      if (id === user.userId) {
        return user.firstName + " " + user.lastName;
      }
    }
  }

  getResolveDate = (date: number) => {
    if (date < 31554000000) return 'Pending';
    return epochDateToStringDate(date);
  }

  setStatusDropdown = () => {
    let dropdown = <select className="form-control" defaultValue="0">
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
    let dropdown = <select className="form-control" defaultValue="0">
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/^[\s0-9a-zA-Z_!@#%&<>:;'"=,{}$*^.?()[\]\\|/-]*$/)) {
      this.setState({
        search: event.target.value
      });
    }
  }

  filter = (input: string): FullReimbursement[] => {
    let newInput = '';
    for (let char of input) {
      if (char.match(/[\s0-9a-zA-Z_!@#%&<>:;'"=,{}-]/)) {
        newInput += char;
      } else if (char.match(/[$*^.?()[\]\\|/]/)) {
        newInput += '\\' + char;
      }
    }
    const results = this.props.reimbursements.filter(rt => {
      if (newInput === '') return rt;
      let re = '.*' + newInput.toLowerCase() + '.*';
      let regexp = new RegExp(re);
      return (('$' + rt.amount.toFixed(2)).match(regexp) || 
        this.getNameById(rt.author).toLowerCase().match(regexp) ||
        this.getResolveDate(rt.dateResolved).toLowerCase().match(regexp) ||
        epochDateToStringDate(rt.dateSubmitted).toLowerCase().match(regexp) ||
        rt.description.toLowerCase().match(regexp) ||
        this.getNameById(rt.resolver).toLowerCase().match(regexp) ||
        rt.status.status.toLowerCase().match(regexp) ||
        rt.type.type.toLowerCase().match(regexp));
    });
    return results;
  }

  componentDidMount() {
    checkUserPermission(this.props.history, this.props.currentUser.role.role, ['admin', 'finance-manager']);
    this.props.fetchReimbursementsByStatusId(1, this.props.statuses, this.props.types);
    this.setStatusDropdown();
  }

  render() {
    return (
      <div className="ViewReimbursements">
        <div className="form-group reimbursement-select">
          <select className="form-control" defaultValue="1">
            <option value="1" onClick={this.setStatusDropdown}>Search by status</option>
            <option value="2" onClick={this.setAuthorDropdown}>Search by author</option>
          </select>
          &nbsp;
          {this.state.dropdown}
          &nbsp;
          <input className="form-control" value={this.state.search} onChange={this.handleChange} placeholder="Filter results" />
        </div>
        {this.filter(this.state.search).map((item) => <ReimbursementCard key={"reimbursement" + item.reimbursementId} history = {this.props.history} reimbursement={item} sort={this.state.sort} />)}
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