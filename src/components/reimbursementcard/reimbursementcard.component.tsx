import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import { epochDateToStringDate, stringDateToEpochDate } from '../../utilities/convert';
import { FullReimbursement, Reimbursement, ReimbursementStatus, ReimbursementType } from '../../models/reimbursement';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { History } from 'history';
import './reimbursementcard.component.css';
import { updateReimbursement } from '../../actions/reimbursement.actions';

interface IReimbursementCardState {
  author: User;
  resolver: User;
}

interface IReimbursementCardProps {
  reimbursement: FullReimbursement;
  users: User[];
  history: History;
  currentUser: User;
  statuses: ReimbursementStatus[];
  types: ReimbursementType[];
  sort: string;
  updateReimbursement: (reimbursement: Reimbursement, type: string, typeId: number, statuses: ReimbursementStatus[], types: ReimbursementType[]) => void;
}

class ReimbursementCard extends Component<IReimbursementCardProps, IReimbursementCardState> {
  constructor(props:IReimbursementCardProps) {
    super(props);
    this.state = {
      author: new User(-1, '', '', '', '', '', new Role(-1, '')),
      resolver: new User(-1, '', '', '', '', '', new Role(-1, ''))
    }
  }

  getUserById(id: number): User {
    for (let user of this.props.users) {
      if (user.userId === id) {
        return user;
      }
    }
  }

  getAuthor = (id: number) => {
    let user = this.getUserById(id);
    this.setState({
      author: user
    });
  }

  getResolver = (id: number) => {
    let user = this.getUserById(id);
    this.setState({
      resolver: user
    });
  }

  setQuickUpdate = async (resolution: number) => {
    const rt = this.props.reimbursement;
    let dateResolved = 0;
    if (resolution === 2) {
      dateResolved = rt.dateResolved;
    } else {
      dateResolved = Date.now();
    }
    let resolver = 0;
    if (resolution === 2) {
      resolver = this.props.currentUser.userId
    } else {
      resolver = rt.resolver;
    }
    let reimbursement = new Reimbursement(rt.reimbursementId, rt.author, rt.amount, rt.dateSubmitted, dateResolved, rt.description, resolver, resolution, rt.type.typeId);
    let typeId: number = 0;
    if (this.props.sort === 'status') {
      if (resolution === 2) {
        typeId = 1;
      } else {
        typeId = 2;
      }
    } else {
      typeId = rt.author;
    }
    this.props.updateReimbursement(reimbursement, this.props.sort, typeId, this.props.statuses, this.props.types);
  }

  checkAccept = (resolverId: number, authorId: number) => {
    if (authorId !== this.props.currentUser.userId && (resolverId === -1 || resolverId === null)) {
      return <button className="btn btn-primary" onClick={() => this.setQuickUpdate(2)}>Take Responsibility</button>;
    }
  }

  checkResolve = (resolverId: number, authorId: number) => {
    if (authorId !== this.props.currentUser.userId && this.props.reimbursement.status.statusId === 2 && resolverId === this.props.currentUser.userId) {
      return <>
        <button className="btn btn-success" onClick={() => this.setQuickUpdate(3)}>Accept</button>
        <button className="btn btn-danger" onClick={() => this.setQuickUpdate(4)}>Deny</button>
      </>
    }
  }

  update = (authorId: number) => {
    if (authorId !== this.props.currentUser.userId && this.props.reimbursement.status.statusId !== 1) {
      return <button className="btn btn-secondary" onClick={() => this.props.history.push(`/dashboard/update-reimbursement/${this.props.reimbursement.reimbursementId}`)}>Edit</button>
    }
  }

  getAuthorName() {
    if (this.state.author) {
      return this.state.author.firstName + ' ' + this.state.author.lastName;
    } else {
      return "Unknown";
    }
  }

  componentDidMount() {
    if (this.props.reimbursement.author) {
      this.getAuthor(this.props.reimbursement.author);
    } else {
      this.setState({
        author: new User(-1, '', '', '', '', '', new Role(-1, ''))
      })
    }
    if (this.props.reimbursement.resolver === null) {
      this.setState({
        resolver: new User(-1, '', '', 'No', 'Resolver', '', new Role(-1, ''))
      });
    } else {
      this.getResolver(this.props.reimbursement.resolver);
    }
  }

  render() {
    return (
      <div className="ReimbursementCard container receipt">
        <Card>
          <CardHeader tag="h4">Receipt from {epochDateToStringDate(this.props.reimbursement.dateSubmitted)}<br />
          by {this.getAuthorName()}</CardHeader>
          <CardBody className='receipt-body'>
            <b>Amount:&nbsp;</b>${this.props.reimbursement.amount.toFixed(2)}<br />
            <b>Type:&nbsp;</b>{this.props.reimbursement.type.type}<br />
            <hr />
            <b>Description:<br /></b>{this.props.reimbursement.description}<br />
            <hr />
            <b>Date Resolved:&nbsp;</b>{this.props.reimbursement.dateResolved >= stringDateToEpochDate('1/1/1971') ? epochDateToStringDate(this.props.reimbursement.dateResolved) : 'Pending'}<br />
            <b>Resolver:&nbsp;</b>{this.state.resolver.firstName + ' ' + this.state.resolver.lastName}
          </CardBody>
          <CardFooter className="text-muted">
            Status: {this.props.reimbursement.status.status}
            <br />
            {this.checkAccept(this.props.reimbursement.resolver, this.props.reimbursement.author)}
            {this.checkResolve(this.props.reimbursement.resolver, this.props.reimbursement.author)}
            {this.update(this.props.reimbursement.author)}
          </CardFooter>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    users: state.user.users,
    currentUser: state.login.currentUser,
    statuses: state.reimbursement.statuses,
    types: state.reimbursement.types
  }
}

const mapDispatchToProps = {
  updateReimbursement: updateReimbursement
}

export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementCard);