// React imports
import React from "react";
// Bootstrap Imports
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
// Images
import BadgeImg from "./images/8sm_badge.png";

const PageHeader = () => {
  return (
    <div>
      <Navbar variant="dark">
        <Container className="justify-content-start">
          <Navbar.Brand>
            <img src={BadgeImg} alt="8sm badge" width="30" height="30" />
          </Navbar.Brand>
          <Navbar.Text>8SM Market Checker</Navbar.Text>
          <Navbar.Text className="mx-1">v2.0</Navbar.Text>
        </Container>
      </Navbar>
    </div>
  );
};

export default PageHeader;
