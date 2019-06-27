// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */
import * as dt from '../../../common/DataTypes'
import { buildQuery } from '../queryHelper'

export interface Arguments {
  userId: string
  isOwner: boolean
  challengeId: string
  earliestEndTime: dt.Moment
}

export interface Result {}

export const addUserToChallenge = buildQuery<Arguments, Result>(__filename)
