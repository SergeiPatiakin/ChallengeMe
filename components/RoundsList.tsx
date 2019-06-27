import moment, { Moment } from 'moment'
import React from 'react'
import styled from 'styled-components'

import * as Colors from '../common/Colors'
import { RoundFrequency, RoundResultType } from '../common/DataTypes'
import { callMainApi } from '../utils/clientUtils'
import { getTimeLabel } from '../utils/tools'
import { CenterContainer, MainScrollContainer } from './Containers'
import { MainEmptyState } from './MainEmptyState'
import { DarkOverlay } from './Overlay'
import { RoundResultDialog } from './RoundResultDialog'

const RoundElementWrapper = styled.div``

const RoundElement = styled.div`
  border-radius: 3px;
  margin: 4px;
  height: 23px;
  max-height: 23px;
  overflow: hidden;
  display: flex;
  position: relative;
`

const CompletedRoundElement = styled(RoundElement)`
  border: 1px ${Colors.primaryBorder} solid;
  cursor: pointer;
`

const OverdueRoundElement = styled(RoundElement)`
  border: 1px ${Colors.dangerBorder} solid;
  cursor: pointer;
`

const PendingRoundElement = styled(RoundElement)`
  border: 1px ${Colors.theme3} solid;
  cursor: pointer;
`

const FutureRoundElement = styled(RoundElement)`
  border: 1px ${Colors.disabledBorder} solid;
  cursor: default;
`

const RoundChallengeName = styled.p`
  margin-top: 0px;
  margin-bottom: 4px;
  margin-left: 16px;
  color: ${Colors.theme5};
  font-weight: bold;
`

const FutureRoundChallengeName = styled.p`
  margin-top: 0px;
  margin-bottom: 4px;
  margin-left: 16px;
  color: #333;
  font-weight: bold;
`

const ResultTag = styled.div`
  border-radius: 3px;
  height: 17px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2px;
`

const ResultTagText = styled.p`
  color: white;
  font-size: 12px;
  line-height: 17px;
  font-weight: bold;
  padding-left: 2px;
  padding-right: 2px;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;
`

interface RoundListProps {
  type: 'uncompleted' | 'completed'
}

interface RoundResultDialogSubstate {
  curId: string
  challengeName: string
  roundPeriodLabel: string
  roundDescription: string
  roundResultType: RoundResultType
  roundResultBoolean: boolean | null
  roundResultFloat: number | null
}
interface RoundListState {
  rounds: Array<{
    challengeId: string
    challengeName: string
    curId: string
    roundDescription: string
    roundId: string
    roundResultType: RoundResultType
    roundFrequencyType: RoundFrequency
    startTime: Moment
    endTime: Moment
    isCompleted: boolean
    resultBoolean: boolean | null
    resultFloat: number | null
  }>
  roundResultDialogSubstate: RoundResultDialogSubstate | null
}

