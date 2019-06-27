import styled from 'styled-components'
import * as Colors from '../common/Colors'

export const TOP_BAR_HEIGHT = 32

export const TopBar = styled.div`
  z-index: 50;
  background-color: ${Colors.theme1};
  color: #ffffff;
  height: ${TOP_BAR_HEIGHT}px;
`
