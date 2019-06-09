import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import { ReimbursementStatus, ReimbursementType, Reimbursement, FullReimbursement } from '../../models/reimbursement';
import { History } from 'history';
import { updateReimbursement } from '../../actions/reimbursement.actions';
import './update-reimbursement.component.css';
import { epochDateToStringDate } from '../../utilities/convert';
import { checkUserPermission } from '../../utilities/handle';

interface IUpdateReimbursementProps {
  users: User[];
  currentUser: User;
  statuses: ReimbursementStatus[];
  types: ReimbursementType[];
  reimbursements: FullReimbursement[];
  history: History;
  match: {
    params: {
      id: number
    }
  };
  updateReimbursement: (reimbursement: Reimbursement, type: string, typeId: number, statuses: ReimbursementStatus[], types: ReimbursementType[]) => void;
}

interface IUpdateReimbursementState {
  reimbursementId: number;
  author: number;
  amount: number;
  dateSubmitted: number;
  dateResolved: number;
  description: string;
  resolver: number;
  status: number;
  type: number;
}

class UpdateReimbursement extends Component<IUpdateReimbursementProps, IUpdateReimbursementState> {
  constructor(props: IUpdateReimbursementProps) {
    super(props);
    this.state = {
      reimbursementId: 0,
      author: 0,
      amount: 0,
      dateSubmitted: 0,
      dateResolved: 0,
      description: '',
      resolver: 0,
      status: 0,
      type: 0
    }
  }

  update = (event: React.FormEvent) => {
    event.preventDefault();
    let rt = this.state;
    this.props.updateReimbursement(new Reimbursement(rt.reimbursementId, rt.author, rt.amount, rt.dateSubmitted, rt.dateResolved, rt.description, rt.resolver, rt.status, rt.type), 'status', 1, this.props.statuses, this.props.types);
    this.props.history.push('/dashboard/reimbursements');
  }

  componentDidMount() {
    checkUserPermission(this.props.history, this.props.currentUser.role.role, ['admin', 'finance-manager']);
    for (let rt of this.props.reimbursements) {
      if (rt.reimbursementId === +this.props.match.params.id) {
        this.setState({
          reimbursementId: rt.reimbursementId,
          author: rt.author,
          amount: rt.amount,
          dateSubmitted: rt.dateSubmitted,
          dateResolved: rt.dateResolved,
          description: rt.description,
          resolver: rt.resolver,
          status: rt.status.statusId,
          type: rt.type.typeId
        });
      }
    }
  }

  handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/^[0-9]*\.?[0-9]{0,2}$/)) {
      this.setState({
        amount: parseInt(event.target.value)
      });
    }
  }

  handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= 500) {
      this.setState({
        description: event.target.value
      });
    }
  }

  handleResolver = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      resolver: Number.parseInt(event.target.value)
    });
  }

  handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      status: Number.parseInt(event.target.value)
    });
  }

  handleTypes = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      type: Number.parseInt(event.target.value)
    });
  }

  getResolvers = (id: number) => {
    if (!this.state.resolver || this.state.resolver <= 0) return <></>;
    let options = <>
      <label htmlFor="resolver">Resolver:&nbsp;</label>
      <select name="resolver" className="form-control" defaultValue={id + ''} onChange={this.handleResolver}>
        {this.props.users.map(user => ['admin', 'finance-manager'].includes(user.role.role) ? <option key={"re-" + user.userId} value={user.userId}>{user.firstName + " " + user.lastName}</option> : null)}
      </select>
    </>;
    return options;
  }

  getStatuses = (id: number) => {
    if (!this.state.resolver || this.state.resolver <= 0) return <></>;
    let statuses = <>
      <label htmlFor="status">Status:&nbsp;</label>
      <select name="status" className="form-control" defaultValue={id + ''} onChange={this.handleStatus}>
        {this.props.statuses.map(status => <option key={"st-" + status.statusId} value={status.statusId}>{status.status}</option>)}
      </select>
    </>;
    return statuses;
  }

  getTypes = (id: number) => {
    if (!this.state.resolver || this.state.resolver <= 0) return <></>;
    let types = <>
      <label htmlFor="type">Type:&nbsp;</label>
      <select name="type" className="form-control" defaultValue={id + ''} onChange={this.handleTypes}>
        {this.props.types.map(type => <option key={"ty-" + type.typeId} value={type.typeId}>{type.type}</option>)}
      </select>
    </>;
    return types;
  }

  getName = (id: number) => {
    for (let user of this.props.users) {
      if (id === user.userId) {
        return user.firstName + " " + user.lastName;
      }
    }
  }

  render() {
    return (
      <div className="UpdateReimbursement">
        <h1>Update Reimbursement</h1>
        <hr />
        <div className="container">
          <form className="form-group" onSubmit={this.update}>
            <div className="form-chunks">
              <div className="form-chunk">
                <h3>{this.getName(this.state.author)} submitted receipt on {epochDateToStringDate(this.state.dateSubmitted)}</h3>
              </div>
              <div className="form-chunk">
                <label htmlFor="amount">Amount:&nbsp;</label>
                <input name="amount" className="form-control" type="text" value={isNaN(this.state.amount) ? '' : this.state.amount} onChange={this.handleAmount} /><br />
                {this.getTypes(this.state.type)}<br />
              </div>
              <div className="form-chunk">
                <label htmlFor="description">Description:</label><br />
                <textarea name="description" className="form-control" value={this.state.description} onChange={this.handleDescription} /><br />
                <small>{this.state.description.length + ' / 500'}</small><br />
              </div>
              <div className="form-chunk">
                {this.getResolvers(this.state.resolver)}
                {this.getStatuses(this.state.status)}<br />
              </div>
            </div>
            <button className="btn btn-secondary" onClick={() => this.props.history.goBack()}>Cancel</button>
            <button className="btn btn-primary" type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    users: state.user.users,
    currentUser: state.login.currentUser,
    statuses: state.reimbursement.statuses,
    types: state.reimbursement.types,
    reimbursements: state.reimbursement.reimbursements
  }
}

const mapDispatchToProps = {
  updateReimbursement: updateReimbursement
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateReimbursement);