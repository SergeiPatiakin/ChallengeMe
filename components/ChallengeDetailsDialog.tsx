import React from 'react'
import styled from 'styled-components'
import * as Colors from '../common/Colors'
import { DangerButton, PrimaryButton } from './Buttons'

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 4px;
  width: 300px;
`

const Header = styled.div``

const TitleText = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  color: ${Colors.theme4};
  text-align: center;
`

const Body = styled.div`
  min-height: 100px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
  position: absolute;
  bottom: 0px;
  width: calc(100% - 20px);
`

interface ChallengeDetailsDialogProps {
  challengeName: string
  challengeDescription: string
  onAddUsers: () => void
  onLeave: () => void
}

interface ChallengeDetailsDialogState {}

export class ChallengeDetailsDialog extends React.Component<ChallengeDetailsDialogProps, ChallengeDetailsDialogState> {
  public render() {
    return (
      <Container>
        <Header>
          <TitleText>{this.props.challengeName}</TitleText>
        </Header>
        <Body>
          {this.props.challengeDescription}
          <ButtonWrapper>
            <PrimaryButton style={{ width: 80, marginRight: 4 }} onClick={this.props.onAddUsers}>
              Add Users
            </PrimaryButton>
            <DangerButton style={{ width: 80, marginLeft: 4 }} onClick={this.props.onLeave}>
              Leave
            </DangerButton>
          </ButtonWrapper>
        </Body>
      </Container>
    )
  }
}
