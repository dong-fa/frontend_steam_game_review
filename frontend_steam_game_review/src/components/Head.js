import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../reduex/modules/loginSignUp";
import logo from "../img/logo_steam.png";

const Head = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch;
  const token = localStorage.getItem("token");

  const logout = () => {
    console.log(localStorage.getItem("token"));
    localStorage.removeItem("token");
    console.log(localStorage.getItem("token"));
    navigate(`/`);
  };

  return (
    <GlobalNav>
      <LogoTextContent>
        <LogoImg
          src={logo}
          alt="gasteam"
          onClick={() => {
            navigate(`/`);
          }}
        ></LogoImg>
        <div>STEAM NONO GASTEAM</div>
        <Menu>
          {token ? (
            <>
              <Login onClick={logout}>Logout</Login>
            </>
          ) : (
            <>
              <Login
                onClick={() => {
                  navigate(`/Login`);
                }}
              >
                Login
              </Login>
              <Sign
                onClick={() => {
                  navigate(`/Signup`);
                }}
              >
                Sign
              </Sign>
            </>
          )}
        </Menu>
      </LogoTextContent>
    </GlobalNav>
  );
};

export default Head;

const GlobalNav = styled.header`
  height: 50%;
  height: 104px;

  margin: 0px auto;

  position: relative;

  background: #171a21;
`;

const LogoTextContent = styled.div`
  padding-top: 10px;
  padding-left: 16px;
  padding-right: 16px;

  display: flex;

  justify-content: space-between;
  align-items: center;

  color: #b8b6b4;
  font-size: 20px;
  font-weight: 900;
`;

const LogoImg = styled.img`
  float: left;
  padding-top: 30px;
  margin-left: 40px;
  width: 176px;
  height: 44px;
`;

const Menu = styled.div`
  display: flex;
  position: relative;
  padding-top: 30px;
  margin-right: 40px;
  margin-left: 40px;
  width: 176px;
  height: 44px;

  justify-content: space-around;
`;

const Login = styled.a`
  line-height: 16px;
  float: left;

  text-transform: uppercase;
`;

const Sign = styled.a`
  line-height: 16px;
  float: left;

  color: #b8b6b4;
  text-transform: uppercase;
`;
