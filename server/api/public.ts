import bcrypt from 'bcrypt'
import express from 'express'
import * as t from 'io-ts'
import { reporter } from 'io-ts-reporters'
import jwt from 'jsonwebtoken'

import passport from 'passport'
import { COOKIE_KEY } from '../../utils/clientUtils'
import { jwtSecret } from '../conf'
import { getUserByEmail } from '../queries/auth'

const publicApiExpressApp = express()
publicApiExpressApp.use(passport.initialize())
publicApiExpressApp.use(express.json())

const LoginArgumentsType = t.type({
  email: t.string,
  password: t.string,
})

publicApiExpressApp.post('/api/login', async (req, res) => {
  const decodedArgs = LoginArgumentsType.decode(req.body)
  decodedArgs
    .mapLeft(() => {
      console.error('[Login] Error decoding args', { errors: reporter(decodedArgs) })
    })
    .fold(
      () => {
        res.status(400).send({ status: 'Bad Request', errors: reporter(decodedArgs) })
      },
      async args => {
        const users = await getUserByEmail({ email: args.email })
        if (users.length === 0) {
          res.status(401).send({ error: 'no such user' })
        } else {
          const user = users[0]
          if (bcrypt.compareSync(args.password, user.passwordHash)) {
            // Passwords match
            const payload = {
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
              },
            }
            const token = jwt.sign(payload, jwtSecret)
            res.status(200).send({ token })
          } else {
            // Passwords don't match
            res.status(401).send({ error: 'wrong password' })
          }
        }
      }
    )
})

publicApiExpressApp.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    session: false,
    scope: ['email'],
  })
)

publicApiExpressApp.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    session: false,
    scope: ['email'],
    failureRedirect: '/login',
  }),
  function(req, res) {
    // Successful authentication
    // Set JWT cookie
    res.cookie(COOKIE_KEY, req.user.jwtoken)
    // Redirect home
    res.redirect('/')
  }
)

// publicApiExpressApp.get('/api/debug', async (_req, res) => {
//   res.send({ debug: 'OK' })
// })

export default publicApiExpressApp
