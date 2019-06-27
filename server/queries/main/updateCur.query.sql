--@arg userId: string
--@arg curId: string
--@arg isCompleted: boolean
--@arg resultBoolean: boolean | null
--@arg resultFloat: number | null
--@unique
--@return id: string
--@return challengeUserId: string
UPDATE challenge_user_rounds cur SET
  is_completed=:isCompleted,
  result_boolean=:resultBoolean,
  result_float=:resultFloat,
  updated_date=now()
FROM challenge_users cu
WHERE cu.id = cur.challenge_user_id
AND cur.id = :curId
AND cu.user_id = :userId
RETURNING cur.id, cur.challenge_user_id