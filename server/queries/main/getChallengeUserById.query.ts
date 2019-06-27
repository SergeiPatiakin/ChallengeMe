// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */

import { buildQueryWithUniqueResult } from '../queryHelper'

export interface Arguments {
  id: string
}

export interface Result {
  challengeId: string
}

export const getChallengeUserById = buildQueryWithUniqueResult<Arguments, Result>(__filename)
