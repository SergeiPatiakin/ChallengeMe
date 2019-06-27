import React from 'react'
import { AddUsersForm } from '../components/AddUsersForm'
import AppContainer from '../components/AppContainer'
import { CreateChallengeForm } from '../components/CreateChallengeForm'
import { MyChallengeList } from '../components/MyChallengeList'

interface ChallengesPageState {
  view: 'list' | 'create' | 'addusers'
  challengeId: string | null
}
export default class ChallengesPage extends React.Component<{}, ChallengesPageState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      view: 'list',
      challengeId: null,
    }
  }
  public handleClickCreateChallenge = () => {
    this.setState({ view: 'create', challengeId: null })
  }
  public handleClickAddUsers = (challengeId: string) => {
    this.setState({ view: 'addusers', challengeId })
  }
  public handleCreateChallengeCompleted = (challengeId: string) => {
    this.setState({ view: 'addusers', challengeId })
  }
  public handleCreateChallengeCancelled = () => {
    this.setState({ view: 'list', challengeId: null })
  }
  public handleAddUsersCompleted = () => {
    this.setState({ view: 'list', challengeId: null })
  }
  public renderTitleParts(): string[] {
    if (this.state.view === 'create') {
      return ['Challenges', 'Create']
    } else if (this.state.view === 'addusers') {
      return ['Challenges', 'Add Losers']
    } else {
      // 'list'
      return ['Challenges', 'My Challenges']
    }
  }
  public render() {
    return (
      <AppContainer titleParts={this.renderTitleParts()}>
        {this.state.view === 'list' && <MyChallengeList onClickCreateChallenge={this.handleClickCreateChallenge} onClickAddUsers={this.handleClickAddUsers} />}
        {this.state.view === 'create' && <CreateChallengeForm onComplete={this.handleCreateChallengeCompleted} onCancel={this.handleCreateChallengeCancelled} />}
        {this.state.view === 'addusers' && <AddUsersForm challengeId={this.state.challengeId!} onDone={this.handleAddUsersCompleted} />}
      </AppContainer>
    )
  }
}
