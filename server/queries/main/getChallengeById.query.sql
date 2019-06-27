--@arg id: string
--@unique
--@return roundAggregationType: dt.RoundAggregationType
SELECT
  round_aggregation_type
FROM challenges c
WHERE c.id = :id