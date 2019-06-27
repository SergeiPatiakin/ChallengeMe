-- Create an empty challenge
INSERT INTO challenges(
	user_id,
	"name",
	challenge_description,
	round_description,
	round_frequency,
	round_result_type,
	round_aggregation_type
) VALUES(
    --@arg userId: string;
	:userId,
    --@arg name: string;
	:name,
    --@arg challengeDescription: string;
	:challengeDescription,
    --@arg roundDescription: string;
	:roundDescription,
    --@arg roundFrequency: dt.RoundFrequency;
	:roundFrequency, --daily, weekly
    --@arg roundResultType: dt.RoundResultType;
	:roundResultType, --float, boolean
    --@arg roundAggregationType: dt.RoundAggregationType;
	:roundAggregationType --countTrue
)
--@unique
--@return id: string
RETURNING id