--@arg rounds: Array<{challengeId: string, startTime: dt.Moment, endTime: dt.Moment}>
--@return id: string
INSERT INTO rounds (
  challenge_id,
  start_time,
  end_time
)
SELECT
  (unnest->>'challengeId')::bigint challenge_id,
  (unnest->>'startTime')::timestamptz start_time,
  (unnest->>'endTime')::timestamptz end_time
FROM UNNEST(:rounds::JSONB[])
RETURNING id