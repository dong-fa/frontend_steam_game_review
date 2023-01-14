import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Head = () => {
  const navigate = useNavigate();

  return (
    <GlobalNav>
      <LogoTextContent>
        <LogoImg
          onClick={() => {
            navigate(`/`);
          }}
        >
          Logo
        </LogoImg>
        <Menu>
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
`;

const LogoImg = styled.div`
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
  font-size: 14px;
  color: #b8b6b4;
  text-transform: uppercase;
`;

const Sign = styled.a`
  line-height: 16px;
  float: left;
  font-size: 14px;
  color: #b8b6b4;
  text-transform: uppercase;
`;
