import React, { Component } from "react";
import ReportImage from "../images/reporter.png";
import graphImage from "../images/graph.png";
import banPlaceImage from "../images/banplace.png";
import safetyImage from "../images/safety.png";
import {
  HowSection,
  IntroSection,
  MainContainer,
  MainHeadline,
  RowResponsive,
  SpecialText,
} from "./Home.style";
import Button from "./atom/Button/Button";
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((t) => ({
//   input: {
//       border: `4px solid ${theme.primary80}`,
//       backgroundColor: `${theme.secondary}`,
//       color: `${theme.tertiary}`,
//       fontFamily: 'var(--primaryFont)',
//       fontWeight: 500,
//       transition: 'border 0.2s ease-in-out',
//       '&:focus': {
//           border: `4px solid ${theme.primary600}`,
//       }}}));

// const classes = useStyles();

class Home extends Component {
  constructor(props) {
    super(props);
  }
  
  redirection = (route) => {
    this.props.history.push(route);
  };
  render() {
    return (
      <MainContainer>
        <IntroSection>
          <MainHeadline>
            <div>
              <SpecialText danger>
                <h1>
                  Did you experience <span>robbed ?</span>
                </h1>
              </SpecialText>
              <SpecialText danger>
                <h2 className="text-dark">
                  victims by any <span>illegal</span> activity ?
                </h2>
              </SpecialText>
              <SpecialText normal>
                <p>
                  Would you like to <span>help others ?</span>
                </p>
              </SpecialText>
            </div>
            <img src={ReportImage} />
          </MainHeadline>
          <div className="d-flex justify-content-center mt-5 mb-5">
            <Button onPress={()=>this.redirection('/login')} className="mr-2">Login</Button>
            <Button onPress={()=>this.redirection('/signup')} >Sign Up</Button>
          </div>
        </IntroSection>

        <HowSection>
          <h2 className="text-center">How we can help ?</h2>
          <div className="container">
            <RowResponsive rightImg>
              <img src={graphImage} />
              {/* <h2>Welcome to our crime mapping application</h2> */}
              {/* <p>A tool designed to help people stay informed about crime in their area and avoid potentially dangerous situations. With this application, users can report incidents such as thefts, assaults, or other illegal activities and view them on a map. The map will also show areas that have been marked as avoided or danger areas based on the reported incidents. By using this application, you can make informed decisions about your safety and take steps to protect yourself and your loved ones. Thank you for using our application to stay informed and stay safe.</p> */}
              <p>
                Users can view statistics about the types of crimes that are
                being reported in different areas. Through graphs or
                visualizations are organized and what they show, such as the
                most common types of crimes in a particular area or the trends
                in crime over time.
              </p>
            </RowResponsive>
          </div>
          <div className="container">
            <RowResponsive directReverse>
              {/* <h2>Welcome to our crime mapping application</h2> */}
              {/* <p>A tool designed to help people stay informed about crime in their area and avoid potentially dangerous situations. With this application, users can report incidents such as thefts, assaults, or other illegal activities and view them on a map. The map will also show areas that have been marked as avoided or danger areas based on the reported incidents. By using this application, you can make informed decisions about your safety and take steps to protect yourself and your loved ones. Thank you for using our application to stay informed and stay safe.</p> */}
              <p>
                This tool designed to help people stay informed about crime in
                their area and avoid potentially dangerous situations. With this
                application, users can report incidents such as thefts,
                assaults, or other illegal activities and view them on a map.
              </p>
              <img src={banPlaceImage} />
            </RowResponsive>
          </div>
          <div className="container">
            <RowResponsive rightImg>
              <img src={safetyImage} />
              {/* <h2>Welcome to our crime mapping application</h2> */}
              {/* <p>A tool designed to help people stay informed about crime in their area and avoid potentially dangerous situations. With this application, users can report incidents such as thefts, assaults, or other illegal activities and view them on a map. The map will also show areas that have been marked as avoided or danger areas based on the reported incidents. By using this application, you can make informed decisions about your safety and take steps to protect yourself and your loved ones. Thank you for using our application to stay informed and stay safe.</p> */}
              <p>
                App can make informed decisions about your safety and take steps
                to protect yourself and your loved ones. Would you like try our
                application to stay informed and stay safe.
              </p>
            </RowResponsive>
          </div>
        </HowSection>
      </MainContainer>
    );
  }
}
export default Home;
