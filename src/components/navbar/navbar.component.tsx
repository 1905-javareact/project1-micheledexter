import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { User } from '../../models/user';
import { History } from 'history';
import Logo from '../../assets/logo.png';
import './navbar.component.css';
import { fetchReimbursementStatuses, fetchReimbursementTypes } from '../../actions/reimbursement.actions';
import { fetchUsers } from '../../actions/user.actions';

interface INavbarComponentProps {
  currentUser: User;
  history: History
  fetchReimbursementStatuses: () => void;
  fetchReimbursementTypes: () => void;
  fetchUsers: () => void;
}

class NavbarComponent extends React.Component<INavbarComponentProps, any> {
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      navContent: <Nav className="ml-auto" navbar></Nav>
    };
  }

  goTo = (loc: string) => {
    this.props.history.push(loc);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  updateReimbursements = () => {
    this.props.fetchReimbursementStatuses();
    this.props.fetchReimbursementTypes();
  }

  updateUsers = () => {
    this.props.fetchUsers();
  }


  componentDidMount() {
    this.updateReimbursements();
    if (['admin', 'finance-manager'].includes(this.props.currentUser.role.role)) {
      this.updateUsers();
    }
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="#" onClick={() => this.goTo('/')}>
            <img className="logo" src={Logo} alt="company logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#" onClick={() => this.goTo('/dashboard/employee')}>Profile</NavLink>
              </NavItem>
              {['admin', 'finance-manager'].includes(this.props.currentUser.role.role) ? 
              <NavItem>
                <NavLink href="#" onClick={() => this.goTo('/dashboard/' + this.props.currentUser.role.role)}>Users</NavLink>
              </NavItem> : <></>}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Actions
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => this.goTo('/dashboard/user-reimbursements')}>
                    View Your Reimbursements
                  </DropdownItem>
                  <DropdownItem onClick={() => this.goTo('/dashboard/submit-reimbursement')}>
                    Submit New Reimbursement
                  </DropdownItem>
                  {['admin', 'finance-manager'].includes(this.props.currentUser.role.role) ? <>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => this.goTo('/dashboard/reimbursements')}>
                    Browse All Reimbursements
                  </DropdownItem> </> : <> </> }
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <NavLink href="#" onClick={() => this.goTo('/logout')}>Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
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
  fetchReimbursementStatuses: fetchReimbursementStatuses,
  fetchReimbursementTypes: fetchReimbursementTypes,
  fetchUsers: fetchUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);