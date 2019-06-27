--@arg id: string
--@unique
--@return challengeId: string
SELECT
  challenge_id
FROM challenge_users cu
WHERE cu.id = :id