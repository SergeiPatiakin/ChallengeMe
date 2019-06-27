import cookieParser from 'cookie-parser'
import express from 'express'
import { createServer } from 'http'
import next from 'next'
import { parse } from 'url'

import { createReadStream } from 'fs'
import { isTokenValid } from './api/apiUtils'
import mainApiExpressApp from './api/main'
import publicApiExpressApp from './api/public'
import * as conf from './conf'
import migrate from './migrations'
import { webPushSetup } from './webPush'

const nextjsApp = next({ dev: !conf.env.isProduction, quiet: conf.env.isProduction })
const nextjsHandler = nextjsApp.getRequestHandler()

// Prepare web push
webPushSetup()

migrate()
  .then(() => {
    // Prepare Nextjs app
    nextjsApp.prepare()
  })
  .then(() => {
    const rootExpressApp = express()
    // Cookie middleware
    rootExpressApp.use(cookieParser())
    // Serve public API
    rootExpressApp.use(publicApiExpressApp)
    // Serve authenticated API
    rootExpressApp.use(mainApiExpressApp)
    // Serve public Nextjs pages
    rootExpressApp.use((req, res, nextHandler) => {
      const parsedUrl = parse(req.url, true)
      const token = req.cookies.id_token

      // Service worker
      if (parsedUrl.pathname === '/sw.js') {
        res.setHeader('content-type', 'text/javascript')
        createReadStream('./static/serviceWorker.js').pipe(res)
      } else if (parsedUrl.path!.match(/^\/_next\/.*/) || parsedUrl.path === '/login') {
        // TODO: static?
        return nextHandler()
      } else if (isTokenValid(token)) {
        return nextHandler()
      } else {
        res.redirect('/login')
      }
    })
    // Serve authenticated Nextjs pages
    rootExpressApp.use((req, res) => {
      const parsedUrl = parse(req.url, true)
      nextjsHandler(req, res, parsedUrl)
    })
    // Serve Nextjs 404
    rootExpressApp.get('*', (req, res) => nextjsHandler(req, res))

    const server = createServer(async (req, res) => {
      if (conf.env.isProduction) {
        // Upgrade to HTTPS
        if (req.headers['x-forwarded-proto'] === 'http') {
          res.writeHead(301, {
            Location: `https://${req.headers.host}${req.url}`,
          })
          res.end()
          return
        }
      }
      rootExpressApp(req, res)
    })

    server.listen(conf.server.port, (err: Error) => {
      if (err) {
        throw err
      }
      console.info(`> Ready on http://localhost:${conf.server.port}`)
    })
  })
