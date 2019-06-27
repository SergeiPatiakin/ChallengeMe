import React from 'react'
import styled from 'styled-components'
import * as Colors from '../common/Colors'
import * as dt from '../common/DataTypes'
import { callMainApi } from '../utils/clientUtils'
import { ChallengeDetailsDialog } from './ChallengeDetailsDialog'
import { CenterContainer, MainScrollContainer } from './Containers'
import { PlusWhite } from './Icons'
import { MainEmptyState } from './MainEmptyState'
import { DarkOverlay } from './Overlay'

const ChallengeElementWrapper = styled.div``
const ChallengeElement = styled.div`
  border: 1px ${Colors.theme3} solid;
  border-radius: 3px;
  margin: 4px;
  cursor: pointer;
  height: 92px;
  max-height: 92px;
  overflow: hidden;
  display: flex;
`
const ChallengeName = styled.p`
  margin-top: 0px;
  margin-bottom: 4px;
  margin-left: 16px;
  color: ${Colors.theme5};
  font-weight: bold;
`
const ChallengeDescription = styled.p`
  margin-top: 0px;
  margin-bottom: 4px;
  margin-left: 16px;
  color: ${Colors.theme4};
`

const CreateButton = styled.div`
  border-radius: 60px;
  width: 60px;
  height: 60px;
  background-color: ${Colors.theme1};
  box-shadow: 4px 4px 7px 0px rgba(128, 128, 128, 0.4);
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
`

const AggregateTagWrapper = styled.div`
  padding-right: 2px;
`

const AggregateTagSpacer = styled.div`
  height: 2px;
`

const AggregateTag = styled.div`
  border-radius: 3px;
  height: 21px;
  right: 2px;
`

const AggregateText = styled.p`
  color: white;
  font-size: 14px;
  line-height: 17px;
  padding-left: 2px;
  padding-right: 2px;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;
`

interface ChallengeListProps {
  challenges: Array<{
    id: string
    name: string
    challengeDescription: string
    roundResultType: dt.RoundResultType
    roundAggregationType: dt.RoundAggregationType
    totalRoundCount: number
    completedRoundCount: number
    completedRoundAggregate: number
  }>
  createChallengeEnabled: boolean
  onClickCreateChallenge?: () => void
  onClickAddUsers?: (challengeId: string) => void
  onRefreshData: () => void
}

interface ChallengeListState {
  detailsDialogSubstate: {
    challengeId: string
    challengeName: string
    challengeDescription: string
  } | null
}

export class ChallengeList extends React.Component<ChallengeListProps, ChallengeListState> {
  public constructor(props: ChallengeListProps) {
    super(props)
    this.state = {
      detailsDialogSubstate: null,
    }
  }
  public handleOpenDetailsDialog = (challengeId: string, challengeName: string, challengeDescription: string) => {
    this.setState({
      detailsDialogSubstate: {
        challengeId,
        challengeName,
        challengeDescription,
      },
    })
  }
  public handleExitDetailsDialog = () => {
    this.setState({ detailsDialogSubstate: null })
  }
  public handleLeaveChallenge = (challengeId: string) => {
    callMainApi('POST', `/api/leave-challenge/${challengeId}`).then(() => {
      this.setState({ detailsDialogSubstate: null }, () => {
        this.props.onRefreshData()
      })
    })
  }
  public renderRoundCount(completedRoundCount: number, totalRoundCount: number) {
    return (
      <AggregateTagWrapper>
        <AggregateTagSpacer />
        <AggregateTag style={{ backgroundColor: Colors.theme3, width: '100%' }}>
          <AggregateText>
            {completedRoundCount}/{totalRoundCount} completed
          </AggregateText>
        </AggregateTag>
      </AggregateTagWrapper>
    )
  }
  public renderCountFalseAggregate(countFalse: number) {
    return (
      <AggregateTagWrapper>
        <AggregateTagSpacer />
        <AggregateTag style={{ backgroundColor: Colors.dangerBackground, width: '100%' }}>
          <AggregateText>{countFalse} failures</AggregateText>
        </AggregateTag>
      </AggregateTagWrapper>
    )
  }
  public renderCountTrueAggregate(countTrue: number) {
    return (
      <AggregateTagWrapper>
        <AggregateTagSpacer />
        <AggregateTag style={{ backgroundColor: Colors.successBackground, width: '100%' }}>
          <AggregateText>{countTrue} successes</AggregateText>
        </AggregateTag>
      </AggregateTagWrapper>
    )
  }
  public renderSumAggregate(sum: number) {
    return (
      <AggregateTagWrapper>
        <AggregateTagSpacer />
        <AggregateTag style={{ backgroundColor: Colors.primaryBackground, width: '100%' }}>
          <AggregateText>{sum} total</AggregateText>
        </AggregateTag>
      </AggregateTagWrapper>
    )
  }
  public renderMaxAggregate(max: number) {
    return (
      <AggregateTagWrapper>
        <AggregateTagSpacer />
        <AggregateTag style={{ backgroundColor: Colors.primaryBackground, width: '100%' }}>
          <AggregateText>{max} max</AggregateText>
        </AggregateTag>
      </AggregateTagWrapper>
    )
  }
  public render() {
    return (
      <>
        <MainScrollContainer>
          {this.props.challenges.length > 0 ? (
            <CenterContainer width={600}>
              <ChallengeElementWrapper>
                {this.props.challenges.map(challenge => (
                  <ChallengeElement key={challenge.id} onClick={() => this.handleOpenDetailsDialog(challenge.id, challenge.name, challenge.challengeDescription)}>
                    <div style={{ flexBasis: 130, flexGrow: 1 }}>
                      <ChallengeName>{challenge.name}</ChallengeName>
                      <ChallengeDescription>{challenge.challengeDescription}</ChallengeDescription>
                    </div>
                    <div style={{ flexBasis: 130, flexGrow: 0, position: 'relative' }}>
                      {this.renderRoundCount(challenge.completedRoundCount, challenge.totalRoundCount)}
                      {challenge.roundAggregationType === 'countTrue' && this.renderCountTrueAggregate(challenge.completedRoundAggregate)}
                      {challenge.roundAggregationType === 'countFalse' && this.renderCountFalseAggregate(challenge.completedRoundAggregate)}
                      {challenge.roundAggregationType === 'sum' && this.renderSumAggregate(challenge.completedRoundAggregate)}
                      {challenge.roundAggregationType === 'max' && this.renderMaxAggregate(challenge.completedRoundAggregate)}
                    </div>
                  </ChallengeElement>
                ))}
              </ChallengeElementWrapper>
            </CenterContainer>
          ) : (
            <MainEmptyState />
          )}
        </MainScrollContainer>
        {this.state.detailsDialogSubstate && (
          <DarkOverlay onClick={this.handleExitDetailsDialog}>
            <ChallengeDetailsDialog
              challengeName={this.state.detailsDialogSubstate.challengeName}
              challengeDescription={this.state.detailsDialogSubstate.challengeDescription}
              onLeave={() => this.handleLeaveChallenge(this.state.detailsDialogSubstate!.challengeId)}
              onAddUsers={() => {
                if (this.props.onClickAddUsers) {
                  this.props.onClickAddUsers(this.state.detailsDialogSubstate!.challengeId)
                }
              }}
            />
          </DarkOverlay>
        )}
        {this.props.createChallengeEnabled && (
          <CreateButton onClick={this.props.onClickCreateChallenge}>
            <PlusWhite style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }} />
          </CreateButton>
        )}
      </>
    )
  }
}
