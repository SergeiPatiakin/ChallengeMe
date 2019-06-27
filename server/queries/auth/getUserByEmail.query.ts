// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */

import { buildQuery } from '../queryHelper'

export interface Arguments {
  email: string
}

export interface Result {
  id: string
  email: string
  authMethod: string
  passwordHash: string
  name: string
}

export const getUserByEmail = buildQuery<Arguments, Result>(__filename)
