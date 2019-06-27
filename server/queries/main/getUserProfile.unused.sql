--@arg userId: string
--@unique
--@return userId: string
--@return name: string
--@return subscription: any 
SELECT
  user_id,
  name,
  subscription
FROM
  user_profiles
WHERE
  user_id=:userId