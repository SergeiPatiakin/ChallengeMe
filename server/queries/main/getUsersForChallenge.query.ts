// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */

import { buildQuery } from '../queryHelper'

export interface Arguments {
  challengeId: string
}

export interface Result {
  id: string
  name: string
  isChallengeMember: boolean
}

export const getUsersForChallenge = buildQuery<Arguments, Result>(__filename)
