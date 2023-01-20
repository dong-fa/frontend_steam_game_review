import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <StLayout>{children}</StLayout>;
};

export default Layout;

const StLayout = styled.div`
  max-width: 100%;
  min-width: 800px;

  min-height: 1080px;

  margin: 0 auto;

  background: linear-gradient(to bottom, #527ea0 0%, #2a475e 40%);
`;
