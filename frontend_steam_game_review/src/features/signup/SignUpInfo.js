import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __signUp, __idCheck } from "../../reduex/modules/loginSignUp";

const SignUpInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    userid: "",
    password: "",
    passwordCheck: "",
    email: "",
  });

  console.log(user);

  //유저 스테이트 구조분해 할당
  const { userid, password, passwordCheck, email } = user;

  //유효성 메시지
  const [emailInputMessage, setEmailInput] = useState("");
  const [passInputmessage, setPassInput] = useState("");
  const [passCheckInput, setPassCheckInput] = useState("");
  const [idInputmessage, setIdInput] = useState("");

  //정규식
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\\d@$!%*#?&]{8,20}$/;
  const regId = /^[a-z0-9_-]{4,20}$/;

  //유효성검사
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((userInfo) => {
      return { ...userInfo, [name]: value };
    });

    if (name === "userid")
      !regId.test(value)
        ? setIdInput("아이디는 영어로 입력해주세요")
        : setIdInput("");

    if (name === "password")
      !regPassword.test(value)
        ? setPassInput(
            `8~16자의 영문 대소문자와 숫자로 입력해주세요.\n특수문자(!@#$%^&*)도 사용 가능합니다.`
          )
        : setPassInput("");

    if (name === "passwordCheck")
      password !== value
        ? setPassCheckInput("비밀번호가 불일치합니다")
        : setPassCheckInput("");

    if (name === "email")
      !regEmail.test(value)
        ? setEmailInput("이메일 형식으로 입력해주세요.")
        : setEmailInput("");
  };

  //id중복확인

  const idCheck = () => {
    if (userid.trim() === "") {
      return alert("아이디를 입력해주세요.");
    }
    dispatch(__idCheck(userid));
  };

  //회원가입 POST 요청 및 공백 존재 시 경고창
  const onSubmitUserHandler = (e) => {
    e.preventDefault();
    console.log(password, passwordCheck);

    //빈칸유효성 검사
    if (
      (userid.trim() === "" && userid.length >= 4) ||
      (password.trim() === "" &&
        password.length >= 8 &&
        password.length < 21) ||
      passwordCheck.trim() === "" ||
      email.trim() === ""
    ) {
      return alert("아이디랑 비밀번호를 올바르게 입력해주세요!");
    }

    //비밀번호 확인및 비밀번호 일치여부
    if (password !== passwordCheck) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    dispatch(
      __signUp({
        userid,
        password,
        email,
        navigate,
      })
    );
  };

  return (
    <div>
      <LoginContainer>
        <div>
          <SignUpText>Sign Up</SignUpText>
        </div>
        <FormBox onSubmit={onSubmitUserHandler}>
          <div>
            <Text>ID</Text>
            <InputBox
              type={"text"}
              placeholder="아이디를 입력해주세요(4자 이상)"
              name="userid"
              value={userid}
              onChange={onChangeHandler}
            ></InputBox>
            <button type="button" onClick={idCheck}>
              중복확인
            </button>
            <p id="help-user" className="help">
              {idInputmessage}
            </p>
          </div>
          <div>
            <Text>password</Text>
            <InputBox
              type={"password"}
              name="password"
              placeholder="비밀번호를 입력해주세요(8~20자)"
              maxLength={20}
              value={password}
              onChange={onChangeHandler}
            ></InputBox>
            <p id="help-password1" className="help">
              {passInputmessage}
            </p>
          </div>
          <div>
            <Text>passwordCheck</Text>
            <InputBox
              type="password"
              name="passwordCheck"
              placeholder="비밀번호를 입력해주세요(8~20자)"
              maxLength={20}
              value={passwordCheck}
              onChange={onChangeHandler}
            ></InputBox>
            <p id="help-password1" className="help">
              {passCheckInput}
            </p>
          </div>

          <div>
            <Text>Email</Text>
            <InputBox
              name="email"
              type="email"
              value={email}
              placeholder="Email을 입력해주세요"
              onChange={onChangeHandler}
            ></InputBox>
            <p id="help-user" className="help">
              {emailInputMessage}
            </p>
          </div>
          <ButtonBox>
            <Button> 회원가입 </Button>
            <Button
              onClick={() => {
                navigate(`/`);
              }}
            >
              {" "}
              이전으로{" "}
            </Button>
          </ButtonBox>
        </FormBox>
      </LoginContainer>
    </div>
  );
};

export default SignUpInfo;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 80vh;
`;
const SignUpText = styled.h1`
  color: #fff;
  font-size: 32px;
  text-transform: uppercase;
  letter-spacing: 0.055em;
  font-weight: 500;

  margin-bottom: 20px;
`;

const FormBox = styled.form`
  width: 500px;
  height: 500px;

  padding: 10px;

  background-color: #171a21;
  display: grid;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  color: white;
`;

const InputBox = styled.input`
  width: 250px;
  margin-right: 20px;
  border-radius: 2px;
  color: #fff;
  padding: 10px;
  background-color: #32353c;
  outline: none;
  font-size: 15px;
  grid-area: input;
  border: 1px solid #32353c;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Button = styled.button`
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
`;

const Text = styled.div`
  font-size: 15px;
  color: #afafaf;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  user-select: none;
  margin-bottom: 10px;
`;
