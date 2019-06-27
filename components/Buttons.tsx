import styled from 'styled-components'
import * as Colors from '../common/Colors'

export const GenericButton = styled.div`
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 4px;
  padding-top: 4px;
`

export const PrimaryButton = styled(GenericButton)`
  background-color: ${Colors.theme4};
  color: #ffffff;
`

export const SecondaryButton = styled(GenericButton)`
  background-color: ${Colors.theme3};
  color: #ffffff;
`

export const DangerButton = styled(GenericButton)`
  background-color: ${Colors.dangerBackground};
  color: #ffffff;
`

export const PrimarySubmitButton = styled.input`
  background-color: ${Colors.theme4};
  color: #ffffff;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 4px;
  padding-top: 4px;
`
