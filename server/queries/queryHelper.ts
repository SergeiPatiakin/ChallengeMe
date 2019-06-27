import * as fs from 'fs'
import moment from 'moment'
import { types } from 'pg'
import { Client } from 'pg-parameters'
import { db } from '../conf'

const camelCase = require('lodash.camelcase')

const TIMESTAMPTZ_OID = 1184
const parseFn = (val: any) => (val === null ? null : moment.parseZone(val))
types.setTypeParser(TIMESTAMPTZ_OID, parseFn)

const client = new Client(db)

const camelCaseFields = <T>(sourceObject: any): T => {
  const camelCasedObject: any = {}
  Object.keys(sourceObject).forEach(key => {
    camelCasedObject[key.indexOf('_') >= 0 ? camelCase(key) : key] = sourceObject[key]
  })
  return camelCasedObject as T
}

function buildQuery<Args, Result>(queryTsFile: string): ((args: Args) => Promise<Result[]>) {
  const queryFileName = queryTsFile.replace(/\.(ts|js|sql)$/, '.sql')
  const query = fs.readFileSync(queryFileName, { encoding: 'utf8' })
  return async (args: Args): Promise<Result[]> => {
    try {
      const response = await client.execute(query, args)
      const results: Result[] = response.rows.map(row => camelCaseFields<Result>(row))
      return results
    } catch (exc) {
      console.error(queryTsFile, exc, args)
      return []
    }
  }
}

function buildQueryWithUniqueResult<Args, Result>(queryTsFile: string): ((args: Args) => Promise<Result | null>) {
  const queryFunction = buildQuery<Args, Result>(queryTsFile)
  return (args: Args) => {
    return queryFunction(args).then(results => {
      if (results.length > 0) {
        if (results.length > 1) {
          console.error('Query expected a single result but got multiple.', queryTsFile)
        }
        return results[0]
      }
      return null
    })
  }
}

async function executeRawQuery(query: string, args: any[]) {
  return client.query(query, args)
}

async function executeInTransaction(fn: () => Promise<any>) {
  return client.withTransaction(fn)
}

export { buildQuery, buildQueryWithUniqueResult, executeRawQuery, executeInTransaction }
