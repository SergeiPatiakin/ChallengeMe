--@arg challengeId: string
--@arg userId: string
WITH delete_challenge_user AS (
  UPDATE challenge_users
    SET is_deleted = true
  WHERE challenge_id = :challengeId
  AND user_id = :userId
  RETURNING id
)
DELETE FROM challenge_user_rounds cur
USING delete_challenge_user dcu
WHERE cur.challenge_user_id = dcu.id
AND NOT cur.is_completed