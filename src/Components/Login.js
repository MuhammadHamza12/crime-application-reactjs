import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Container,
  Col,
  Form,
  FormGroup,
  Alert,
  Label,
  Input,
  FormText,
  Badge,
} from "reactstrap";
import validateInputlogin from "../validator/login";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { connect } from "react-redux";
import * as keys from "../config";
import { bindActionCreators } from "redux";
import * as loginActions from "../Actions/loginActions/loginAction";
import * as flashActions from "../Actions/flashmessageAction/flashmessage";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { FormSection, MainContainer, ValidationSection } from "./Login.style";
import CustomInput from "./atom/Input/Input";
import Button from "./atom/Button/Button";
// import { bindActionCreators } from 'C:/Users/Muhammad Hamza/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-redux/node_modules/redux';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: "",
      password: "",
      isLoading: false,
      errors: {},
      checkError: false,
    };
  }
  isValid = () => {
    const { errors, isValid } = validateInputlogin(this.state);
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  };
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true, checkError: false });
      try {
        this.props.action.Login(this.state).then(
          (res) => {
            debugger;
            this.props.action_1.flashMessage({
              type: "loginsuccess",
              text: "You have successfully login",
            });
            this.props.history.push("/dashboard/Profile");
            console.log(res);
          },
          (error) => {
            debugger;
            this.setState({
              errors: error.response.data.errors,
              isLoading: false,
              checkError: true,
            });
            console.log(error.response.data.errors.form);
          }
        );
      } catch (e) {
        console.log("connection error", e);
      }
    }
  };
  passResetSuccess = () => {
    if (
      typeof this.props.flashtxt !== "undefined" &&
      this.props.flashtype == "resetSuccess"
    ) {
      return (
        <div>
          <Alert color="info">{this.props.flashtxt}</Alert>
        </div>
      );
    }
  };
  loginError = () => {
    debugger;
    if (
      !this.props.auth &&
      typeof this.props.flashtxt !== "undefined" &&
      this.props.flashtype == "autherror"
    ) {
      return (
        <div>
          <Alert color="danger">{this.props.flashtxt}</Alert>
        </div>
      );
    }
  };
  displayError = (error) => {
    if (this.state.checkError) {
      debugger;
      return (
        <div>
          <Alert color="danger">
            {typeof error.form !== "undefined" && this.state.checkError
              ? `${error.form}`
              : "please fill the form properly."}
          </Alert>
        </div>
      );
    }
  };
  responseFacebook = (response) => {
    console.log(response);
    const { email, id, name } = response;
    const facebookData = {
      email,
      id,
      name,
      picUrl: response.picture.data.url,
    };
    this.props.action
      .commonLogin(`${config.port}/auth/authFacebook`, facebookData)
      .then(
        (success) => {
          this.props.history.push("/dashboard/Profile");
          console.log("user will going to save");
        },
        (error) => {
          console.log("error occur", error);
        }
      );
  };
  responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
    const googleUserData = response.profileObj;
    this.props.action.googleLogin(googleUserData).then(
      (sucess) => {
        this.props.history.push("/dashboard/Profile");
        console.log("user going to login", sucess);
      },
      (error) => {
        console.log("error occur", error);
      }
    );
  };

  passforget = (e) => {
    e.preventDefault();
    console.log("working");
  };
  resetAccessError = () => {
    if (
      typeof this.props.flashtxt !== "undefined" &&
      this.props.flashtype == "expireResetOnWill"
    ) {
      return (
        <div>
          <Alert color="danger">{this.props.flashtxt}</Alert>
        </div>
      );
    }
  };
  auth = (e) => {
    e.preventDefault();
    axios
      .get(`${config.port}/auth/google`)
      .then((res) => {
        console.log(res);
        const url = res.request.responseURL;
        // console.log('url'+url)
        // window.open(url,"_self");
        window.opener.open(url, "msgWindow", "width=200,height=10");

        console.log(res.request.responseURL);
      })
      .catch((err) => console.log("error occur" + err));
  };
  render() {
    const { identifier, password, isLoading, errors } = this.state;
    return (
      <MainContainer>
       
        <FormSection>
        <h1>
          <Badge color="warning">Login</Badge>
        </h1>
          <form onSubmit={this.handleSubmit}>
        <ValidationSection>
        {this.resetAccessError()}
        {this.passResetSuccess()}
        {this.displayError(errors)}
        </ValidationSection>
            <Label sm={4} for="exampleEmail">
              Email:
            </Label>
            <CustomInput
              className='form-input'
              type={"email"}
              onHandleChange={this.onChange}
              value={identifier}
              error={errors.identifier}
              name="identifier"
              placeholder="Enter your email"
              />
            {errors.identifier && (
              <span
              style={{ color: "#ff0000" }}
              >{`* ${errors.identifier}`}</span>
              )}
            <Label sm={4} for="Password">
              Password
            </Label>
            <CustomInput
              type="password"
              name="password"
              onHandleChange={this.onChange}
              error={errors.password}
              value={password}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span style={{ color: "#ff0000" }}>{`* ${errors.password}`}</span>
            )}
            <Button isLoading={isLoading} type="submit">
              Login
            </Button>
            <span className="link" >
              <Link className='link' to="/password_forget">Forget password?</Link>
            </span>
          </form>
        </FormSection>
      </MainContainer>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    action_1: bindActionCreators(flashActions, dispatch),
    action: bindActionCreators(loginActions, dispatch),
  };
}
function mapStateToProps(state) {
  debugger;
  return {
    auth: state.setuser.isAuth,
    flashtxt: state.flashmsg.text,
    flashtype: state.flashmsg.type,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
