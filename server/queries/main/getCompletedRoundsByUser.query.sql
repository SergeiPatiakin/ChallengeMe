--@arg userId: string
select
  --@return curId: string
  cur.id cur_id,
  --@return roundId: string
  r.id round_id,
  --@return challengeId: string
  c.id challenge_id,
  --@return challengeUserId: string
  cu.id challenge_user_id,
  --@return challengeName: string
  c.name challenge_name,
  --@return roundDescription: string
  c.round_description round_description,
  --@return roundResultType: string
  c.round_result_type round_result_type,
  --@return startTime: dt.Moment
  r.start_time start_time,
  --@return endTime: dt.Moment
  r.end_time end_time,
  --@return resultBoolean: boolean | null
  cur.result_boolean,
  --@return resultFloat: number | null
  cur.result_float,
  --@return isCompleted: boolean
  cur.is_completed
from challenge_user_rounds cur
join challenge_users cu
  on cur.challenge_user_id = cu.id
join rounds r
  on cur.round_id = r.id
join challenges c
  on cu.challenge_id = c.id
where
  cu.user_id=:userId
  and cur.is_completed
order by cur.updated_date desc