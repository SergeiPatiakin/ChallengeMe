import styled from 'styled-components'
import { TOP_BAR_HEIGHT } from './TopBar'

export const MainScrollContainer = styled.div`
  height: calc(100% - ${TOP_BAR_HEIGHT}px);
  overflow-y: auto;
`

const Container = styled.div`
  display: flex;
`

const CenterPane = styled.div`
  flex-basis: ${({ width }: { width: number }) => width}px;
  flex-grow: 0;
  flex-shrink: 1;
`

const EdgePane = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 0;
`

export const CenterContainer = ({ children, width }: { children: JSX.Element | JSX.Element[]; width: number }) => (
  <Container>
    <EdgePane />
    <CenterPane width={width}>{children}</CenterPane>
    <EdgePane />
  </Container>
)
