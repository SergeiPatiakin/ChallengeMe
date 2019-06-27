-- Trusted parameters
--@arg challengeId: string
--@arg challengeUserId: string
WITH agg AS (
  -- cte should return 1 row
  SELECT
    COUNT(*) AS completed_round_count,
    SUM(result_float) AS completed_round_aggregate
  FROM challenge_user_rounds cur
  WHERE cur.challenge_user_id = :challengeUserId
  AND cur.is_completed
)
UPDATE challenge_users cu
  SET completed_round_count = agg.completed_round_count,
  completed_round_aggregate = agg.completed_round_aggregate
FROM agg
WHERE cu.id=:challengeUserId