import React from 'react'
import styled from 'styled-components'
import { HamburgerMenu, RightChevron } from '../components/Icons'
import { Overlay } from '../components/Overlay'
import { Sidebar } from '../components/Sidebar'
import { TopBar } from '../components/TopBar'

const TitleContainer = styled.div`
  position: absolute;
  left: 32px;
  top: 0px;
  height: 32px;
  display: flex;
  align-items: center;
`

const PageTitleText = styled.h1`
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 4px;
  margin-right: 4px;
  font-size: 18px;
  line-height: 18px;
  color: #ffffff;
  display: inline;
`

interface AppContainerProps {
  titleParts: string[]
}

interface AppContainerState {
  sidebarOpen: boolean
}

class AppContainer extends React.Component<AppContainerProps, AppContainerState> {
  public constructor(props: AppContainerProps) {
    super(props)
    this.state = {
      sidebarOpen: false,
    }
  }
  public handleToggleSidebar = (e: any) => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
  }
  public handleCloseSidebar = (e: any) => {
    this.setState({ sidebarOpen: false })
  }
  public render() {
    return (
      <>
        <TopBar>
          <div onClick={this.handleToggleSidebar} style={{ cursor: 'pointer', position: 'absolute', left: 8, top: 7, height: 16 }}>
            <HamburgerMenu />
          </div>
          <TitleContainer>
            {this.props.titleParts.map((titlePart, idx) => (
              <React.Fragment key={idx}>
                <RightChevron />
                <PageTitleText>{titlePart}</PageTitleText>
              </React.Fragment>
            ))}
          </TitleContainer>
        </TopBar>
        {this.state.sidebarOpen && (
          <>
            <Overlay onClick={this.handleCloseSidebar} />
            <Sidebar />
          </>
        )}
        {this.props.children}
      </>
    )
  }
}

export default AppContainer
