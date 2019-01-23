import React from 'react'
import styled from 'styled-components'

const StatusComponentDiv = styled.div`
  color: white;
  cursor: pointer;
  border-radius: 3px;
  padding: 6px;
  width: 100px;
`

interface StatusComponentState {
  isOk: boolean | null
}

const getBackgroundColor = (status: boolean | null) => {
  if (status === true) {
    return 'green'
  } else if (status === false) {
    return 'red'
  } else {
    return 'grey'
  }
}

const getMessage = (status: boolean | null) => {
  if (status === true) {
    return 'OK'
  } else if (status === false) {
    return 'Not OK'
  } else {
    return 'Waiting...'
  }
}

export class StatusComponent extends React.Component<{}, StatusComponentState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      isOk: false,
    }
  }
  public handleClick = () => {
    this.setState({ isOk: null }, () => {
      return fetch('/dummy/add-numbers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ a: 3, b: 4 }),
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ isOk: responseJson.result === 7 })
        })
        .catch(err => {
          this.setState({ isOk: false })
        })
    })
  }
  public render() {
    return (
      <StatusComponentDiv style={{ backgroundColor: getBackgroundColor(this.state.isOk) }} onClick={(event: any) => this.handleClick()}>
        {getMessage(this.state.isOk)}
      </StatusComponentDiv>
    )
  }
}
