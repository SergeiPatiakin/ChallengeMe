import React from 'react'
import styled from 'styled-components'
import * as Colors from '../common/Colors'
import { DropdownArrow } from './Icons'

export const DropdownResult = styled.div`
  border: 1px solid ${Colors.theme4};
  border-radius: 3px;
  font-size: 14px;
  width: 100%;
  padding: 2px;
  cursor: pointer;
  position: relative;
`

const DropdownList = styled.div`
  background-color: #eee;
  border: 1px solid ${Colors.theme4};
  border-radius: 3px;
  font-size: 14px;
  width: 100%;
  padding: 2px;
  cursor: pointer;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 100;
`

const DropdownListElement = styled.div``

export const DropdownArrowWrapper = styled.div`
  position: absolute;
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
`

interface DropdownProps {
  options: Array<{ key: string; label: string }>
  defaultKey: string
  onOptionSelected: (selectedKey: string, optionIndex: number) => void
}

interface DropdownState {
  active: boolean
  selectedIndex: number
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
  private dropdownListRef: React.RefObject<any>
  constructor(props: DropdownProps) {
    super(props)
    this.dropdownListRef = React.createRef()
    this.state = {
      active: false,
      selectedIndex: props.options.findIndex(option => option.key === props.defaultKey),
    }
  }
  public handleResultClick = () => {
    this.setState({ active: true })
  }
  public handleSelectOption = (key: string, index: number) => {
    this.setState({ selectedIndex: index, active: false }, () => {
      this.props.onOptionSelected(key, index)
    })
  }
  public handleBlur = () => {
    this.setState({ active: false })
  }
  public componentDidUpdate(_prevProps: DropdownProps, prevState: DropdownState) {
    if (this.state.active && !prevState.active && this.dropdownListRef.current) {
      this.dropdownListRef.current.focus()
    }
  }
  public render() {
    return (
      <DropdownResult onClick={this.handleResultClick}>
        {this.props.options[this.state.selectedIndex].label}
        <DropdownArrowWrapper>
          <DropdownArrow width={8} height={8} />
        </DropdownArrowWrapper>
        {this.state.active && (
          <DropdownList tabIndex={1} ref={this.dropdownListRef} onBlur={this.handleBlur}>
            {this.props.options.map((option, idx) => (
              <DropdownListElement
                key={idx}
                onClick={e => {
                  e.stopPropagation()
                  this.handleSelectOption(option.key, idx)
                }}
              >
                {option.label}
              </DropdownListElement>
            ))}
          </DropdownList>
        )}
      </DropdownResult>
    )
  }
}
