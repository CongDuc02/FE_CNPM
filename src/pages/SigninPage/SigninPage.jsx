import React, { useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponents/ButtonComponent";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import {InvalidTokenError, jwtDecode} from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from "../../redux/slides/userSlide"
import Footer from "../Footer/Footer";


const SigninPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const user  = useSelector((state) => state.user)

  const handleNavigateSignup = () => {
    navigate("/signup");
  };

  const mutation = useMutationHooks((data) => UserService.loginUser(data));

  const { data, isLoading, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      if(location?.state) {
        navigate(location?.state)
      }else {
        navigate('/')
      }
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token)
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    }
  }, [isSuccess])

    const handleGetDetailsUser = async (id, token) => {
      const storage = localStorage.getItem('refresh_token')
      const refreshToken = JSON.parse(storage)
      const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }))
  }


  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <div style={{ padding: '0 120px' }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "500px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào bạn!</h1>
          <p>Đăng nhập hoặc tạo tài khoản</p>

          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="Email"
            onChange={handleOnchangeEmail}
          />

          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? (<EyeFilled /> ): (<EyeInvisibleFilled />)}
            </span>
            <InputForm
              placeholder="Mật khẩu"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isLoading}>
            <ButtonComponent
              styleButton={{
                background: "red",
                height: "48px",
                width: "100%",
                border: "none",
                margin: "26px 0 20px",
              }}
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={60}
              textbutton={" Đăng nhập "}
              styleTextButton={{ color: "#fff", fontSize: "15px" }}
            ></ButtonComponent>
          </Loading>
          <p style={{ color: "blue", cursor: "pointer" }}> Quên mật khẩu</p>
          <p>
            Chưa có tài khoản ?{" "}
            <span
              onClick={handleNavigateSignup}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Đăng ký tài khoản
            </span>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight></WrapperContainerRight>
      </div>
      </div>
      <Footer>
        
    </Footer>
    </div>
  );
};

export default SigninPage;
