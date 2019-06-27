## Description
ChallengeMe allows you to create challenges which you work on day-by-day or week-by-week. It allows you to track progress, invite friends and see their performance.

## Features
- Native or Facebook login
- Push notifications

## Setup

- Create database and user
  - `$ createuser chmeapp_user`
  - `$ createdb --owner=chmeapp_user`
  - `$ psql chmeapp < db/migrations/_extensions.sql`
  - `$ psql chmeapp`
  - `chmeapp# alter user chmeapp_user with password 'chmeapp_password';`
- Set environment variables
  - PORT
  - DB_HOST
  - DB_PORT
  - DB_NAME
  - DB_PWD
  - DB_SSL
  - CALLBACK_DOMAIN
  - JWT_SECRET
  - VAPID_PUBLIC_KEY
  - VAPID_PRIVATE_KEY
  - VAPID_EMAIL
  - FACEBOOK_APP_ID
  - FACEBOOK_APP_SECRET