import React from 'react'
import styled from 'styled-components'
import AppContainer from '../components/AppContainer'
import { PrimaryButton } from '../components/Buttons'
import { CenterContainer } from '../components/Containers'
import { InputError, InputTitle, InputWrapper, TextInput } from '../components/InputComponents'
import { callMainApi } from '../utils/clientUtils'

import * as Colors from '../common/Colors'

const PasswordInput = styled(TextInput)`
  display: block;
`

const SectionTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.theme5};
`

interface Props {}

interface ValidationErrors {
  currentPasswordInput?: string
  newPasswordInput?: string
  newPasswordRepeatInput?: string
}

interface State {
  currentPasswordInput: string
  newPasswordInput: string
  newPasswordRepeatInput: string
  errors: ValidationErrors
}

export default class AccountPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      currentPasswordInput: '',
      newPasswordInput: '',
      newPasswordRepeatInput: '',
      errors: {},
    }
  }
  public handleChangeCurrentPassword = (e: any) => {
    this.setState({ currentPasswordInput: e.target.value })
  }
  public handleChangeNewPassword = (e: any) => {
    this.setState({ newPasswordInput: e.target.value })
  }
  public handleChangeNewPasswordRepeat = (e: any) => {
    this.setState({ newPasswordRepeatInput: e.target.value })
  }
  public handleSubmitNewPassword = () => {
    const errors: ValidationErrors = {}
    let hasErrors: boolean = false
    if (this.state.newPasswordInput.length < 8) {
      errors.newPasswordInput = 'Must be at least 8 characters'
      hasErrors = true
    }
    if (this.state.newPasswordRepeatInput !== this.state.newPasswordInput) {
      errors.newPasswordRepeatInput = 'Does not match'
      hasErrors = true
    }
    if (hasErrors) {
      this.setState({ errors })
    } else {
      callMainApi('POST', '/api/change-password', {
        currentPassword: this.state.currentPasswordInput,
        newPassword: this.state.newPasswordInput,
      }).then(res => {
        if (res.status === 200) {
          this.setState({
            currentPasswordInput: '',
            newPasswordInput: '',
            newPasswordRepeatInput: '',
            errors: {},
          })
        } else if (res.status === 401) {
          this.setState({
            currentPasswordInput: '',
            errors: {
              currentPasswordInput: 'Wrong password',
            },
          })
        }
      })
    }
  }
  public render() {
    return (
      <AppContainer titleParts={['Account']}>
        <CenterContainer width={400}>
          <SectionTitle>Change Password</SectionTitle>
          <InputWrapper>
            <InputTitle>Current Password</InputTitle>
            {this.state.errors.currentPasswordInput && <InputError>{this.state.errors.currentPasswordInput}</InputError>}
            <PasswordInput type="password" value={this.state.currentPasswordInput} onChange={this.handleChangeCurrentPassword} />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>New Password</InputTitle>
            {this.state.errors.newPasswordInput && <InputError>{this.state.errors.newPasswordInput}</InputError>}
            <PasswordInput type="password" value={this.state.newPasswordInput} onChange={this.handleChangeNewPassword} />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>Repeat New Password</InputTitle>
            {this.state.errors.newPasswordRepeatInput && <InputError>{this.state.errors.newPasswordRepeatInput}</InputError>}
            <PasswordInput type="password" value={this.state.newPasswordRepeatInput} onChange={this.handleChangeNewPasswordRepeat} />
          </InputWrapper>
          <PrimaryButton onClick={this.handleSubmitNewPassword}>Change password</PrimaryButton>
        </CenterContainer>
      </AppContainer>
    )
  }
}
