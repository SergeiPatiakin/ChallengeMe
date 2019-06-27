// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */

import { buildQuery } from '../queryHelper'

export interface Arguments {}

export interface Result {
  id: string
  name: string
}

export const getAllUsers = buildQuery<Arguments, Result>(__filename)
