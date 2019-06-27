--@arg curId: string
--@return userId: string // for debugging
--@return subscription: any
SELECT
  up.user_id,
  up.subscription
FROM
  challenge_user_rounds cur
  JOIN challenge_users cu1 ON cur.challenge_user_id = cu1.id
  JOIN challenge_users cu2 ON cu1.challenge_id = cu2.challenge_id
  JOIN user_profiles up ON up.user_id = cu2.user_id
WHERE
  cur.id = :curId::bigint
  AND cu1.id <> cu2.id -- Don't send notifications to yourself