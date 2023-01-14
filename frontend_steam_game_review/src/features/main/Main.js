import React from "react";
import styled from "styled-components";
import bear1 from "../../img/농담곰018.jpg";
import { useState } from "react";
import { useNavigate } from "react-router";
const Main = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    {
      name: "Genre1",
      img: bear1,
      title: "농담곰 귀엽죠",
    },
    {
      name: "Genre2",
      img: bear1,
      title: "농담곰 짱이죠",
    },
    {
      name: "Genre3",
      img: bear1,
      title: "농담곰 짱짱짱",
    },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <>
      <Container>
        <ImgContainer>
          <ImgSlice>
            <Button> 오 </Button>
            <ImgBox
              onClick={() => {
                navigate(`/Detail`);
              }}
            >
              <Img src={bear1} alt="img" />
            </ImgBox>
            <Button> 왼 </Button>
          </ImgSlice>
        </ImgContainer>
        <ContentContainer>
          <ContentBox>
            <div>
              <TabMenu>
                {menuArr.map((ele, index) => {
                  return (
                    <li
                      key={index}
                      className={
                        currentTab === index ? "submenu focused" : "submenu"
                      }
                      onClick={() => selectMenuHandler(index)}
                    >
                      {ele.name}
                    </li>
                  );
                })}
              </TabMenu>
              <Desc
                onClick={() => {
                  navigate(`/Detail`);
                }}
              >
                <ContentImgBox>
                  <ContentImg src={menuArr[currentTab].img}></ContentImg>
                </ContentImgBox>
                <Title>{menuArr[currentTab].title}</Title>
              </Desc>
            </div>
          </ContentBox>
        </ContentContainer>
      </Container>
    </>
  );
};

export default Main;
const Container = styled.div`
  max-width: 100%;
  min-width: 300px;

  margin-left: 100px;
  margin-right: 100px;

  overflow: hidden;
`;

const ImgContainer = styled.div`
  max-width: 100%;
  min-width: 20%;
`;

const ImgSlice = styled.div`
  height: 400px;

  box-sizing: border-box;
  display: flex;
  align-items: center;

  justify-content: center;
`;

const ImgBox = styled.div``;
const Img = styled.img`
  width: 850px;
  height: 300px;
`;

const Button = styled.button`
  height: 300px;
`;

const ContentContainer = styled.div`
  height: 80vh;
  background-color: azure;

  overflow: scroll;
  background-color: #4e697d;
`;

const ContentBox = styled.div``;

const TabMenu = styled.ul`
  background-color: #dcdcdc;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;

  .submenu {
    width: 100% auto;
    padding: 15px 10px;
    cursor: pointer;
  }
`;

const Desc = styled.div`
  display: flex;
  background-color: #4e697d;
  background: linear-gradient(to bottom, #306287 0%, #2f4d63 35%);

  align-items: center;
`;
const ContentImgBox = styled.div`
  margin-left: 3px;
  margin-top: 3px;
  margin-right: 75px;
`;
const ContentImg = styled.img`
  height: 100px;
  width: 150px;
  margin: 10px, 10px;
`;
const Title = styled.p`
  color: white;
`;
