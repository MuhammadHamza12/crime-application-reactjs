import styled from "styled-components";
import colors from "../utils/colors";

const MainContainer = styled.div`
  padding: 20px 0px;
  .custom-navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    @media (max-width: 700px) {
      flex-direction: column;
    }
    .logoPlusName {
      .icon,
      span {
        font-size: 20px;
      }
    }
  }
`;

const GuestLinkSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  @media (max-width: 700px) {
    flex-direction: column;
  }

  .nav-link {
    text-decoration: none;
  }

  .nav-button {
      min-width: 150px;
      cursor:pointer;
    @media (max-width: 700px) {
      padding: 0px 6px;
      min-width: 200px;
    }
  }
`;

export { MainContainer, GuestLinkSection };
