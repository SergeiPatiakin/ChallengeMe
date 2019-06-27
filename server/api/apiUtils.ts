import jwt from 'jsonwebtoken'
import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import * as conf from '../conf'
import { getUserByEmail } from '../queries/auth'

passport.use(
  new FacebookStrategy(
    {
      clientID: conf.facebook.appId,
      clientSecret: conf.facebook.appSecret,
      callbackURL: `${conf.server.callbackDomain}/auth/facebook/callback`,
      profileFields: ['id', 'emails', 'name'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      // TODO: look up user by email
      // console.info({ accessToken, refreshToken, profile, emails: profile.emails })
      const { emails, name: nameStruct } = profile
      const name = nameStruct && nameStruct.givenName
      const email = emails![0].value
      // console.log({email, name})
      const users = await getUserByEmail({ email })
      if (users.length === 0) {
        // create user profile (skip for now)
        console.info({ action: 'create user', email, name })
        // return user in callback?
      } else if (users.length === 1) {
        // return user in callback?
        const user = users[0]
        const payload = {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        }
        const jwtoken = jwt.sign(payload, conf.jwtSecret)
        cb(undefined, { jwtoken })
      }
    }
  )
)

export const isAuthenticatedElse401 = (req: any, res: any, nextMiddleware: any) => {
  const jwtToken = req.headers.authorization && req.headers.authorization.replace('Bearer ', '')
  const decodedToken = jwt.verify(jwtToken, conf.jwtSecret) as object
  if (isTokenValid(jwtToken)) {
    req.user = (decodedToken as any).user
    return nextMiddleware()
  } else {
    res.status(401).send({ error: 'must authenticate' })
  }
}

export const isAuthenticatedElseRedirect = (req: any, res: any, nextMiddleware: any) => {
  const jwtToken = req.cookies.id_token
  const decodedToken = jwt.verify(jwtToken, conf.jwtSecret) as object
  if (isTokenValid(jwtToken)) {
    req.user = (decodedToken as any).user
    return nextMiddleware()
  } else {
    res.redirect('/login')
  }
}

export const isTokenValid = (token?: string | null) => {
  if (!token) {
    return false
  }

  try {
    const decoded = jwt.verify(token, conf.jwtSecret)
    if (!decoded) {
      return false
    }
  } catch (e) {
    return false
  }
  return true
}
