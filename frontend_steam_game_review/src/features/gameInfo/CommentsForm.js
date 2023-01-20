import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  __addComment,
  __getComments,
} from "../../reduex/modules/commentsSlice";
import CommentsCard from "./CommentsCard";

const CommentsForm = () => {
  //토큰여부
  const token = localStorage.getItem("token");

  // 게임인포에서 보내는 게임 아이디값
  const { id } = useParams();
  // console.log("코멘트폼 파람값?", id);

  //게임아이디를 넣기위한 선언문
  const postId = id;

  const [comment, setComment] = useState({ comment: "", postId: id });
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  // console.log("셀렉터 코멘츠?", comments);

  //코멘트 입력
  const onChangeHandler = (event) => {
    //토큰여부에 따라 등록 가능
    if (!token) {
      return alert("로그인을 해주세요");
    }

    const { name, value } = event.target;
    console.log(name, value);
    setComment({
      ...comment,
      [name]: value,
    });
    // console.log("코멘트 입력 값", comment);
  };

  //코멘트 POST 요청
  const addComment = () => {
    if (comment.comment.trim() === "") {
      return alert("내용을 입력하세요.");
    }
    dispatch(__addComment({ postId: id, ...comment }));
    setComment({ comment: "" });
    // console.log("에드코멘트의 값", comment, id);
  };

  //코멘트가 추가될때마다 렌더링 해준다. 해당 게임에 맞는 코멘트를 불러오기위해 아이디값을 넣어준다
  useEffect(() => {
    dispatch(__getComments(postId));
  }, [dispatch]);
  // console.log("성크로 보내는 아이디값?", postId);
  return (
    <div>
      <CommentContainer>
        <CommentBar>
          <div>고객 평가</div>
          <input
            size={40}
            onChange={onChangeHandler}
            name="comment"
            type="text"
            value={comment.comment}
            placeholder="코멘트를 입력하세요."
          ></input>
          <button onClick={addComment}>등록</button>
        </CommentBar>
        <div>가장 유용한 평가</div>

        <CommentBox>
          {/* 서버에서 데이터 불러오는동안 비동기로 처리되기 때문에 배열을 불러올 수 없음 그렇기 때문에 옵셔널 체인링을 사용 */}
          {comments?.map((comment) => (
            <CommentsCard key={comment.id} comment={comment} />
          ))}
        </CommentBox>

      </CommentContainer>
    </div>
  );
};

export default CommentsForm;

const CommentContainer = styled.div`
  /* border: 1px solid white; */

  width: 100%;
  height: 550px;

  margin: 20px auto;

  color: white;
  font-weight: 700;

  input {
    width: 85%;
    height: 20px;
    margin-left: 10px;
    padding: 5px;

    border: none;
    border-radius: 5px;
    font-size: large;
  }
  button {
    padding: 8px 13px;
    margin-left: 20px;
    font-weight: 700;
    font-size: 20px;

    color: white;
    border: none;
    border-radius: 5px;
    background-color: #75b022;
    cursor: pointer;
  }
`;
const CommentBar = styled.div`
  background-color: #171a21;

  padding: 10px;
  height: 70px;
  margin-bottom: 10px;
`;

const CommentBox = styled.div`
  /* border: 1px solid white; */

  padding-top: 10px;

  height: 500px;

  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
