// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */
import * as dt from '../../../common/DataTypes'
import { buildQuery } from '../queryHelper'

export interface Arguments {
  rounds: Array<{ challengeId: string; startTime: dt.Moment; endTime: dt.Moment }>
}

export interface Result {
  id: string
}

export const multiCreateRound = buildQuery<Arguments, Result>(__filename)
