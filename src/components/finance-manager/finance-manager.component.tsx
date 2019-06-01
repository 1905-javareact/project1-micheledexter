import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';

interface IFinanceManagerProps {
}

class FinanceManager extends Component<IFinanceManagerProps, any> {
  render() {
    return (
      <div className="FinanceManager">
        Component
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    currentUser: state.login.currentUser
  }
}

const mapDispatchToProps = {
  // imported dispatch props need to be mapped here
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceManager);