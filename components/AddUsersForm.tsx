import React from 'react'
import { callMainApi } from '../utils/clientUtils'
import { UserList } from './UserList'

interface AddUsersFormProps {
  challengeId: string
  onDone: () => void
}

interface AddUsersFormState {
  users: Array<{
    id: string
    name: string
    isChallengeMember: boolean
  }>
}

export class AddUsersForm extends React.Component<AddUsersFormProps, AddUsersFormState> {
  constructor(props: AddUsersFormProps) {
    super(props)
    this.state = {
      users: [],
    }
  }
  public componentDidMount() {
    callMainApi('GET', `/api/users-for-challenge/${this.props.challengeId}`)
      .then(response => response.json())
      .then((responseJson: any) => {
        this.setState({ users: responseJson.users })
      })
  }
  public handleAddUsers = (userIds: Set<string>) => {
    callMainApi('POST', `/api/add-users-to-challenge/${this.props.challengeId}`, {
      userIds: [...userIds],
    }).then(() => {
      this.props.onDone()
    })
  }
  public render() {
    return <UserList users={this.state.users.map(u => ({ ...u, isDisabled: u.isChallengeMember }))} multiSelectable={true} onMultiSelect={this.handleAddUsers} />
  }
}
