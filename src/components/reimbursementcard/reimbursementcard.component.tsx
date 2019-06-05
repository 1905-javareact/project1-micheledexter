import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import { epochDateToStringDate } from '../../utilities/convert';
import { FullReimbursement } from '../../models/reimbursement';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { IState } from '../../reducers';
import { connect } from 'react-redux';

interface IReimbursementCardState {
  author: User;
  resolver: User;
}

interface IReimbursementCardProps {
  reimbursement: FullReimbursement;
  users: User[];
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

  componentDidMount() {
    this.getAuthor(this.props.reimbursement.author);
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
      <div className="ReimbursementCard">
        <Card>
          <CardHeader tag="h4">Receipt from {epochDateToStringDate(this.props.reimbursement.dateSubmitted)}<br />
          by {this.state.author.firstName + ' ' + this.state.author.lastName}</CardHeader>
          <CardBody className='receipt-body'>
            <b>Amount:&nbsp;</b>${this.props.reimbursement.amount.toFixed(2)}<br />
            <b>Type:&nbsp;</b>{this.props.reimbursement.type.type}<br />
            <b>Description:<br /></b>{this.props.reimbursement.description}<br />
            <b>Date Resolved:&nbsp;</b>{this.props.reimbursement.dateResolved !== 0 ? epochDateToStringDate(this.props.reimbursement.dateResolved) : 'Pending'}<br />
            <b>Resolver:&nbsp;</b>{this.state.resolver.firstName + ' ' + this.state.resolver.lastName}
          </CardBody>
          <CardFooter className="text-muted">
            Status: {this.props.reimbursement.status.status}
          </CardFooter>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    users: state.user.users
  }
}

export default connect(mapStateToProps)(ReimbursementCard);