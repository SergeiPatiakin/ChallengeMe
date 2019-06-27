import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

import * as Colors from '../common/Colors'
import { callMainApi, logout } from '../utils/clientUtils'

const StyledSidebar = styled.div`
  z-index: 200;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 160px;
  height: 100%;
  box-shadow: 2px 0px 5px 0px rgba(128, 128, 128, 1);

  background-color: ${Colors.theme2};
`

const NameLabel = styled.p`
  margin-top: 0px;
  margin-bottom: 4px;
  margin-left: 16px;
  color: ${Colors.theme5};
  font-weight: bold;
`

const PageLinkLabel = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 16px;
  color: ${Colors.theme4};
  cursor: pointer;
`

interface SidebarState {
  userName: string
}

export class Sidebar extends React.Component<{}, SidebarState> {
  constructor(props: any) {
    super(props)
    this.state = {
      userName: '',
    }
  }
  public componentDidMount() {
    callMainApi('GET', '/api/current-user')
      .then(response => response.json())
      .then(user => {
        this.setState({
          userName: user.name,
        })
      })
  }
  public render() {
    return (
      <StyledSidebar>
        <img src="/static/challenge-accepted.svg" width={60} height={60} style={{ marginTop: '16px', marginLeft: '9px' }} />
        <NameLabel>{this.state.userName}</NameLabel>
        <Link href="/">
          <PageLinkLabel>Newsfeed</PageLinkLabel>
        </Link>
        <Link href="/pendingrounds">
          <PageLinkLabel>Add Results</PageLinkLabel>
        </Link>
        <Link href="/mychallenges">
          <PageLinkLabel>Challenges</PageLinkLabel>
        </Link>
        <Link href="/completedrounds">
          <PageLinkLabel>History</PageLinkLabel>
        </Link>
        <Link href="/losers">
          <PageLinkLabel>Losers</PageLinkLabel>
        </Link>
        <p />
        <Link href="/account">
          <PageLinkLabel>Account</PageLinkLabel>
        </Link>
        <PageLinkLabel onClick={logout}>Log out</PageLinkLabel>
      </StyledSidebar>
    )
  }
}
