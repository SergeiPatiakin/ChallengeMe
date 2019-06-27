import React from 'react'
import styled from 'styled-components'
import * as Colors from '../common/Colors'
import { PrimaryButton } from './Buttons'
import { CenterContainer, MainScrollContainer } from './Containers'

const UserElementWrapper = styled.div``
const GenericUserElement = styled.div`
  border-radius: 3px;
  margin: 4px;
  padding-left: 4px;

  height: 92px;
  max-height: 92px;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
`

const RegularUserElement = styled(GenericUserElement)`
  border: 1px ${Colors.theme3} solid;
  cursor: pointer;
`

const SelectedUserElement = styled(GenericUserElement)`
  border: 1px ${Colors.theme3} solid;
  cursor: pointer;
  box-shadow: 0px 0px 5px #0000ee;
`

const DisabledUserElement = styled(GenericUserElement)`
  border: 1px ${Colors.disabledBorder} solid;
  cursor: default;
`

const UserBadge = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 80px;
  background-color: #ccc;
  position: relative;
`
const UserNameText = styled.p`
  text-align: center;
  margin-top: 0px;
  margin-bottom: 0px;
`

const UserBadgeInitials = styled.p`
  text-align: center;
  line-height: 80px;
  margin: 0px;
  font-size: 48px;
  font-weight: bold;
  color: #fff;
`

const DoneButton = styled(PrimaryButton)`
  margin-left: 6px;
  margin-right: 6px;
  width: 100px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

interface UserListProps {
  users: Array<{
    id: string
    name: string
    isDisabled: boolean
  }>
  multiSelectable: boolean
  onMultiSelect?: (userIds: Set<string>) => void
}

interface UserListState {
  selectedUsers: Set<string>
}

export class UserList extends React.Component<UserListProps, UserListState> {
  constructor(props: UserListProps) {
    super(props)
    this.state = {
      selectedUsers: new Set(),
    }
  }
  public handleToggleSelection = (userId: string) => {
    const newSelectedUsers = new Set(this.state.selectedUsers)
    if (newSelectedUsers.has(userId)) {
      newSelectedUsers.delete(userId)
    } else {
      newSelectedUsers.add(userId)
    }
    this.setState({ selectedUsers: newSelectedUsers })
  }
  public render() {
    return (
      <MainScrollContainer>
        <CenterContainer width={600}>
          <>
            <UserElementWrapper>
              {this.props.users.map(user => {
                const userId = user.id
                const userElementContents = (
                  <>
                    <UserBadge>
                      <UserBadgeInitials>{user.name.substr(0, 1).toUpperCase()}</UserBadgeInitials>
                    </UserBadge>
                    <div style={{ paddingLeft: '8px' }}>
                      <UserNameText>{user.name}</UserNameText>
                    </div>
                  </>
                )
                if (user.isDisabled) {
                  return <DisabledUserElement key={userId}>{userElementContents}</DisabledUserElement>
                } else if (this.state.selectedUsers.has(user.id)) {
                  return (
                    <SelectedUserElement key={userId} onClick={this.props.multiSelectable ? () => this.handleToggleSelection(userId) : undefined}>
                      {userElementContents}
                    </SelectedUserElement>
                  )
                } else {
                  // enabled but not selected
                  return (
                    <RegularUserElement key={userId} onClick={this.props.multiSelectable ? () => this.handleToggleSelection(userId) : undefined}>
                      {userElementContents}
                    </RegularUserElement>
                  )
                }
              })}
            </UserElementWrapper>
            {this.props.multiSelectable && <DoneButton onClick={this.props.onMultiSelect ? () => this.props.onMultiSelect!(this.state.selectedUsers) : undefined}>Done</DoneButton>}
          </>
        </CenterContainer>
      </MainScrollContainer>
    )
  }
}
