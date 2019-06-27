create table user_profiles(
  user_id bigint primary key not null,
  name text not null,
  subscription json null
);

insert into user_profiles(
  user_id,
  name
) select
  id,
  name
from
  auth_users