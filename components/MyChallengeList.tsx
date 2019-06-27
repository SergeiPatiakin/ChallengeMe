import React from 'react'
import * as dt from '../common/DataTypes'
import { callMainApi } from '../utils/clientUtils'
import { ChallengeList } from './ChallengeList'

interface MyChallengeListProps {
  onClickCreateChallenge?: () => void
  onClickAddUsers: (challengeId: string) => void
}

interface MyChallengeListState {
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
}

export class MyChallengeList extends React.Component<MyChallengeListProps, MyChallengeListState> {
  constructor(props: MyChallengeListProps) {
    super(props)
    this.state = {
      challenges: [],
    }
  }
  public handleRefreshData = () => {
    callMainApi('GET', '/api/my-challenges')
      .then(response => response.json())
      .then((responseJson: any) => {
        this.setState({ challenges: responseJson.challenges })
      })
  }
  public componentDidMount() {
    this.handleRefreshData()
  }
  public render() {
    return (
      <ChallengeList
        challenges={this.state.challenges}
        onClickCreateChallenge={this.props.onClickCreateChallenge}
        onClickAddUsers={this.props.onClickAddUsers}
        onRefreshData={this.handleRefreshData}
        createChallengeEnabled={true}
      />
    )
  }
}
