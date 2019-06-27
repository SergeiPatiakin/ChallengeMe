// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */

import { buildQuery } from '../queryHelper'

export interface Arguments {
  curId: string
}

export interface Result {
  userId: string // for debugging
  subscription: any
}

export const getSubscriptionsByChallengeUserRound = buildQuery<Arguments, Result>(__filename)
