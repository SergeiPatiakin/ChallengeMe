import moment, { Moment } from 'moment'
import React from 'react'
import styled from 'styled-components'

import { Either, left, right } from 'fp-ts/lib/Either'
import * as Colors from '../common/Colors'
import { RoundAggregationType, RoundFrequency, RoundResultType } from '../common/DataTypes'
import { callMainApi } from '../utils/clientUtils'
import { PrimaryButton, SecondaryButton } from './Buttons'
import { CenterContainer, MainScrollContainer } from './Containers'
import { DatePicker } from './DatePicker'
import { Dropdown, DropdownArrowWrapper, DropdownResult } from './Dropdown'
import { DropdownArrow } from './Icons'
import { InputError, InputTitle, InputWrapper, TextInput } from './InputComponents'
import { DarkOverlay } from './Overlay'

const TextArea = styled.textarea`
  border: 1px solid ${Colors.theme4};
  border-radius: 3px;
  font-size: 14px;
  width: 100%;
  resize: none;
  padding: 2px;
  height: calc(4em + 4px);
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
  width: 100%;
`

interface CreateChallengeFormProps {
  onComplete: (challengeId: string) => void
  onCancel: () => void
}

interface CreateChallengeFormErrors {
  name?: string
  countRounds?: string
}

interface CreateChallengeFormResult {
  name: string
  challengeDescription: string
  roundDescription: string
  roundFrequency: RoundFrequency
  firstStartDate: Moment
  countRounds: number
}

interface CreateChallengeFormState {
  name: string
  challengeDescription: string
  roundDescription: string
  roundFrequency: RoundFrequency
  firstStartDate: Moment
  selectingFirstStartDate: boolean
  countRounds: string
  roundResultType: RoundResultType
  roundAggregationType: RoundAggregationType
  errors: CreateChallengeFormErrors
}

function generateRounds(formResult: CreateChallengeFormResult): Array<{ startTime: Moment; endTime: Moment }> {
  const rounds: Array<{ startTime: Moment; endTime: Moment }> = []

  for (let i = 0; i < formResult.countRounds; i++) {
    const delta: 'day' | 'week' = formResult.roundFrequency === 'daily' ? 'day' : 'week'
    const startDate = formResult.firstStartDate.clone().add(i, delta)
    const endDate = formResult.firstStartDate
      .clone()
      .add(i + 1, delta)
      .subtract(1, 'minute')
    rounds.push({
      startTime: startDate,
      endTime: endDate,
    })
  }
  return rounds
}

export class CreateChallengeForm extends React.Component<CreateChallengeFormProps, CreateChallengeFormState> {
  constructor(props: CreateChallengeFormProps) {
    super(props)
    this.state = {
      name: '',
      challengeDescription: '',
      roundDescription: '',
      roundFrequency: 'daily',
      firstStartDate: moment().startOf('day'),
      selectingFirstStartDate: false,
      countRounds: '1',
      roundResultType: 'boolean',
      roundAggregationType: 'countFalse',
      errors: {},
    }
  }
  public validate(): Either<CreateChallengeFormResult, CreateChallengeFormErrors> {
    const errors: CreateChallengeFormErrors = {}
    let hasErrors: boolean = false

    if (!this.state.name) {
      hasErrors = true
      errors.name = 'Name cannot be empty'
    }

    const countRounds = parseInt(this.state.countRounds, 10)
    if (Number.isNaN(countRounds) || countRounds < 1) {
      hasErrors = true
      errors.countRounds = 'Must be a positive number'
    }

    if (!hasErrors) {
      return left({
        name: this.state.name,
        challengeDescription: this.state.challengeDescription,
        roundDescription: this.state.roundDescription,
        roundFrequency: this.state.roundFrequency,
        roundResultType: this.state.roundResultType,
        roundAggregationType: this.state.roundAggregationType,
        firstStartDate: this.state.firstStartDate,
        countRounds,
      })
    } else {
      return right(errors)
    }
  }

