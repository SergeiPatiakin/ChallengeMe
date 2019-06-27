// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */
import * as dt from '../../../common/DataTypes'
import { buildQuery } from '../queryHelper'

export interface Arguments {
  userId: string
}

export interface Result {
  loserName: string
  challengeName: string
  roundResultType: dt.RoundResultType
  startTime: dt.Moment
  endTime: dt.Moment
  resultBoolean: boolean | null
  resultFloat: number | null
  updatedTime: dt.Moment
}

export const getNewsItems = buildQuery<Arguments, Result>(__filename)
