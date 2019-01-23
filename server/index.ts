import express from 'express'
import { createServer } from 'http'
import next from 'next'
import { parse } from 'url'

import mainApi from './api/main'
import * as conf from './conf'

const app = next({ dev: !conf.env.isProduction, quiet: conf.env.isProduction })
const nextHandler = app.getRequestHandler()

Promise.resolve()
  .then(() => {
    app.prepare()
  })
  .then(() => {
    const expressApp = express()
    expressApp.use(mainApi)
    expressApp.use((req, res) => {
      const parsedUrl = parse(req.url, true)
      nextHandler(req, res, parsedUrl)
    })

    expressApp.get('*', (req, res) => nextHandler(req, res))

    const server = createServer(async (req, res) => {
      if (conf.env.isProduction) {
        if (req.headers['x-forwarded-proto'] === 'http') {
          res.writeHead(301, {
            Location: `https://${req.headers.host}${req.url}`,
          })
          res.end()
          return
        }
      }

      expressApp(req, res)
    })

    server.listen(conf.server.port, (err: Error) => {
      if (err) {
        throw err
      }
      console.info(`> Ready on http://localhost:${conf.server.port}`)
    })
  })
