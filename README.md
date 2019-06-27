## Description
ChallengeMe allows you to create challenges which you work on day-by-day or week-by-week. It allows you to track progress, invite friends and see their performance.

## Setup

- Create database and user
  - `$ createuser chmeapp_user`
  - `$ createdb --owner=chmeapp_user`
  - `$ psql chmeapp < db/migrations/_extensions.sql`
  - `$ psql chmeapp`
  - `chmeapp# alter user chmeapp_user with password 'chmeapp_password';`
  