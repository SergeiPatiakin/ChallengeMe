// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */
import * as dt from '../../../common/DataTypes'
import { buildQuery } from '../queryHelper'

export interface Arguments {
  userId: string
}

export interface Result {
  id: string
  userId: string
  name: string
  challengeDescription: string
  roundDescription: string
  roundFrequency: dt.RoundFrequency
  roundResultType: dt.RoundResultType
  roundAggregationType: dt.RoundAggregationType
  totalRoundCount: number
  completedRoundCount: number
  completedRoundAggregate: number
}

export const getChallengesByUser = buildQuery<Arguments, Result>(__filename)
