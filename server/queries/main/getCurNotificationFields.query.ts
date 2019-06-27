// WARNING: THIS CODE IS AUTO-GENERATED. ANY MANUAL EDITS WILL BE OVERWRITTEN WITHOUT WARNING
/* tslint:disable */

import { buildQueryWithUniqueResult } from '../queryHelper'

export interface Arguments {
  curId: string
}

export interface Result {
  userName: string
  challengeName: string
}

export const getCurNotificationFields = buildQueryWithUniqueResult<Arguments, Result>(__filename)
