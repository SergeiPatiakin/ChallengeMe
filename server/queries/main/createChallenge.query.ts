// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */
import * as dt from '../../../common/DataTypes'
import { buildQueryWithUniqueResult } from '../queryHelper'

export interface Arguments {
  userId: string
  name: string
  challengeDescription: string
  roundDescription: string
  roundFrequency: dt.RoundFrequency
  roundResultType: dt.RoundResultType
  roundAggregationType: dt.RoundAggregationType
}

export interface Result {
  id: string
}

export const createChallenge = buildQueryWithUniqueResult<Arguments, Result>(__filename)
