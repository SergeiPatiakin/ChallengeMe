--@arg curId: string
--@unique
--@return userName: string
--@return challengeName: string
SELECT
  up.name user_name,
  c.name challenge_name
FROM
  challenge_user_rounds cur
  JOIN challenge_users cu ON cu.id = cur.challenge_user_id
  JOIN challenges c ON c.id = cu.challenge_id
  JOIN user_profiles up ON up.user_id = cu.user_id
WHERE
  cur.id = :curId::bigint