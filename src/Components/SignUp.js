import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Alert, Badge, Input, Label
} from "reactstrap";
import { bindActionCreators } from "redux";
import * as flashmsgAction from "../Actions/flashmessageAction/flashmessage";
import * as loginActions from "../Actions/loginActions/loginAction";
import * as signupAction from "../Actions/signupActions/signupActions";
import config from "../config";
import validateInput from "../validator/signup";
import Button from "./atom/Button/Button";
import CustomInput from "./atom/Input/Input";
import { FormSection, MainContainer } from "./SignUp.style";
import {Link} from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      pasconfirm: "",
      errors: {},
      checkError: false,
      isLoading: false,
    };
  }
  isValid = () => {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  };
  handleSubmit = (event) => {
    event.preventDefault();

    if (this.isValid()) {
      this.setState({ error: {}, isLoading: true });
      const userDetails = this.state;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ bodyData: userDetails }),
        url: `${config.port}/api/users`,
      };
      axios(options).then(
        (response) => {
          console.log(response);
          // console.log("coming resp: "+response.data);

          if (response.data.data.name && response.data.data.message) {
            console.log("user is not unique");
            this.props.history.push("/signUp");
            this.setState({
              isLoading: false,
              checkError: true,
            });
          } else {
            console.log("wroking");

            const userOBJ = {
              username: response.data.data.username,
              email: response.data.data.email,
              id: response.data.data._id,
            };

            this.props.actions.signin(response.data.data);

            this.setState({
              checkError: false,
            });
            this.props.actions.signUpSaveToken(userOBJ).then((res) => {
              this.props.actions_1.flashMessage({
                type: "loginsuccess",
                text: "you have successfully login!",
              });
              this.props.history.push("/dashboard");
              console.log(res);
            });
          }
        },
        (error) => {
          this.setState({ errors: error.response.data, isLoading: false });
        }
      );
    }
  };
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  //Autentication hanlder Phase
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
          this.props.actions_1.flashMessage({
            type: "loginsuccess",
            text: "you have successfully login!",
          });
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
        this.props.actions_1.flashMessage({
          type: "loginsuccess",
          text: "you have successfully login!",
        });
        this.props.history.push("/dashboard/Profile");
        console.log("user going to login", sucess);
      },
      (error) => {
        console.log("error occur", error);
      }
    );
  };

  //end Authentication phase

  loginError = () => {
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
  displayError = (Errormsg) => {
    if (this.state.checkError) {
      return (
        <div>
          <Alert color="danger">{Errormsg}</Alert>
        </div>
      );
    }
  };
  render() {
    const { errors } = this.state;
    return (
      <MainContainer>
        {this.displayError("Username and Email must be unique")}
        {this.loginError()}
        <FormSection>
        <h1>
          <Badge color="warning">Sign Up</Badge>
        </h1>
          <form onSubmit={this.handleSubmit}>
            <Label sm={4} for="exampleUsername">
              Username:
            </Label>

            <CustomInput
              type="text"
              value={this.state.username}
              name="username"
              onHandleChange={this.onChange}
              placeholder="Enter-Username"
            />

            {errors.username && (
              <span style={{ color: "#ff0000" }}>{`* ${errors.username}`}</span>
            )}
            <Label sm={4} for="exampleEmail">
              Email:
            </Label>
            <CustomInput
              type="email"
              value={this.state.email}
              name="email"
              id="email"
              onHandleChange={this.onChange}
              placeholder="Enter-Email"
            />
            {errors.email && (
              <span style={{ color: "#ff0000" }}>{`* ${errors.email}`}</span>
            )}

            <Label className="has-error" sm={4} for="Password">
              Password
            </Label>
            <CustomInput
              type="password"
              value={this.state.password}
              name="password"
              onHandleChange={this.onChange}
              id="sPassword"
              placeholder="Enter-Password"
            />
            {errors.password && (
              <span style={{ color: "#ff0000" }}>{`* ${errors.password}`}</span>
            )}

            <Label sm={8} for="Password">
              {" "}
              Confirmation-Password
            </Label>
            <CustomInput
              type="password"
              name="pasconfirm"
              value={this.state.pasconfirm}
              onHandleChange={this.onChange}
              id="cPassword"
              placeholder="Confirmation-Password"
            />
            {errors.pasconfirm && (
              <span
                style={{ color: "#ff0000" }}
              >{`* ${errors.pasconfirm}`}</span>
            )}

            <Button isLoading={this.state.isLoading} type="submit">
              Submit
            </Button>
          <p>Already have an account ? 

          <Link className='link' to="/login">Log In</Link>

          </p>
          </form>
        </FormSection>
      </MainContainer>
    );
  }
}
function mapStateToProps(state) {
  return {
    errors: state.signup,
    auth: state.setuser.isAuth,
    flashtxt: state.flashmsg.text,
    flashtype: state.flashmsg.type,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions_1: bindActionCreators(flashmsgAction, dispatch),
    actions: bindActionCreators(signupAction, dispatch),
    action: bindActionCreators(loginActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
