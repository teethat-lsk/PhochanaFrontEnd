import React from "react";
import ButtonLink from "../components/ButtonLink";
import Logo from "../components/Logo";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">
      <div className="logo_layout">
        <Logo h="200px" w="200px" />
      </div>
      <div className="home_button_zone">
        <ButtonLink to="/login" height="60px">
          Login
        </ButtonLink>
        <ButtonLink to="/agreement" height="60px">
          Register
        </ButtonLink>
      </div>
    </div>
  );
}

export default Home;
