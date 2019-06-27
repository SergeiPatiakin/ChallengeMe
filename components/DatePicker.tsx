import moment, { Moment } from 'moment'
import React, { CSSProperties } from 'react'
import styled from 'styled-components'

import * as Colors from '../common/Colors'
import { LeftArrow, RightArrow } from './Icons'

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-left: 10px;
  padding-right: 20px;
  padding-top: 4px;
  height: 164px;
`

const Header = styled.div`
  display: flex;
  justify-content: center;
`

const MonthText = styled.div`
  margin-top: 0px;
  margin-bottom: 0px;
  color: ${Colors.theme4};
  width: 80px;
  text-align: center;
`

const MonthChangeButton = styled.div`
  cursor: pointer;
`

const Grid = styled.div``

const WeekDiv = styled.div`
  display: flex;
`

const DayDiv = styled.div`
  width: 30px;
  text-align: right;
`

interface DatePickerProps {
  startDate: Moment
  onSelectResult: (moment: Moment) => void
}

interface DatePickerState {
  monthOffset: number
}

function getWeeksInMonth(date: Moment): Moment[][] {
  // Get the first and last day of the month
  const firstDay = moment(date)
    .startOf('month')
    .startOf('week')
  const endDay = moment(date)
    .endOf('month')
    .endOf('week')
  const weeks: Moment[][] = []
  let currentWeek = -1
  for (const day = firstDay.clone(); day <= endDay; day.add(1, 'day')) {
    if (day.week() !== currentWeek) {
      weeks.push([day.clone()])
    } else {
      weeks[weeks.length - 1].push(day.clone())
    }
    currentWeek = day.week()
  }
  return weeks
}

function dayDivStyle(active: boolean): CSSProperties {
  if (active) {
    return {
      cursor: 'pointer',
    }
  } else {
    return {
      color: '#ccc',
    }
  }
}

export class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  constructor(props: DatePickerProps) {
    super(props)
    this.state = {
      monthOffset: 0,
    }
  }
  public handleNextMonth = () => {
    this.setState({ monthOffset: this.state.monthOffset + 1 })
  }
  public handlePreviousMonth = () => {
    this.setState({ monthOffset: this.state.monthOffset - 1 })
  }
  public render() {
    const newCenter = moment(this.props.startDate).add(this.state.monthOffset, 'months')
    const weeks = getWeeksInMonth(newCenter)
    return (
      <Container>
        <Header>
          <MonthChangeButton onClick={this.handlePreviousMonth}>
            <LeftArrow color={Colors.theme4} />
          </MonthChangeButton>
          <MonthText>{newCenter.format('MMM YYYY')}</MonthText>
          <MonthChangeButton onClick={this.handleNextMonth}>
            <RightArrow color={Colors.theme4} />
          </MonthChangeButton>
        </Header>
        <Grid>
          {weeks.map((week, weekIdx) => (
            <WeekDiv key={weekIdx}>
              {week.map((day, dayIdx) => {
                const active = day.month() === newCenter.month()
                return (
                  <DayDiv
                    key={dayIdx}
                    onClick={
                      active
                        ? () => {
                            this.props.onSelectResult(day)
                          }
                        : undefined
                    }
                    style={dayDivStyle(active)}
                  >
                    {day.date()}
                  </DayDiv>
                )
              })}
            </WeekDiv>
          ))}
        </Grid>
      </Container>
    )
  }
}
