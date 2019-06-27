// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */

import { buildQueryWithUniqueResult } from '../queryHelper'

export interface Arguments {
  id: string
}

export interface Result {
  id: string
  email: string
  authMethod: string
  passwordHash: string
  name: string
}

export const getUser = buildQueryWithUniqueResult<Arguments, Result>(__filename)
