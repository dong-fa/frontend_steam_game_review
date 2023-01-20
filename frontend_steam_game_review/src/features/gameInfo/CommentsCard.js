import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  __deleteComment,
  __getComments,
  __updateCommentDetail,
  isDisabledToggle,
} from "../../reduex/modules/commentsSlice";

const CommentsCard = ({ comment, param }) => {
  const dispatch = useDispatch();

  //토큰여부로 댓글수정막기
  const token = localStorage.getItem("token");

  //수정이 활성화 될 시 다른 수정버튼 작동 막기
  const { disabledToggle } = useSelector((state) => state.comments);
  console.log(disabledToggle);
  //편집모드
  const [commentUpdate, setCommetUpdate] = useState(comment.comment);
  const [editMode, setEditMode] = useState(false);

  //삭제기능
  const onDeleteHandler = () => {
    //토큰이 없을 경우 실행 못하도록
    if (!token) return alert("로그인을 해주세요");

    const result = window.confirm("이 코멘트를 지울까요?");
    if (result) {
      return dispatch(__deleteComment(comment.id));
    } else {
      return;
    }
  };

  //수정기능
  //수정버튼 눌렀을시
  const onChangeEditMode = () => {
    //토큰이 없을 경우 실행 못하도록
    if (!token) return alert("로그인을 해주세요");
    //편집모드
    setEditMode(true);
    //수정을 했을 시 다른 버튼들 비활성화
    dispatch(isDisabledToggle(true));
  };
  //수정시 빈칸입력
  const onChangeHandler = (event) => {
    setCommetUpdate(event.target.value);
    // console.log("코멘트 입력 값", comment);
  };

  //수정버튼 클릭시
  const onEditButtonHandler = () => {
    //빈칸 유효성
    if (commentUpdate.trim() === "") {
      return alert("입력된 내용이 없습니다.");
    }
    console.log(comment.id);
    const updateComment = {
      postId: param,
      comment: commentUpdate,
      id: comment.id,
    };
    dispatch(
      __updateCommentDetail({
        updateComment,
      })
    );
    setEditMode(false);
    dispatch(isDisabledToggle(false));
  };
  return (
    <>
      <STcard token={token}>
        {editMode ? (
          <>
            <CommentsBox token={token}>
              <div type="text">{comment.id}</div>
            </CommentsBox>
            <div>
              <InputUpdateComment
                type="text"
                value={commentUpdate}
                onChange={onChangeHandler}
              ></InputUpdateComment>
            </div>
            <div>
              <button onClick={onEditButtonHandler}>수정완료</button>
              <button
                onClick={() => {
                  setEditMode(false);
                }}
              >
                취소
              </button>
            </div>
          </>
        ) : (
          <>
            <TextBox>
              <CommentsBox token={token}>
                <div type="text">{comment.id}</div>
                <Comment>{comment.comment}</Comment>
              </CommentsBox>
            </TextBox>
            {token && (
              <div>
                <button onClick={onChangeEditMode} disabled={disabledToggle}>
                  수정
                </button>
                <button onClick={onDeleteHandler} disabled={disabledToggle}>
                  삭제
                </button>
              </div>
            )}
          </>
        )}
      </STcard>
    </>
  );
};

export default CommentsCard;

const TextBox = styled.div`
  width: 70%;
  display: flex;
`;
const STcard = styled.div`
  display: flex;

  justify-content: ${(props) => props.token && "space-between"};

  /* border: 1px solid white; */
  border-radius: 5px;

  padding: 10px;
  margin: 10px 0px 0px 0px;

  background-color: #102646;
`;

const CommentsBox = styled.div`
  display: flex;
  align-items: center;
  padding: ${(props) => props.token || "17px 13px"};
  margin-left: 20px;
  height: ${(props) => props.token && ""};
`;

const Comment = styled.div`
  margin-left: 250px;
`;
const InputUpdateComment = styled.input`
  margin-top: 20px;
`;
