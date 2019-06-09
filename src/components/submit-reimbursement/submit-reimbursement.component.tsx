import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import { ReimbursementStatus, ReimbursementType, Reimbursement } from '../../models/reimbursement';
import { apiClient } from '../../axios/user-api-client';
import { History } from 'history';
import './submit-reimbursement.component.css';

interface ISubmitReimbursementProps {
  currentUser: User;
  statuses: ReimbursementStatus[];
  types: ReimbursementType[];
  history: History;
}

interface ISubmitReimbursementState {
  amount: number;
  description: string;
  type: number;
}

class SubmitReimbursement extends Component<ISubmitReimbursementProps, ISubmitReimbursementState> {
  constructor(props: ISubmitReimbursementProps) {
    super(props);
    this.state = {
      amount: 0,
      description: '',
      type: 0
    }
  }

  handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(/^[0-9]*\.?[0-9]{0,2}$/)) {
      this.setState({
        amount: parseFloat(event.target.value)
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

  handleTypes = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      type: Number.parseInt(event.target.value)
    });
  }

  getTypes = () => {
    return <>
      <label htmlFor="type">Type:&nbsp;</label>
      <select name="type" className="form-control" defaultValue="5" onChange={this.handleTypes}>
        {this.props.types.map(type => <option key={"ty-" + type.typeId} value={type.typeId}>{type.type}</option>)}
      </select>
    </>;
  }

  sendReimbursement = async (reimbursement: Reimbursement) => {
    try {
      let response = await apiClient.post('/reimbursements', reimbursement);
      if (response.status === 200) {
        this.props.history.push(['admin', 'finance-manager'].includes(this.props.currentUser.role.role) ? `/dashboard/${this.props.currentUser.role.role}` : '/dashboard');
      }
    } catch(e) {
      console.log(`Something went wrong: ${e}`);
    }
  }

  submit = (event: React.FormEvent) => {
    event.preventDefault();
    let newRt = new Reimbursement(0, this.props.currentUser.userId, this.state.amount, Date.now(), 0, this.state.description, null, 1, this.state.type);
    this.sendReimbursement(newRt);
  }

  render() {
    return (
      <div className="SubmitReimbursement">
        <h1>Submit Reimbursement</h1>
        <div className="container">
          <form className="form-group" onSubmit={this.submit}>
            <div className="form-chunks">
              <div className="form-chunk">
                <label htmlFor="amount">Amount:&nbsp;</label>
                <input name="amount" className="form-control" type="text" value={isNaN(this.state.amount) ? '' : this.state.amount} onChange={this.handleAmount} /><br />
                {this.getTypes()}<br />
              </div>
              <div className="form-chunk">
                <label htmlFor="description">Description:</label><br />
                <textarea name="description" className="form-control" value={this.state.description} onChange={this.handleDescription} /><br />
                <small>{this.state.description.length + ' / 500'}</small><br />
              </div>
              <button className="btn btn-primary" type="submit">Submit</button>
            </div>
          </form>
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

export default connect(mapStateToProps)(SubmitReimbursement);