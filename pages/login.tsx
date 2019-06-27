import React from 'react'
import styled from 'styled-components'
import { GenericButton, PrimarySubmitButton } from '../components/Buttons'
import { CenterContainer } from '../components/Containers'
import { InputTitle, InputWrapper, TextInput } from '../components/InputComponents'
import { TopBar } from '../components/TopBar'
import { login } from '../utils/clientUtils'

const EmailInput = styled(TextInput)`
  display: block;
`
const PasswordInput = styled(TextInput)`
  display: block;
`

const LoginButton = styled(PrimarySubmitButton)`
  width: calc(100% - 12px);
  margin-left: 6px;
  margin-right: 6px;
`

const FacebookLoginButton = styled(GenericButton)`
  background-color: #3c5a99;
  color: #fff;
  font-family: 'Helvetica';
  font-weight: bold;
`

interface LoginState {
  emailInput: string
  passwordInput: string
}

export default class LoginPage extends React.Component<{}, LoginState> {
  constructor(props: any) {
    super(props)
    this.state = {
      emailInput: '',
      passwordInput: '',
    }
  }
  public handleSubmit = (e: any) => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.emailInput.trim().toLowerCase(),
        password: this.state.passwordInput,
      }),
    })
      .then(response => {
        if (response.status !== 200) {
          return Promise.reject('authentication error')
        } else {
          return response.json()
        }
      })
      .then(responseJson => {
        const token = responseJson.token
        login(token)
      })
      .catch(() => {
        return
      })
    e.preventDefault()
  }
  public handleChangeEmail = (e: any) => {
    this.setState({ emailInput: e.target.value })
  }
  public handleChangePassword = (e: any) => {
    this.setState({ passwordInput: e.target.value })
  }
  public handleLoginWithFacebook = () => {
    window.location.href = '/auth/facebook'
  }
  public render() {
    return (
      <>
        <TopBar />

        <CenterContainer width={400}>
          <form onSubmit={this.handleSubmit}>
            <InputWrapper>
              <InputTitle>Email</InputTitle>
              <EmailInput type="text" value={this.state.emailInput} onChange={this.handleChangeEmail} />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Password</InputTitle>
              <PasswordInput type="password" value={this.state.passwordInput} onChange={this.handleChangePassword} />
            </InputWrapper>
            <LoginButton type="submit" value="Log in " />
            <InputWrapper>
              <FacebookLoginButton onClick={this.handleLoginWithFacebook}>Log in with Facebook...</FacebookLoginButton>
            </InputWrapper>
          </form>
        </CenterContainer>
      </>
    )
  }
}
