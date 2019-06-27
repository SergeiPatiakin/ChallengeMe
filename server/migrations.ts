import path from 'path'
import Postgrator from 'postgrator'
import { db } from './conf'

const migrationsFolder = path.join(__dirname, '..', 'db', 'migrations')
const latestMigrationVersion = '3'

export default function migrate(): Promise<any> {
  const postgrator = new Postgrator({
    driver: 'pg',
    migrationDirectory: migrationsFolder,
    // Database connection config
    host: db.host,
    port: db.port,
    database: db.database,
    username: db.user,
    password: db.password,
    schemaTable: 'chmeapp_schema_version',
    ssl: db.ssl,
  })

  let migrationVersion: string
  if (process.env.MIGRATION_VERSION === 'previous') {
    migrationVersion = (parseInt(latestMigrationVersion, 10) - 1).toString()
  } else if (process.env.MIGRATION_VERSION) {
    migrationVersion = process.env.MIGRATION_VERSION
  } else {
    migrationVersion = latestMigrationVersion
  }

  return postgrator
    .migrate(migrationVersion)
    .then(migrations => {
      if (migrations && migrations.length > 0) {
        console.info('Migration(s) run:', migrations.map(m => m.filename).join(','))
      } else {
        console.info('No migration to run')
      }
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}

if (require.main === module) {
  migrate()
}
