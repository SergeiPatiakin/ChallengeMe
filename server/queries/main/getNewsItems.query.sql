--@arg userId: string
WITH common_cus AS (
  SELECT
    cu1.id,
    cu1.user_id,
    cu1.challenge_id
  FROM
    challenge_users cu1
  JOIN
    challenges c ON cu1.challenge_id = c.id
  JOIN 
    challenge_users cu2 ON c.id = cu2.challenge_id
  WHERE
    cu2.user_id = :userId::bigint
    AND cu1.user_id <> :userId::bigint
)
  SELECT
    --@return loserName: string
    u.name loser_name,
    --@return challengeName: string
    c.name challenge_name,
    --@return roundResultType: dt.RoundResultType
    c.round_result_type round_result_type,
    --@return startTime: dt.Moment
    r.start_time,
    --@return endTime: dt.Moment
    r.end_time,
    --@return resultBoolean: boolean | null
    cur.result_boolean,
    --@return resultFloat: number | null
    cur.result_float,
    --@return updatedTime: dt.Moment
    cur.updated_date
  FROM
    common_cus cu
  JOIN challenge_user_rounds cur
    ON cur.challenge_user_id = cu.id
  JOIN challenges c
    ON cu.challenge_id = c.id
  JOIN rounds r
    ON cur.round_id = r.id
  JOIN user_profiles u
    ON cu.user_id = u.user_id
  WHERE
    cur.is_completed
  ORDER BY
    cur.updated_date DESC
  LIMIT 20