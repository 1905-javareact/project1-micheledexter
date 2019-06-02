import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import { History } from 'history';
import Squirrel from '../../assets/squirrel.png';

interface INavbarProps {
  currentUser: User;
  history: History;
}

class Navbar extends Component<INavbarProps, any> {

  logout = () => {
    this.props.history.push('/logout');
  }

  render() {
    return (
      <div className="Navbar">
        <img className="senor-squirrel" alt="confused squirrel holding an acorn" src={Squirrel} />
        <h1>Dashboard</h1>
        <button className="btn btn-danger" onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser,
  }
}

export default connect(mapStateToProps)(Navbar);