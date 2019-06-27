// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */
import * as dt from '../../../common/DataTypes'
import { buildQuery } from '../queryHelper'

export interface Arguments {
  userId: string
}

export interface Result {
  curId: string
  roundId: string
  challengeId: string
  challengeUserId: string
  challengeName: string
  roundDescription: string
  roundResultType: string
  startTime: dt.Moment
  endTime: dt.Moment
  resultBoolean: boolean | null
  resultFloat: number | null
  isCompleted: boolean
}

export const getPendingRoundsByUser = buildQuery<Arguments, Result>(__filename)
