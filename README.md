- Create database and user
  - `$ createuser chmeapp_user`
  - `$ createdb --owner=chmeapp_user`
  - `$ psql chmeapp < db/migrations/_extensions.sql`
  - `$ psql chmeapp`
  - `chmeapp# alter user chmeapp_user with password 'chmeapp_password';`
  