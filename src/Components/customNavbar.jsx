import React, { Component } from "react";
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
  DropdownItem,
  Alert,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faSpinner,
  faArrowAltCircleDown,
  faSignInAlt,
  faSign,
  faHandPaper,
} from "@fortawesome/free-solid-svg-icons";
import * as loginActions from "../Actions/loginActions/loginAction";

import {
  BrowserRouter,
  Route,
  Router,
  Link,
  withRouter,
} from "react-router-dom";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import Button from "./atom/Button/Button";
import { GuestLinkSection, MainContainer } from "./customNavbar.style";
// import './customNavbar.css';
class CustomNavbar extends Component {
  constructor(props) {
    super(props);
    console.log("props: ", this.props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  privateMethod = () => {
    try {
      if (this.props.auth.users.type == "Admin") {
        return (
          <div>
            <div style={{ textAlign: "right" }}>
              <NavItem>
                <Link
                  style={{ color: "#ffff" }}
                  to="/dashboard/ReportManager/AllDetailsCrimeReport"
                >
                  <i className="fa fa-dashboard" aria-hidden="true"></i>
                  Update Reports Status
                </Link>
              </NavItem>
            </div>
          </div>
        );
      }
    } catch (e) {
      console.log("handle error");
    }
  };

  Logout = (e) => {
    e.preventDefault();
    this.props.action.logout();
  };
  render() {
    const { isAuth } = this.props.auth;
    const userLinks = (
      <div style={{ textAlign: "right" }}>
        {this.privateMethod()}
        <NavItem>
          <a href="#" style={{ color: "#fff" }} onClick={this.Logout}>
            <FontAwesomeIcon icon={faSignInAlt} />
            Logout
          </a>
        </NavItem>
      </div>
    );

    const guestLinks = (
      <GuestLinkSection>
        <Link className={"mr-2 nav-link"} to="/openCrimeReports">
          <Button className="nav-button">Crime Reports</Button>
        </Link>
        <Link className='nav-link' to="/openMissingReports">
          <Button className="nav-button">Missing Reports</Button>
        </Link>
        {this.props.location.pathname !== "/" ? (
          <React.Fragment>
            <Link className={"mr-2 nav-link"} to="/signUp">
              <Button className='nav-button' >Sign Up</Button>
            </Link>
            <Link className='nav-link' to="/login">
              <Button className='nav-button' >Log In</Button>
            </Link>
          </React.Fragment>
        ) : null}
      </GuestLinkSection>
    );

    return (
      <MainContainer>
        <div className="container custom-navbar">
          <div className="logoPlusName">
            <FontAwesomeIcon className="icon" icon={faHandPaper} />{" "}
            <span>Crime Report</span>
          </div>
          {isAuth ? userLinks : guestLinks}
        </div>
      </MainContainer>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(loginActions, dispatch),
  };
}
function mapStateToProps(state) {
  debugger;
  return {
    auth: state.setuser,
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomNavbar)
);
