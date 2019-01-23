// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */

import { buildQueryWithUniqueResult } from '../queryHelper'

export interface Arguments {
  a: number
  b: number
}

export interface Result {
  result: number
}

export const addNumbers = buildQueryWithUniqueResult<Arguments, Result>(__filename)
