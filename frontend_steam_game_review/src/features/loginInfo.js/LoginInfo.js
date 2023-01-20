import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __postLogin } from "../../reduex/modules/loginSignUp";
const LoginInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //초기값
  const initialState = {
    userid: "",
    password: "",
  };
  //유저 스테이트 생성
  const [user, setUser] = useState(initialState);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  console.log(user);
  //로그인 요청
  const onSubmitLoginHandler = (e) => {
    e.preventDefault();
    if (user.userid.trim() === "" || user.password.trim() === "") {
      return alert("모든 항목을 입력해주세요");
    }
    dispatch(__postLogin({ user, navigate }));
    console.log(user);
  };

  return (
    <div>
      <LoginContainer>
        <div>
          <LoginText>login</LoginText>
        </div>
        <FormBox onSubmit={onSubmitLoginHandler}>
          <div>
            <Text>ID </Text>
            <Input
              placeholder="아이디를 입력해주세요"
              type="text"
              name="userid"
              onChange={onChangeHandler}
            ></Input>
          </div>
          <div>
            <Text>PassWord </Text>
            <Input
              type="password"
              name="password"
              onChange={onChangeHandler}
              placeholder="비밀번호를 입력해주세요"
            ></Input>
          </div>
          <div>
            <SinIn> 로그인 </SinIn>
          </div>
        </FormBox>
      </LoginContainer>
    </div>
  );
};

export default LoginInfo;

const LoginText = styled.h1`
  color: #fff;
  font-size: 32px;
  text-transform: uppercase;
  letter-spacing: 0.055em;
  font-weight: 500;

  margin-bottom: 20px;
`;
const LoginContainer = styled.div`
  /* border: 1px solid white; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 88vh;
`;

const FormBox = styled.form`
  width: 400px;
  height: 250px;

  /* border: 1px solid white; */

  background-color: #171a21;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  color: white;
`;

const Input = styled.input`
  border-radius: 2px;
  color: #fff;
  padding: 10px;
  background-color: #32353c;
  outline: none;
  font-size: 15px;
  grid-area: input;
  border: 1px solid #32353c;
`;

const Text = styled.div`
  font-size: 12px;
  color: #afafaf;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  user-select: none;
  margin-bottom: 10px;
`;

const SinIn = styled.button`
  position: relative;
  background: linear-gradient(90deg, #06bfff 0%, #2d73ff 100%);
  border-radius: 2px;
  border: none;
  outline: none;
  padding: 12px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  font-family: inherit;
  text-align: center;
  letter-spacing: 0.03em;
  cursor: pointer;

  width: 200px;
`;
