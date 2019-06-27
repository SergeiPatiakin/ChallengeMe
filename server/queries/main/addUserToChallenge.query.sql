--@arg userId: string
--@arg isOwner: boolean
--@arg challengeId: string
--@arg earliestEndTime: dt.Moment
WITH add_challenge_user AS (
  INSERT INTO challenge_users(
    challenge_id,
    user_id,
    is_owner,
    completed_round_count,
    completed_round_aggregate
  ) VALUES (
    :challengeId,
    :userId,
    :isOwner,
    0,
    -- Assume the initial aggregate value is zero
    0
  ) RETURNING id
)
INSERT INTO challenge_user_rounds (
  challenge_user_id,
	round_id,
	is_completed
) SELECT
  (SELECT id from add_challenge_user),
  r.id,
  false
FROM
  rounds r
WHERE r.challenge_id = :challengeId
AND r.end_time > :earliestEndTime