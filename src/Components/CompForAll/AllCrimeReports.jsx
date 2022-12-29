import React, { Component } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import {
  Input,
  ListGroup,
  ListGroupItem,
  Label,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import { bindActionCreators } from "redux";
import * as crimeViewerActions from "../../Actions/crimeReportViewerAction/crimeReportAction";
import {
  Container,
  Alert,
  Card,
  Badge,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import loading from "../../images/loading.gif";
import config from "../../config";
import { countryName } from "../../utils/utils";

const GREY = "#9E9E9E";

const styles = {
  header: {
    // styles go here!
  },
  well: {
    boxShadow: `3px 3px 1px ${GREY}`,
  },
};
class AllCrimeReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      isLoading: true,
      dropdownOpen: false,
      status: "",
      select: null,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      allData: nextProps.allReportData,
    });

    console.log(this.state.allData);
  };

  componentDidMount() {
    this.props.actions
      .getAllUserCrimeReportData(`${config.port}/api/getallusercrimedata`)
      .then((res) => {
        {
          this.setState({
            isLoading: false,
          });
        }
        console.log("response", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  renderComponent = () => {
    if (this.state.isLoading) {
      return (
        <div>
          <div style={{ textAlign: "center" }}>
            <img src={loading} alt="#loader" />
          </div>
        </div>
      );
    } else if (
      this.state.select == null ||
      this.state.select == "Search By Country"
    ) {
      const { allData, select } = this.state;
      console.log(allData.length);
      {
        this.state.select;
      }

      return (
        <div className="container">
          <h1>
            <Badge color="warning">Crime reports</Badge>
          </h1>
          <div>
            <Input
              onChange={this.onChange}
              value={this.state.select || ""}
              type="select"
              name="select"
            >
              <option defaultValue={true}>Search By Country</option>
              {countryName.map((country, index) => (
                <option key={index}>{country}</option>
              ))}
            </Input>
            {this.state.status}
          </div>
          <Row>
            {allData.length == 0 ? (
              <div style={{ width: "100%" }}>
                <Alert color="info">No Record Exist</Alert>
              </div>
            ) : null}

            {allData.map((item, index) => (
              <Col style={{ padding: 40 }} key={index} sm="4">
                <Card style={styles.well} body outline color="secondary">
                  <CardTitle>Crime Report # {index + 1}</CardTitle>
                  <CardText>
                    {" "}
                    <Badge style={{ fontSize: 15 }} color="info">
                      Description:
                    </Badge>
                  </CardText>
                  <CardText>{item.description}</CardText>
                  <CardText>
                    {" "}
                    <Badge style={{ fontSize: 15 }} color="info">
                      Country: {item.country}
                    </Badge>{" "}
                  </CardText>
                  <p style={{ textAlign: "left" }}>
                    <Badge color="secondary">
                      Reported on: {new Date(item.createdOn).toDateString()}
                    </Badge>
                  </p>
                  <Button>{item.adminStatus}</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      );
    }
  };
  render() {
    return <div>{this.renderComponent()}</div>;
  }
}
function mapStateToProps(state) {
  return {
    // userId:state.setuser.users.id,
    allReportData: state.setARRecord,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(crimeViewerActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AllCrimeReports);
