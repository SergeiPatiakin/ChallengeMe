// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */

import { buildQuery } from '../queryHelper'

export interface Arguments {
  id: string
  email: string
  authMethod: string
  passwordHash: string
  name: string
}

export interface Result {}

export const updateUser = buildQuery<Arguments, Result>(__filename)
