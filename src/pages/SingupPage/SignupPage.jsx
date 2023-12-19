import React, { useEffect, useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponents/ButtonComponent'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import Footer from '../Footer/Footer'


const SignupPage = () => {

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()
  const handleNavigateSignIn = () => {
    navigate('/signin')
  }

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )

  const { data, isLoading, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success()
      handleNavigateSignIn()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])


  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword })

  }

  return (
    <div style={{ padding: '0 120px' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '500px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft >
          <h1>Xin chào bạn!</h1>
          <p>Đăng ký tài khoản </p>
        
        <InputForm style={{ marginBottom: '10px' }} placeholder='Email' value={email} onChange={handleOnchangeEmail} />
        <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
        <InputForm style={{ marginBottom: '10px',position: 'relative' }} placeholder='Mật khẩu' type={isShowPassword ? "text" : "password"} onChange={handleOnchangePassword}/>
      </div>
      
      <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowConfirmPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
        <InputForm placeholder='Nhập lại mật khẩu' type={isShowConfirmPassword ? "text" : "password"} onChange={handleOnchangeConfirmPassword}/>
        </div>
        {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
        <Loading isLoading={isLoading}>
        <ButtonComponent styleButton={{ background: "red", height: '48px', width: '100%',border: 'none', margin: '26px 0 20px' }}
          disabled={!email.length || !password.length || !confirmPassword.length}
          onClick={handleSignUp}
          size={60}
          textbutton={' Đăng ký '}
          styleTextButton={{ color: '#fff' }}
        >
        </ButtonComponent>
        </Loading>
        <p >Đã có tài khoản ? <span onClick={handleNavigateSignIn} style={{ color: 'blue', cursor: 'pointer' }}>Đăng nhập</span></p>
        </WrapperContainerLeft>
      </div>
      </div>
      <Footer>
        
    </Footer>
    </div>
  )
}

export default SignupPage