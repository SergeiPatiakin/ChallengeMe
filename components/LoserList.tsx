import React from 'react'
import { callMainApi } from '../utils/clientUtils'
import { UserList } from './UserList'

interface LoserListProps {}

interface LoserListState {
  users: Array<{
    id: string
    name: string
  }>
}

export class LoserList extends React.Component<LoserListProps, LoserListState> {
  constructor(props: LoserListProps) {
    super(props)
    this.state = {
      users: [],
    }
  }
  public componentDidMount() {
    callMainApi('GET', '/api/all-users')
      .then(response => response.json())
      .then((responseJson: any) => {
        this.setState({ users: responseJson.users })
      })
  }
  public render() {
    return <UserList users={this.state.users.map(u => ({ ...u, isDisabled: false }))} multiSelectable={false} />
  }
}
