import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import SimpleSlider from "../../components/SimpleSlider";
import { __getGameList } from "../../reduex/modules/mainSlice";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //게임장르 별 탭구성
  const genre = ["ALL", "RPG", "FPS", "ACTION", "SPORTS"];
  const { gameList } = useSelector((state) => state.mainSlice);

  //탭을 눌렀을시 구성할 리스트상태
  const [newList, setNewList] = useState(gameList);

  //탭을 눌렀을 때 내용변화
  const selectMenuHandler = (e) => {
    if (e.target.id === "ALL") {
      console.log(e.target.id);
      setNewList(gameList);
    } else {
      console.log(e.target.id);
      const newGameList = gameList.filter(
        (genre) => genre.genre === e.target.id
      );
      setNewList(newGameList);
    }
  };

  useEffect(() => {
    dispatch(__getGameList());
  }, []);

  useEffect(() => {
    setNewList(gameList);
  }, [gameList]);

  return (
    <>
      <Container>
        <ImgContainer>
          <TitleText>추천게임</TitleText>
          <SimpleSlider img={gameList} />
        </ImgContainer>

        <ContentContainer>
          <TabMenu>
            {genre.map((content, index) => {
              return (
                <Menu key={index} id={content} onClick={selectMenuHandler}>
                  {content}
                </Menu>
              );
            })}
          </TabMenu>
          <ContentBox>
            <div>
              {newList.map((content, index) => {
                return (
                  <Desc
                    onClick={() => {
                      //백 연결시 : /Detail/${content.postId}
                      //로컬 : /Detail/${content.id}
                      navigate(`/Detail/${content.postId}`);
                    }}
                    key={index}
                  >
                    <ContentImgBox>
                      {/* 백 연결시 : content.imageUrl */}
                      {/* 로컬 연결 : {content.gameImage} */}
                      <ContentImg src={content.imageUrl}></ContentImg>
                    </ContentImgBox>
                    {/* 백 연결시 : content.title */}
                    {/* 로컬 연결 : {content.gameName} */}
                    <Title>{content.title}</Title>
                  </Desc>
                );
              })}
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
  margin-top: 25px;
  max-width: 100%;
  min-width: 20%;
`;

const TitleText = styled.div`
  color: white;
  margin-bottom: 20px;
  font-weight: 700;
`;

const ContentContainer = styled.div`
  height: 30%;
  margin-top: 25px;
  background-color: #4e697d;

  margin-bottom: 50px;
`;

const ContentBox = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }

  height: 700px;

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }

  height: 80%;
`;

const TabMenu = styled.ul`
  height: 35px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
`;
const Menu = styled.li`
  margin-left: 15px;
  padding: 5px;
  &:hover {
    cursor: pointer;
    background-color: #171a21;
    color: white;
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
