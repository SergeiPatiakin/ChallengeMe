--@arg userId: string
SELECT
  --@return id: string;
	c.id,
  --@return userId: string;
	c.user_id,
  --@return name: string;
	c."name",
  --@return challengeDescription: string;
	c.challenge_description,
  --@return roundDescription: string;
	c.round_description,
  --@return roundFrequency: dt.RoundFrequency;
	c.round_frequency, --daily, weekly
  --@return roundResultType: dt.RoundResultType;
	c.round_result_type, --float, boolean
  --@return roundAggregationType: dt.RoundAggregationType;
	c.round_aggregation_type, --countTrue
  --@return totalRoundCount: number
  cu.total_round_count,
  --@return completedRoundCount: number
  cu.completed_round_count,
  --@return completedRoundAggregate: number
  cu.completed_round_aggregate
FROM challenges c
JOIN challenge_users cu
  ON cu.challenge_id = c.id
WHERE cu.user_id=:userId
AND NOT cu.is_deleted