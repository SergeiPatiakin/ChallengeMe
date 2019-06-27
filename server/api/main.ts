import bcrypt from 'bcrypt'
import express from 'express'
import * as t from 'io-ts'
import { reporter } from 'io-ts-reporters'
import moment from 'moment'

import * as dt from '../../common/DataTypes'
import { getUser } from '../queries/auth/getUser.query'
import { updateUser } from '../queries/auth/updateUser.query'
import * as mainQueries from '../queries/main'
import { sendUpdateCurNotifications } from '../webPush'
import { isAuthenticatedElse401 } from './apiUtils'

const mainApiExpressApp = express()
mainApiExpressApp.use(express.json())

// Auth

const HASH_ROUNDS = 10

const ChangePasswordArgsType = t.type({
  currentPassword: t.string,
  newPassword: t.string,
})

mainApiExpressApp.post('/api/change-password', isAuthenticatedElse401, async (req, res) => {
  const decodedArgs = ChangePasswordArgsType.decode(req.body)
  decodedArgs.fold(
    () => {
      res.status(400).send({ status: 'Bad Request', errors: reporter(decodedArgs) })
    },
    async args => {
      const user = (await getUser({ id: (req as any).user.id }))!
      if (bcrypt.compareSync(args.currentPassword, user.passwordHash)) {
        user.passwordHash = bcrypt.hashSync(args.newPassword, HASH_ROUNDS)
        await updateUser(user!)
        res.status(200).send({})
      } else {
        res.status(401).send({ error: 'wrongPassword' })
      }
    }
  )
})

// Main

mainApiExpressApp.get('/api/current-user', isAuthenticatedElse401, async (req, res) => {
  res.status(200).send((req as any).user)
})

mainApiExpressApp.get('/api/all-users', isAuthenticatedElse401, async (_req, res) => {
  mainQueries
    .getAllUsers({})
    .then(users => {
      res.status(200).send({ users })
    })
    .catch(e => {
      res.status(500).send(JSON.stringify(e))
    })
})

// Excludes current user
mainApiExpressApp.get('/api/users-for-challenge/:challengeId', isAuthenticatedElse401, async (req, res) => {
  mainQueries
    .getUsersForChallenge({ challengeId: req.params.challengeId })
    .then(users => {
      const otherUsers = users.filter(u => u.id !== (req as any).user.id)
      res.status(200).send({ users: otherUsers })
    })
    .catch(e => {
      res.status(500).send(JSON.stringify(e))
    })
})

const AddUsersToChallengeArgsType = t.type({
  userIds: t.array(t.string),
})

mainApiExpressApp.post('/api/add-users-to-challenge/:challengeId', isAuthenticatedElse401, async (req, res) => {
  const decodedArgs = AddUsersToChallengeArgsType.decode(req.body)
  decodedArgs.fold(
    () => {
      res.status(400).send({ status: 'Bad Request', errors: reporter(decodedArgs) })
    },
    args => {
      Promise.all(
        args.userIds.map(userId =>
          mainQueries
            .addUserToChallenge({
              challengeId: req.params.challengeId,
              userId,
              isOwner: false,
              earliestEndTime: moment(),
            })
            .then(() =>
              mainQueries.calcTotalRounds({
                userId,
                challengeId: req.params.challengeId,
              })
            )
        )
      )
        .then(() => {
          res.status(200).send({})
        })
        .catch(e => {
          res.status(500).send(JSON.stringify(e))
        })
    }
  )
})

mainApiExpressApp.get('/api/my-challenges', isAuthenticatedElse401, async (req, res) => {
  mainQueries
    .getChallengesByUser({ userId: (req as any).user.id })
    .then(challenges => {
      res.status(200).send({ challenges })
    })
    .catch(e => {
      res.status(500).send(JSON.stringify(e))
    })
})

mainApiExpressApp.get('/api/pending-rounds', isAuthenticatedElse401, async (req, res) => {
  mainQueries
    .getPendingRoundsByUser({
      userId: (req as any).user.id,
    })
    .then(rounds => {
      res.status(200).send({ rounds })
    })
    .catch(e => {
      res.status(500).send(JSON.stringify(e))
    })
})

mainApiExpressApp.get('/api/completed-rounds', isAuthenticatedElse401, async (req, res) => {
  mainQueries
    .getCompletedRoundsByUser({
      userId: (req as any).user.id,
    })
    .then(rounds => {
      res.status(200).send({ rounds })
    })
    .catch(e => {
      res.status(500).send(JSON.stringify(e))
    })
})

mainApiExpressApp.get('/api/news-items', isAuthenticatedElse401, async (req, res) => {
  mainQueries
    .getNewsItems({
      userId: (req as any).user.id,
    })
    .then(newsItems => {
      res.status(200).send({ newsItems })
    })
    .catch(e => {
      res.status(500).send(JSON.stringify(e))
    })
})

