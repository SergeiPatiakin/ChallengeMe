--@arg challengeId: string
SELECT
  --@return id: string
  u.user_id id,
  --@return name: string
  u.name,
  --@return isChallengeMember: boolean
  EXISTS(
    SELECT cu.id
    FROM challenge_users cu
    WHERE cu.challenge_id = :challengeId
    AND cu.user_id = u.user_id
  ) is_challenge_member
FROM
  user_profiles u