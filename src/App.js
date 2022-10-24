import styled from "@emotion/styled";
import { useEffect, useState, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/auth-context";
import { PropertiesProvider } from "./context/properties-context";
import { colors } from "./styles";
import Modal from "./components/Modal";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LoadingWave from "./components/LoadingWave";
import Building from "./assets/images/building.png";
import SignupPage from "./pages/SignupPage";
import NewPropertyForm from "./pages/NewPropertyPage";
import LandlordPage from "./pages/LandlordPage";
import HomeseekerPage from "./pages/HomeSeekerPage";
<<<<<<< HEAD
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { PropertiesProvider } from "./context/properties-context";
import { useAuth } from "./context/auth-context";
import Building from "./assets/images/building.png";
import EditPropertyForm from "./pages/EditPropertyPage";
=======
import EditPropertyForm from "./pages/EditPropertyPage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import PropertiesPage from "./pages/PropertiesPage";
>>>>>>> 9fa970e0f30ddff77637a225fc2ddcaf4a5c03aa

const MainContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const FooterWrapper = styled.div`
  width: 100%;
  bottom: 0;
  position: absolute;
  bottom: -10rem;
`;

const NotFound = styled.div`
  text-align: center;
  margin: 7.5rem;
`;

const NotFoundImage = styled.img`
  max-width: 32.2rem;
  margin: 1.5rem;
`;

const GOOGLE_API_TOKEN = process.env.REACT_APP_GCP_API_KEY;

const addScript = ({ src, id, onLoad }) => {
  const existing = document.getElementById(id);
  if (existing) {
    return existing;
  } else {
    const script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.async = true;
    script.onload = () => {
      if (onLoad) {
        onLoad();
      }
    };
    document.body.appendChild(script);
    return script;
  }
};

const removeScript = ({ id }) => {
  const script = document.getElementById(id);
  if (script) {
    document.body.removeChild(script);
  }
};

removeScript({
  id: "maps-script",
});

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { user, status } = useAuth();
  useEffect(() => {
    const script = addScript({
      src: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_TOKEN}&libraries=places`,
      id: "maps-script",
      onLoad: () => {
        setIsMapLoaded(true);
        console.log("Google Maps script loaded!");
      },
    });
    return () => removeScript({ id: script.id });
  }, []);

  function handleCloseModal(e) {
    if (e.target.dataset.type === "modal") {
      setIsModalOpen(false);
    }
  }

  return (
    <PropertiesProvider>
      <MainContainer id="maincontainer">
        <Fragment>
          {isModalOpen && (
            <Modal onModalClose={handleCloseModal}>
              <LoginForm handleCloseModal={() => setIsModalOpen(false)} />
            </Modal>
          )}
          <NavBar onLoginClick={() => setIsModalOpen(true)} />
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  onLoginClick={() => setIsModalOpen(true)}
                  isMapReady={isMapLoaded}
                />
              }
            />
            <Route path="/properties" element={<PropertiesPage />} />
            {/* For the route property detail page add the id of the property */}
            <Route path="/properties/:id" element={<PropertyDetailPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {user?.role_name === "Landlord" && (
              <Route path="/myproperties" element={<LandlordPage />} />
            )}
            {user?.role_name === "Homeseeker" && (
              <Route path="/saved" element={<HomeseekerPage />} />
            )}
            {user?.role_name === "Landlord" && (
              <Route path="/create" element={<NewPropertyForm />} />
            )}
            {user?.role_name === "Landlord" && (
              <Route path="/editproperty/:id" element={<EditPropertyForm />} />
            )}
<<<<<<< HEAD
=======
            {user && <Route path="/profile" element={<ProfilePage />} />}
>>>>>>> 9fa970e0f30ddff77637a225fc2ddcaf4a5c03aa
            <Route
              path="*"
              element={
                <NotFound>
<<<<<<< HEAD
                  <h1>Building</h1>
                  <NotFoundImage src={Building} alt="building" />
=======
                  {status === "loading" ? (
                    <LoadingWave color={colors.secondary[500]} />
                  ) : (
                    <>
                      <h1>Building</h1>
                      <NotFoundImage src={Building} alt="building" />
                    </>
                  )}
>>>>>>> 9fa970e0f30ddff77637a225fc2ddcaf4a5c03aa
                </NotFound>
              }
            />
          </Routes>
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
        </Fragment>
      </MainContainer>
    </PropertiesProvider>
  );
}

export default App;