const UpdateRoundArgsType = t.type({
  curId: t.string,
  isCompleted: t.boolean,
  resultBoolean: t.union([t.boolean, t.null]),
  resultFloat: t.union([t.number, t.null]),
})

mainApiExpressApp.post('/api/update-cur', isAuthenticatedElse401, async (req, res) => {
  const userId = (req as any).user.id as string
  const decodedArgs = UpdateRoundArgsType.decode(req.body)
  decodedArgs.fold(
    () => {
      console.error('[Update Round Result] Error decoding args', { errors: reporter(decodedArgs) })
      res.status(500).send()
    },
    async args => {
      try {
        const cur = await mainQueries.updateCur({
          userId,
          curId: args.curId,
          isCompleted: args.isCompleted,
          resultBoolean: args.resultBoolean,
          resultFloat: args.resultFloat,
        })

        const challengeUserId = cur!.challengeUserId
        const challengeId = (await mainQueries.getChallengeUserById({ id: challengeUserId }))!.challengeId
        const roundAggregationType = (await mainQueries.getChallengeById({ id: challengeId }))!.roundAggregationType

        if (roundAggregationType === 'countFalse') {
          await mainQueries.calcCountFalseAggregate({ challengeId, challengeUserId })
        } else if (roundAggregationType === 'countTrue') {
          await mainQueries.calcCountTrueAggregate({ challengeId, challengeUserId })
        } else if (roundAggregationType === 'sum') {
          await mainQueries.calcSumAggregate({ challengeId, challengeUserId })
        } else if (roundAggregationType === 'max') {
          await mainQueries.calcMaxAggregate({ challengeId, challengeUserId })
        }
        res.status(200).send({})
        // Fire and forget
        sendUpdateCurNotifications(args.curId)
      } catch (e) {
        res.status(500).send(JSON.stringify(e))
      }
    }
  )
})

const CreateChallengeArgsType = t.type({
  challenge: t.type({
    name: t.string,
    challengeDescription: t.string,
    roundDescription: t.string,
    roundFrequency: dt.RoundFrequencyType,
    roundResultType: dt.RoundResultTypeType,
    roundAggregationType: dt.RoundAggregationTypeType,
  }),
  rounds: t.array(
    t.type({
      startTime: dt.MomentFromStringType,
      endTime: dt.MomentFromStringType,
    })
  ),
})

mainApiExpressApp.post('/api/create-challenge', isAuthenticatedElse401, async (req, res) => {
  const userId = (req as any).user.id as string
  const decodedArgs = CreateChallengeArgsType.decode(req.body)
  decodedArgs
    .mapLeft(() => {
      console.error('[Create Challenge] Error decoding args', { errors: reporter(decodedArgs) })
    })
    .fold(
      () => {
        res.status(400).send({ status: 'Bad Request', errors: reporter(decodedArgs) })
      },
      args => {
        const { name, challengeDescription, roundDescription, roundFrequency, roundResultType, roundAggregationType } = args.challenge
        let challengeId: string
        return mainQueries
          .createChallenge({
            userId,
            name,
            challengeDescription,
            roundDescription,
            roundFrequency,
            roundResultType,
            roundAggregationType,
          })
          .then(result => {
            challengeId = result!.id
            const rounds = args.rounds.map(round => ({ ...round, challengeId }))
            return mainQueries.multiCreateRound({ rounds })
          })
          .then(() => {
            return mainQueries.addUserToChallenge({
              userId,
              challengeId,
              isOwner: true,
              earliestEndTime: moment(),
            })
          })
          .then(() => {
            return mainQueries.calcTotalRounds({
              userId,
              challengeId,
            })
          })
          .then(() => {
            res.status(200).send({ challengeId })
          })
          .catch(e => {
            res.status(500).send(JSON.stringify(e))
          })
      }
    )
})

mainApiExpressApp.post('/api/leave-challenge/:challengeId', isAuthenticatedElse401, async (req, res) => {
  const userId = (req as any).user.id as string
  const challengeId = req.params.challengeId
  mainQueries
    .leaveChallenge({ userId, challengeId })
    .then(() => {
      res.status(200).send({})
    })
    .catch(e => {
      res.status(500).send(JSON.stringify(e))
    })
})

mainApiExpressApp.post('/api/save-subscription/', isAuthenticatedElse401, async (req, res) => {
  const userId = (req as any).user.id as string
  const subscription = req.body
  try {
    await mainQueries.saveSubscription({ userId, subscription })
    res.status(200).send({})
  } catch (e) {
    res.status(500).send(JSON.stringify(e))
  }
})

export default mainApiExpressApp
