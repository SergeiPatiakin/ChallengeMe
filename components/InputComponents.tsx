import styled from 'styled-components'
import * as Colors from '../common/Colors'

export const InputWrapper = styled.div`
  position: relative;
  margin-left: 6px;
  margin-right: 6px;
  margin-top: 6px;
  margin-bottom: 6px;
`

export const InputTitle = styled.p`
  font-size: 10px;
  font-weight: bold;
  margin-top: 0px;
  margin-bottom: 2px;
`

export const InputError = styled.p`
  font-size: 10px;
  margin-top: 0px;
  margin-bottom: 2px;
  color: ${Colors.dangerText};
`

export const TextInput = styled.input`
  border: 1px solid ${Colors.theme4};
  border-radius: 3px;
  font-size: 14px;
  width: 100%;
  padding: 2px;
`
