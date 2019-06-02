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
import './navbaralt.component.css';
import { Link } from 'react-router-dom';

interface INavbarComponent {
  currentUser: User;
  history: History
}

class NavbarComponent extends React.Component<INavbarComponent, any> {
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

  checkUserStatus = () => {
    if (this.props.currentUser.role.role === 'employee') {
      return (
          <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
              </DropdownItem>
              <DropdownItem>
                Option 2
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Reset
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink href="#" onClick={() => this.goTo('/logout')}>Logout</NavLink>
          </NavItem>
        </Nav>
      );
    } else {
      return (
        <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink><Link to={'/dashboard/' + this.props.currentUser.role.role}>Home</Link></NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Options
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              Option 1
            </DropdownItem>
            <DropdownItem>
              Option 2
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              Reset
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem>
          <NavLink href="#" onClick={() => this.goTo('/logout')}>Logout</NavLink>
        </NavItem>
      </Nav>
      )
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
            {this.checkUserStatus()}
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

export default connect(mapStateToProps)(NavbarComponent);