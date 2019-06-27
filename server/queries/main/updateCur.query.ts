// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */

import { buildQueryWithUniqueResult } from '../queryHelper'

export interface Arguments {
  userId: string
  curId: string
  isCompleted: boolean
  resultBoolean: boolean | null
  resultFloat: number | null
}

export interface Result {
  id: string
  challengeUserId: string
}

export const updateCur = buildQueryWithUniqueResult<Arguments, Result>(__filename)
