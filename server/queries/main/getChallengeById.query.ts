// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */
import * as dt from '../../../common/DataTypes'
import { buildQueryWithUniqueResult } from '../queryHelper'

export interface Arguments {
  id: string
}

export interface Result {
  roundAggregationType: dt.RoundAggregationType
}

export const getChallengeById = buildQueryWithUniqueResult<Arguments, Result>(__filename)
