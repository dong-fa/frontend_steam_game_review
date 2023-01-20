import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CommentsForm from "./CommentsForm";
import { __getgames } from "../../reduex/modules/gameInfoSlice";
import commentsSlice from "../../reduex/modules/commentsSlice";

const GameInfo = () => {
  //게임리스트의 아이디 받아오기
  const { id } = useParams();
  // console.log("게임 아이디?", id);

  const dispatch = useDispatch();

  //게임리스트 객체 가져오기
  const game = useSelector((state) => state.gameList.gameList);
  // console.log("게임의 셀렉터는?", game);

  //console.log(game);
  useEffect(() => {
    dispatch(__getgames(id));
  }, [dispatch]);

  return (
    <GameInfoContainer>
      {/* 게임 디테일 이미지 */}
      <Wrap>
        <ImgContainer>
          {/* 백연결 시 : {game.title},{game.imageUrl}  */}
          {/* 로컬 연걸 : {game.gameName},{game.gameImage} */}
          <TitleBox key={id}>{game.title}</TitleBox>
          <ImgBox src={game.imageUrl}></ImgBox>
        </ImgContainer>
        {/* 게임 디테일 컨텐츠 */}
        {/* 백연결시 : {game.explanation} */}
        <ContentsContainer>
          <TitleBox>{game.title}</TitleBox>
          <ContentsBox>Genre : {game.genre}</ContentsBox>
          <ContentsBox>{game.explanation}</ContentsBox>
        </ContentsContainer>
      </Wrap>
      {/* 코멘트 달리는 폼 */}
      <CommentsForm key={id} />
    </GameInfoContainer>
  );
};

export default GameInfo;

const GameInfoContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
`;
const Wrap = styled.div`
  display: flex;
  gap: 10px;
`;
const ImgContainer = styled.div`
  width: 500px;
  height: 250px;

  margin: 10px auto;
`;
const TitleBox = styled.div`
  width: 200px;
  height: 30px;

  font-size: 20px;
  font-weight: 600;

  margin-top: 5px;
  margin-bottom: 20px;
  margin-left: 5px;

  font-family: Arial, Helvetica, sans-serif;
  color: #c6d4df;
  /* border: 1px solid white; */
`;

const ImgBox = styled.img`
  width: 500px;
  height: 180px;

  margin: 2px auto;

  /* border: 1px solid white; */

  /* background-color: wheat; */
`;
const ContentsContainer = styled.div`
  margin: 10px auto;
`;
const ContentsBox = styled.div`
  /* border: 1px solid white; */
  margin-left: 5px;
  margin-bottom: 10px;
  color: #c6d4df;
  font-family: Arial, Helvetica, sans-serif;
  width: 350px;
  line-height: 125%;
`;
