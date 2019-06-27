import * as t from 'io-ts'
import moment, { Moment } from 'moment'

export const RoundFrequencyType = t.union([t.literal('daily'), t.literal('weekly')])
export type RoundFrequency = t.TypeOf<typeof RoundFrequencyType>

export const RoundResultTypeType = t.union([t.literal('float'), t.literal('boolean')])
export type RoundResultType = t.TypeOf<typeof RoundResultTypeType>

export const RoundAggregationTypeType = t.union([t.literal('countTrue'), t.literal('countFalse'), t.literal('sum'), t.literal('max')])
export type RoundAggregationType = t.TypeOf<typeof RoundAggregationTypeType>

export const AppSettingsType = t.type({
  darkMode: t.boolean,
})
export type AppSettings = t.TypeOf<typeof AppSettingsType>

// Re-export so it can be used by codegen
export type Moment = Moment

export const MomentType = t.refinement(t.any, m => moment.isMoment(m), 'MomentType')

export const MomentFromStringType = new t.Type<Moment, string>(
  'MomentFromString',
  (input): input is Moment => MomentType.is(input),
  (input, ctx) =>
    MomentType.validate(input, ctx).orElse(() =>
      t.string.validate(input, ctx).chain(str => {
        const date = moment.utc(str)
        return date.isValid() ? t.success(date) : t.failure(str, ctx)
      })
    ),
  date => date.toJSON()
)
export type MomentFromString = t.TypeOf<typeof MomentFromStringType>
