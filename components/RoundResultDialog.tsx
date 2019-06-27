import React, { createRef } from 'react'
import styled from 'styled-components'

import * as Colors from '../common/Colors'
import { RoundResultType } from '../common/DataTypes'
import { stopPropagation } from '../utils/clientUtils'
import { DangerButton, PrimaryButton } from './Buttons'
import { TextInput } from './InputComponents'

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

const FooterWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  width: calc(100% - 20px);
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
  width: 100%;
`

export interface RoundResultDialogProps {
  challengeName: string
  roundPeriodLabel: string
  roundDescription: string
  roundResultType: RoundResultType
  roundResultBoolean: boolean | null
  roundResultFloat: number | null
  onComplete: (resultBoolean: boolean | null, resultFloat: number | null) => void
}

interface RoundResultDialogState {
  numericInputValue: string
}

export class RoundResultDialog extends React.Component<RoundResultDialogProps, RoundResultDialogState> {
  private textInputRef: React.RefObject<any>
  constructor(props: RoundResultDialogProps) {
    super(props)
    this.textInputRef = createRef()
    this.state = {
      numericInputValue: props.roundResultFloat ? props.roundResultFloat.toString() : '0',
    }
  }
  public handleNumericInputChange = (e: any) => {
    this.setState({ numericInputValue: e.target.value })
  }
  public componentDidMount() {
    if (this.textInputRef.current) {
      this.textInputRef.current.select()
      this.textInputRef.current.focus()
    }
  }
  public render() {
    return (
      <Container>
        <Header>
          <TitleText>
            {this.props.challengeName} ({this.props.roundPeriodLabel})
          </TitleText>
        </Header>
        <Body>
          {this.props.roundDescription}
          {this.props.roundResultType === 'boolean' && (
            <ButtonWrapper>
              <PrimaryButton style={{ width: 80, marginRight: 4 }} onClick={() => this.props.onComplete(true, null)}>
                Success
              </PrimaryButton>
              <DangerButton style={{ width: 80, marginLeft: 4 }} onClick={() => this.props.onComplete(false, null)}>
                Fail
              </DangerButton>
            </ButtonWrapper>
          )}
          {this.props.roundResultType === 'float' && (
            <>
              <FooterWrapper>
                <TextInput type="number" onClick={stopPropagation} value={this.state.numericInputValue} onChange={this.handleNumericInputChange} ref={this.textInputRef} />
                <ButtonWrapper>
                  <PrimaryButton style={{ width: 80, marginLeft: 4 }} onClick={() => this.props.onComplete(null, parseFloat(this.state.numericInputValue))}>
                    Submit
                  </PrimaryButton>
                </ButtonWrapper>
              </FooterWrapper>
            </>
          )}
        </Body>
      </Container>
    )
  }
}
