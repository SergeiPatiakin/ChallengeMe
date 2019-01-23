import express from 'express'
import * as t from 'io-ts'
import { reporter } from 'io-ts-reporters'

import * as dummyService from '../service/dummy'

const app = express()
app.use(express.json())

const AddNumbersArgumentsType = t.type({
  a: t.number,
  b: t.number,
})

app.post('/dummy/add-numbers', async (req, res) => {
  const decodedArgs = AddNumbersArgumentsType.decode(req.body)
  decodedArgs
    .mapLeft(() => {
      console.error('[Add Numbers] Error decoding args', { errors: reporter(decodedArgs) })
    })
    .fold(
      () => {
        res.status(400).send({ status: 'Bad Request', errors: reporter(decodedArgs) })
      },
      async args => {
        const r = (await dummyService.addNumbers({ a: args.a, b: args.b }))!
        res.status(200).send({ result: r.result })
      }
    )
})

export default app