export class RoundList extends React.Component<RoundListProps, RoundListState> {
  constructor(props: RoundListProps) {
    super(props)
    this.state = {
      rounds: [],
      roundResultDialogSubstate: null,
    }
  }
  public componentDidMount() {
    this.refreshList()
  }
  public refreshList() {
    Promise.resolve()
      .then(() => {
        if (this.props.type === 'uncompleted') {
          return callMainApi('GET', '/api/pending-rounds')
        } else {
          return callMainApi('GET', '/api/completed-rounds')
        }
      })
      .then(response => response.json())
      .then((responseJson: any) => {
        this.setState({
          rounds: responseJson.rounds.map((round: any) => ({
            // TODO: update API
            ...round,
            startTime: moment(round.startTime),
            endTime: moment(round.endTime),
          })),
        })
      })
  }
  public handleClickRound = (roundResultDialogSubstate: RoundResultDialogSubstate) => {
    this.setState({ roundResultDialogSubstate })
  }
  public handleCompleteRound = (curId: string, resultBoolean: boolean | null, resultFloat: number | null) => {
    this.setState({ roundResultDialogSubstate: null }, () => {
      callMainApi('POST', '/api/update-cur', {
        curId,
        resultBoolean,
        resultFloat,
        isCompleted: true,
      }).then(() => {
        this.refreshList()
      })
    })
  }
  public handleRoundResultDialogExit = () => {
    this.setState({ roundResultDialogSubstate: null })
  }
  public renderBooleanResult(resultBoolean: boolean) {
    return (
      <ResultTag style={{ backgroundColor: resultBoolean ? Colors.successBackground : Colors.dangerBackground }}>
        <ResultTagText>{resultBoolean ? 'Success' : 'Fail'}</ResultTagText>
      </ResultTag>
    )
  }
  public renderFloatResult(resultFloat: number) {
    return (
      <ResultTag style={{ backgroundColor: Colors.primaryBackground }}>
        <ResultTagText>{resultFloat}</ResultTagText>
      </ResultTag>
    )
  }
  public render() {
    const timeNow = moment()
    return (
      <>
        {this.state.roundResultDialogSubstate && (
          <DarkOverlay onClick={this.handleRoundResultDialogExit}>
            <RoundResultDialog
              {...this.state.roundResultDialogSubstate}
              onComplete={(resultBoolean: boolean | null, resultFloat: number | null) => this.handleCompleteRound(this.state.roundResultDialogSubstate!.curId, resultBoolean, resultFloat)}
            />
          </DarkOverlay>
        )}
        <MainScrollContainer>
          <CenterContainer width={600}>
            {this.state.rounds.length > 0 ? (
              <RoundElementWrapper>
                {this.state.rounds.map(round => {
                  const roundPeriodLabel = getTimeLabel(round.startTime, round.endTime.clone().subtract(1, 'minute'))
                  const openDialogProps = {
                    curId: round.curId,
                    challengeName: round.challengeName,
                    roundDescription: round.roundDescription,
                    roundResultType: round.roundResultType,
                    roundResultBoolean: round.resultBoolean,
                    roundResultFloat: round.resultFloat,
                    roundPeriodLabel,
                  }
                  if (round.isCompleted) {
                    return (
                      <CompletedRoundElement onClick={() => this.handleClickRound(openDialogProps)}>
                        <RoundChallengeName>
                          {round.challengeName} ({roundPeriodLabel})
                        </RoundChallengeName>
                        {round.isCompleted && round.resultBoolean !== null && this.renderBooleanResult(round.resultBoolean)}
                        {round.isCompleted && round.resultFloat !== null && this.renderFloatResult(round.resultFloat)}
                      </CompletedRoundElement>
                    )
                  } else if (round.endTime.isBefore(timeNow)) {
                    return (
                      <OverdueRoundElement key={round.roundId} onClick={() => this.handleClickRound(openDialogProps)}>
                        <RoundChallengeName>
                          {round.challengeName} ({roundPeriodLabel})
                        </RoundChallengeName>
                        {round.isCompleted && round.resultBoolean !== null && this.renderBooleanResult(round.resultBoolean)}
                        {round.isCompleted && round.resultFloat !== null && this.renderFloatResult(round.resultFloat)}
                      </OverdueRoundElement>
                    )
                  } else if (round.startTime.isBefore(timeNow)) {
                    return (
                      <PendingRoundElement key={round.roundId} onClick={() => this.handleClickRound(openDialogProps)}>
                        <RoundChallengeName>
                          {round.challengeName} ({roundPeriodLabel})
                        </RoundChallengeName>
                        {round.isCompleted && round.resultBoolean !== null && this.renderBooleanResult(round.resultBoolean)}
                        {round.isCompleted && round.resultFloat !== null && this.renderFloatResult(round.resultFloat)}
                      </PendingRoundElement>
                    )
                  } else {
                    return (
                      <FutureRoundElement>
                        <FutureRoundChallengeName>
                          {round.challengeName} ({roundPeriodLabel})
                        </FutureRoundChallengeName>
                        {round.isCompleted && round.resultBoolean !== null && this.renderBooleanResult(round.resultBoolean)}
                        {round.isCompleted && round.resultFloat !== null && this.renderFloatResult(round.resultFloat)}
                      </FutureRoundElement>
                    )
                  }
                })}
              </RoundElementWrapper>
            ) : (
              <MainEmptyState />
            )}
          </CenterContainer>
        </MainScrollContainer>
      </>
    )
  }
}
