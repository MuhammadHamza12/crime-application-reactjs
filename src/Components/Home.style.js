import styled from "styled-components";
import colors from "../utils/colors";

const MainContainer = styled.div`
  padding: 20px 100px;
`;
const IntroSection = styled.div`
 
`;
const MainHeadline = styled.div`
display: flex;
justify-content: space-around;
flex-wrap: wrap;
margin-bottom:20px;  
p span {
  font-size: 30px;
  text-decoration: underline;
  text-decoration-color: ${colors.yellow};
  text-decoration-thickness: 5px;
}

img {
  height: 300px;
}
`;
const HowSection = styled.div`
    padding:10px 0px;
img {
    height: 300px;
  }
`;



// re-useable styling
const SpecialText = styled.div`
  span {
    font-size:  ${(props) =>
        props.danger ? '45px' : '30px'};;
    text-decoration: underline;
    text-decoration-color: ${(props) =>
      props.danger ? colors.red : colors.yellow};
    text-decoration-thickness: 5px;
    letter-spacing:2px;
  }
`;
const RowResponsive = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 700px) {
      flex-direction: ${props=> props.directReverse ? 'column-reverse' : 'column'};
      p {
        margin-top:15px;
        min-width:300px;
      }
  }

  img {
    margin-right: ${props=> props.rightImg ? '20px' : '0px'};
    margin-left: ${props=> props.rightImg ? '0px' : '20px'};
  }

  p {
    background-color:${colors.CUSTOM_PRIMARY_COLOR};
    padding:15px;
    border-radius:5px;
    color:${colors.white}
  }


`

export { MainContainer, IntroSection, SpecialText, HowSection, RowResponsive, MainHeadline};
