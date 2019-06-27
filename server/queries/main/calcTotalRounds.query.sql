--@arg challengeId: string
--@arg userId: string
WITH challenge_user_to_update AS (
  SELECT cu.id
  FROM challenge_users cu
  WHERE cu.challenge_id = :challengeId
    AND cu.user_id = :userId
), count_rounds AS (
  SELECT COUNT(*) cnt
  FROM challenge_user_rounds cur
  WHERE cur.challenge_user_id = (SELECT id FROM challenge_user_to_update)
)
UPDATE challenge_users cu
  SET total_round_count = (SELECT cnt FROM count_rounds)
WHERE cu.id = (SELECT id FROM challenge_user_to_update)