  public handleClickSubmit = () => {
    const formResults = this.validate()
    formResults.fold(
      results => {
        const rounds = generateRounds(results)
        callMainApi('POST', '/api/create-challenge', {
          challenge: {
            name: this.state.name,
            challengeDescription: this.state.challengeDescription,
            roundDescription: this.state.roundDescription,
            roundFrequency: this.state.roundFrequency,
            roundResultType: this.state.roundResultType,
            roundAggregationType: this.state.roundAggregationType,
          },
          rounds,
        })
          .then(response => response.json())
          .then(({ challengeId }) => {
            this.props.onComplete(challengeId)
          })
      },
      errors => {
        this.setState({ errors })
      }
    )
  }
  public render() {
    return (
      <>
        {this.state.selectingFirstStartDate && (
          <DarkOverlay>
            <DatePicker startDate={this.state.firstStartDate} onSelectResult={(date: Moment) => this.setState({ firstStartDate: date, selectingFirstStartDate: false })} />
          </DarkOverlay>
        )}
        <MainScrollContainer>
          <CenterContainer width={400}>
            <InputWrapper>
              <InputTitle>Name</InputTitle>
              {this.state.errors.name && <InputError>{this.state.errors.name}</InputError>}
              <TextInput type="text" value={this.state.name} onChange={(e: any) => this.setState({ name: e.target.value })} />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Challenge Description</InputTitle>
              <TextArea value={this.state.challengeDescription} onChange={(e: any) => this.setState({ challengeDescription: e.target.value })} />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Round Description</InputTitle>
              <TextArea value={this.state.roundDescription} onChange={(e: any) => this.setState({ roundDescription: e.target.value })} />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Round Frequency</InputTitle>
              <Dropdown
                options={[{ key: 'daily', label: 'Daily' }, { key: 'weekly', label: 'Weekly' }]}
                onOptionSelected={key => this.setState({ roundFrequency: key as RoundFrequency })}
                defaultKey="daily"
              />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>First Round Start Date</InputTitle>
              <DropdownResult onClick={() => this.setState({ selectingFirstStartDate: true })}>
                {this.state.firstStartDate.format('YYYY-MM-DD')}
                <DropdownArrowWrapper>
                  <DropdownArrow width={8} height={8} />
                </DropdownArrowWrapper>
              </DropdownResult>
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Number of Rounds</InputTitle>
              {this.state.errors.countRounds && <InputError>{this.state.errors.countRounds}</InputError>}
              <TextInput type="text" value={this.state.countRounds} onChange={(e: any) => this.setState({ countRounds: e.target.value })} />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Round Result Type</InputTitle>
              <Dropdown
                options={[{ key: 'boolean', label: 'Success/fail' }, { key: 'float', label: 'Numeric' }]}
                defaultKey="boolean"
                onOptionSelected={key => this.setState({ roundResultType: key as RoundResultType })}
              />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>Round Aggregation Type</InputTitle>
              <Dropdown
                options={[{ key: 'countFalse', label: 'Count failures' }, { key: 'countTrue', label: 'Count success' }, { key: 'sum', label: 'Sum' }, { key: 'max', label: 'Max' }]}
                defaultKey="countFalse"
                onOptionSelected={key => this.setState({ roundAggregationType: key as RoundAggregationType })}
              />
            </InputWrapper>
            <ButtonWrapper>
              <PrimaryButton onClick={this.handleClickSubmit} style={{ width: 80, marginLeft: 4, marginRight: 4 }}>
                Create
              </PrimaryButton>
              <SecondaryButton onClick={this.props.onCancel} style={{ width: 80, marginLeft: 4, marginRight: 4 }}>
                Cancel
              </SecondaryButton>
            </ButtonWrapper>
          </CenterContainer>
        </MainScrollContainer>
      </>
    )
  }
}
