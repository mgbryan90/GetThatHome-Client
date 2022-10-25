import styled from "@emotion/styled";
import IconHome from "../assets/icons/LogoHome.png";
import { fonts, typography } from "../styles/typography";
import { boxShadow } from "../styles/utils";
import HomeSeekerLayout from "./HomeSeekerLayout";
import LandLordLayout from "./LandLordLayout";
import UnAuthLayout from "./UnAuthLayout";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const NavBarContainer = styled.div`
  position: relative;
  ${boxShadow[1]};
  z-index: 1;
`;

const ContainerNavBar = styled.div`
  font-family: ${fonts.secondary};
  ${typography.button};
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  gap: 0.625rem;
  justify-content: space-between;
  align-items: center;
`;

function NavBar({ onLoginClick }) {
  // const dummyUser = {
  //   id: 1,
  //   name: "John Doe",
  //   email: "johndoe@gmail.com",
  //   avatar: "https://randomuser.me/api/portraits/m/1.jpg",
  //   role: "Homeseeker",
  // };

  const { user } = useAuth();
  console.log(user);

  function deciderFunction() {
    if (user) {
      if (user.role_name === "Homeseeker") {
        return <HomeSeekerLayout />;
      } else if (user.role_name === "Landlord") {
        return <LandLordLayout />;
      }
    } else {
      return <UnAuthLayout onLoginClick={onLoginClick} />;
    }
  }

  return (
    <NavBarContainer>
      <ContainerNavBar>
        <NavLink to="/">
          <img src={IconHome} alt="Logo Home" />
        </NavLink>
        {deciderFunction()}
      </ContainerNavBar>
    </NavBarContainer>
  );
}

export default NavBar;
