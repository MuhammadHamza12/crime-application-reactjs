import styled from "styled-components";
import colors from "../utils/colors";

const MainContainer = styled.div`
  padding: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  
  
`;

const FormSection = styled.div`
  form {
    min-width: 500px;
    @media (max-width: 700px) {
        min-width: 0;
    }
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.lightGrey};
    padding: 30px;
    border-radius:5px;

    .link {
      padding: 10px;
      text-decoration: none;
      color:${colors.CUSTOM_PRIMARY_COLOR}
    }
  }
  .form-input {
    padding: 20px;
  }
`;

const ValidationSection = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export { MainContainer, FormSection, ValidationSection };
