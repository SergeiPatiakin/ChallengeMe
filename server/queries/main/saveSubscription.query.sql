--@arg userId: string
--@arg subscription: any
update user_profiles
set subscription = :subscription::json
where user_id = :userId