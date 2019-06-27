create table if not exists auth_users (
    id bigserial primary key,
    email text,
    auth_method text,
    password_hash text,
    name text
);
create table challenges(
	id bigserial primary key not null,
	user_id bigint references auth_users(id) not null,
	"name" text not null,
	challenge_description text not null,
	round_description text not null,
	round_frequency text not null, --daily, weekly
	round_result_type text not null, --float, boolean
	round_aggregation_type text not null--countTrue
);
create index challenges_fk_user_id_idx on challenges(user_id);

create table challenge_users(
  id bigserial primary key not null,
	challenge_id bigint not null references challenges(id) on delete cascade,
	user_id bigint not null references auth_users(id) on delete cascade,
	is_owner boolean not null,
	is_deleted boolean not null default false,
	total_round_count integer not null default 0,
	completed_round_count integer not null default 0,
	completed_round_aggregate float not null default 0
);
create index challenge_users_fk_challenge_id_idx on challenge_users(challenge_id);
create index challenge_users_fk_user_id_idx on challenge_users(user_id);

create table rounds(
	id bigserial primary key not null,
	challenge_id bigint not null references challenges(id) on delete cascade,
	start_time timestamptz not null,
	end_time timestamptz not null,
	result_prompt_time timestamptz not null
);
create index rounds_fk_challenge_id_idx on rounds(challenge_id);

create table challenge_user_rounds(
	id bigserial primary key not null,
	challenge_user_id bigint not null references challenge_users(id) on delete cascade,
	round_id bigint not null references rounds(id) on delete cascade,
	is_completed boolean not null,
	result_boolean boolean,
	result_float float,
	updated_date timestamptz not null default now()
);
create index challenge_user_rounds_fk_challenge_user_id_idx on challenge_user_rounds(challenge_user_id);
create index challenge_user_rounds_fk_round_id_idx on challenge_user_rounds(round_id);